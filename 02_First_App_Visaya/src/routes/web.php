<?php

use App\Http\Controllers\UserController; // Corrected spelling and backslashes
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// This is the route for your User List page
Route::get('/users', [UserController::class, 'index']);