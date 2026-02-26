<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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
    $user = auth()->user();

    // Active projects count for this user (projects with at least one in-progress task)
    $activeProjects = \App\Models\Project::where('user_id', $user->id)
        ->whereHas('tasks', function ($q) {
            $q->where('status', 'in_progress');
        })->count();

    // Pending tasks (not done) for this user across projects
    $pendingTasks = \App\Models\Task::whereHas('project', function ($q) use ($user) {
        $q->where('user_id', $user->id);
    })->where('status', '!=', 'done')->count();

    // Team velocity placeholder: completed tasks last 30 days
    $teamVelocity = \App\Models\Task::whereHas('project', function ($q) use ($user) {
        $q->where('user_id', $user->id);
    })->where('status', 'done')->where('updated_at', '>=', now()->subDays(30))->count();

    // Recent projects (latest 5) with task status counts
    $recentProjects = \App\Models\Project::where('user_id', $user->id)
        ->withCount('tasks')
        ->withCount(['tasks as todo_count' => function ($q) { $q->where('status', 'todo'); }])
        ->withCount(['tasks as in_progress_count' => function ($q) { $q->where('status', 'in_progress'); }])
        ->latest()
        ->take(5)
        ->get()
        ->map(function ($p) {
            $todo = (int) ($p->todo_count ?? 0);
            $inprog = (int) ($p->in_progress_count ?? 0);
            $total = (int) ($p->tasks_count ?? 0);
            return [
                'id' => $p->id,
                'title' => $p->title,
                'description' => $p->description,
                'tasks_count' => $total,
                'todo_count' => $todo,
                'in_progress_count' => $inprog,
                'completed' => ($todo + $inprog) === 0 && $total > 0,
            ];
        })->toArray();

    return Inertia::render('Dashboard', [
        'activeProjects' => $activeProjects,
        'pendingTasks' => $pendingTasks,
        'teamVelocity' => $teamVelocity,
        'recentProjects' => $recentProjects,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Project & Task resource routes
    Route::resource('projects', \App\Http\Controllers\ProjectController::class);
    // JSON data endpoint used by frontend modals
    Route::get('projects/{project}/data', [\App\Http\Controllers\ProjectController::class, 'data'])->name('projects.data');
    Route::resource('projects.tasks', \App\Http\Controllers\TaskController::class)->shallow();
    Route::post('/tasks/{task}/toggle-status', [\App\Http\Controllers\TaskController::class, 'toggleStatus'])->name('tasks.toggle-status');
});

require __DIR__.'/auth.php';
