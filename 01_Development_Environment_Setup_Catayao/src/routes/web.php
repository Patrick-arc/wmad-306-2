<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/', function () {
    $users = User::limit(20)->get();
    return view('welcome', compact('users'));
});
