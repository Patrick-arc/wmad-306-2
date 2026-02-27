<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', ['message' => 'Welcome to my page!']);
});
