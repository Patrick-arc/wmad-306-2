<?php

use App\Http\Controllers\ProfileController;
use App\Models\Task;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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
    $user = Auth::user();
    $projects = $user->projects()->with('tasks')->get();
    // include tasks that belong directly to the user (standalone tasks) as well as project tasks
    // Query by user_id because `User::tasks()` relation isn't present.
    $tasks = Task::where('user_id', $user->id)->get();
    
    return Inertia::render('Dashboard', [
        'projects' => $projects,
        'tasks' => $tasks,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Project & Task routes
    Route::resource('projects', \App\Http\Controllers\ProjectController::class);
    Route::resource('tasks', \App\Http\Controllers\TaskController::class);
    // quick actions
    Route::put('tasks/{task}/mark-done', [\App\Http\Controllers\TaskController::class, 'markDone'])->name('tasks.markDone');
    Route::put('projects/{project}/mark-done', [\App\Http\Controllers\ProjectController::class, 'markDone'])->name('projects.markDone');
    Route::put('tasks/{task}/mark-undo', [\App\Http\Controllers\TaskController::class, 'markUndo'])->name('tasks.markUndo');
    Route::put('projects/{project}/mark-undo', [\App\Http\Controllers\ProjectController::class, 'markUndo'])->name('projects.markUndo');
});

require __DIR__.'/auth.php';
