<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // ✅ FIXED IMPORT
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    /** @var \App\Models\User $user */
    $user = Auth::user(); // ✅ Now works correctly

    // Get user's projects with tasks
    $projects = $user->projects()->with('tasks')->get();

    // Calculate statistics
    $totalProjects = $projects->count();

    $totalTasks = $projects->flatMap(function ($project) {
        return $project->tasks;
    })->count();

    $completedTasks = $projects->flatMap(function ($project) {
        return $project->tasks;
    })->where('status', 'completed')->count();

    $pendingTasks = $projects->flatMap(function ($project) {
        return $project->tasks;
    })->where('status', '!=', 'completed')->count();

    // Get recent projects (latest 5)
    $recentProjects = $user->projects()
        ->with('tasks')
        ->latest()
        ->take(5)
        ->get();

    // Get recent tasks (latest 10 with project info)
    $recentTasks = \App\Models\Task::whereHas('project', function ($query) use ($user) {
        $query->where('user_id', $user->id);
    })
        ->with('project')
        ->latest()
        ->take(10)
        ->get();

    return Inertia::render('Dashboard', [
        'stats' => [
            'totalProjects' => $totalProjects,
            'totalTasks' => $totalTasks,
            'completedTasks' => $completedTasks,
            'pendingTasks' => $pendingTasks,
            'recentProjects' => $recentProjects,
            'recentTasks' => $recentTasks,
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Project Routes
    Route::resource('projects', ProjectController::class);

    // Task Routes (nested under projects)
    Route::resource('projects.tasks', TaskController::class);
    Route::post('/projects/{project}/tasks/{task}/toggle-status',
        [TaskController::class, 'toggleStatus']
    )->name('projects.tasks.toggle-status');

    // Standalone Tasks route - shows all tasks across all projects
    Route::get('/tasks', [TaskController::class, 'allTasks'])->name('tasks.index');
});

require __DIR__.'/auth.php';
