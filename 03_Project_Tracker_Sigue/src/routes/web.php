<?php

use App\Models\Project;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;

Route::resource('projects', ProjectController::class)->middleware(['auth', 'verified']);
Route::resource('tasks', TaskController::class)->middleware(['auth', 'verified']);
Route::post('/projects/{project}/tasks', [ProjectController::class, 'storeTask'])->name('projects.tasks.store');
Route::delete('/tasks/{task}', [ProjectController::class, 'destroyTask'])->name('tasks.destroy');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'projectCount' => auth()->user()->projects()->count(),
        'taskCount' => \App\Models\Task::whereHas('project', function($query) {
            $query->where('user_id', auth()->id());
        })->count(),
        
        // CHANGED: Variable name is now 'recentTasks' to match your Dashboard.jsx props
        'recentTasks' => \App\Models\Task::with('project')
            ->whereHas('project', function($query) {
                $query->where('user_id', auth()->id());
            })
            ->latest()
            ->take(5)
            ->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';