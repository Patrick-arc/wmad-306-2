<?php

use App\Http\Controllers\EditorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\WriterController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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

// Redirect /dashboard to the proper role-based dashboard
Route::get('/dashboard', function () {
    $user = Auth::user();
    if ($user->hasRole('writer')) {
        return redirect()->route('writer.dashboard');
    } elseif ($user->hasRole('editor')) {
        return redirect()->route('editor.dashboard');
    } elseif ($user->hasRole('student')) {
        return redirect()->route('student.dashboard');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Writer routes
Route::middleware(['auth', 'verified', 'role:writer'])->prefix('writer')->group(function () {
    Route::get('/dashboard', [WriterController::class, 'index'])->name('writer.dashboard');
    Route::post('/articles', [WriterController::class, 'store'])->name('articles.store');
    Route::get('/articles/{article}/edit', [WriterController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [WriterController::class, 'update'])->name('articles.update');
    Route::post('/articles/{article}/submit', [WriterController::class, 'submit'])->name('articles.submit');
    Route::delete('/articles/{article}', [WriterController::class, 'destroy'])->name('articles.destroy');
    Route::get('/search', [WriterController::class, 'search'])->name('search');
});

// Editor routes
Route::middleware(['auth', 'verified', 'role:editor'])->prefix('editor')->group(function () {
    Route::get('/dashboard', [EditorController::class, 'index'])->name('editor.dashboard');
    Route::get('/articles/{article}/review', [EditorController::class, 'review'])->name('articles.review');
    Route::post('/articles/{article}/revision', [EditorController::class, 'requestRevision'])->name('articles.revision');
    Route::post('/articles/{article}/publish', [EditorController::class, 'publish'])->name('articles.publish');
    Route::get('/search', [EditorController::class, 'search'])->name('search');
});

// Student routes
Route::middleware(['auth', 'verified', 'role:student'])->prefix('student')->group(function () {
    Route::get('/dashboard', [StudentController::class, 'index'])->name('student.dashboard');
    Route::get('/articles/{article}', [StudentController::class, 'show'])->name('articles.show');
    Route::post('/articles/{article}/comment', [StudentController::class, 'comment'])->name('articles.comment');
    Route::get('/search', [StudentController::class, 'search'])->name('search');
});

require __DIR__.'/auth.php';
require __DIR__.'/sample.php';
