<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ProjectController::class, 'index'])->name('dashboard');
    Route::post('/tasks', [ProjectController::class, 'storeTask'])->name('tasks.store');
    Route::post('/tasks/{task}/toggle', [ProjectController::class, 'toggleTask'])->name('tasks.toggle');
    Route::patch('/tasks/{task}', [ProjectController::class, 'updateTask'])->name('tasks.update');
    Route::delete('/tasks/{task}', [ProjectController::class, 'destroyTask'])->name('tasks.destroy');
    Route::post('/tasks/{task}/toggle', [ProjectController::class, 'toggleTask'])->name('tasks.toggle');
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';