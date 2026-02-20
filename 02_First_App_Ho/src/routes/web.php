<?php

use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'list']);