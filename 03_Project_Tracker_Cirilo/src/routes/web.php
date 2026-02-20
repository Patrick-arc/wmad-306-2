<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/dashboard', function () {
    $user = Illuminate\Support\Facades\Auth::user();
    $projects = $user->projects()->withCount('tasks')->get();
    $tasks = $user->projects()->with('tasks')->get()->flatMap->tasks;
    $completed = $tasks->where('status', 'completed')->count();
    $ongoing = $tasks->where('status', 'in_progress')->count();
    $pending = $tasks->where('status', 'pending')->count();
    return Inertia::render('Dashboard', [
        'projects' => $projects,
        'tasks_count' => $tasks->count(),
        'completed_count' => $completed,
        'ongoing_count' => $ongoing,
        'pending_count' => $pending,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Project routes with route model binding
    Route::resource('projects', ProjectController::class);

    // Task routes with route model binding
    Route::resource('tasks', TaskController::class);
});

require __DIR__.'/auth.php';
