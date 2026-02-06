<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "Successfully Installed Laravel! Jemar Brent Gullunan";
});

Route::get('/about', function () {
    return "This is the about page. Welcome to Laravel, Jemar Brent Gullunan!";
});

Route::get('/insert-user', function () {
   return User::create([
       'name' => 'Jemar Brent Gullunan' . rand(1,1000000),
       'email' => 'jemarbrent' . rand(1,1000000) . '@example.com',
       'password' => Hash::make('123456'),
   ]);
});

Route::get('/users', function () {
    return User::where('name', 'like', '%ella%')->get();
});

route::get('/test-email', function () {
   $user = User::all()->shuffle()->first();
   Mail::raw("Hello from Laravel!  $user->name!", function ($message) use ($user) {
       $message->to($user->email)->subject('Hello from Laravel');
    });
});