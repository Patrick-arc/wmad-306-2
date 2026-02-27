<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return "Successfully Installed Laravel, Balansi, Rhys!";
});

Route::get('/about', function () {
    return "This is the about page. Created by Rhys.";
});

Route::get('/insert-user', function () {
   return User::create([
       'name' => 'Rhys Alecksie Balansi' . rand(1, 1000000),
       'email' => 'rhys.balansi' . rand(1, 1000000) . '@example.com',
       'password' => Hash::make('123456'),
   ]);
});

Route::get('/users', function () {
    return User::all();
});

Route::get('/test-email', function () {
    $user = User::all()->shuffle()->first();
    Mail::raw("Kamusta $user->name!", function ($message) use ($user) {
        $message->to($user->email)->subject('Hello World from Laravel Mail!');
    });
});