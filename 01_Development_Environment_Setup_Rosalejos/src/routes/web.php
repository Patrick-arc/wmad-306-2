<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return "Successfully Installed Laravel! Sean Rosalejos";
});

Route::get('/about', function () {
    return "This is the about page. Created by Sean Rosalejos";
});

Route::get('/insert-user', function () {
    $user = User::create([
        'name' => 'Sean Rosalejos ' . rand(1, 100000),
        'email' => 'seanrosalejosismyemail' . rand(1, 10000) . '@example.com',
        'password' => Hash::make('123456'),
    ]);
    return $user;
});
Route::get('/users', function () {
    return User::where('name', 'like', '%ella%')->get();
});
Route::get('/test-email', function () {
    $user = User::inRandomOrder()->first();
    if (!$user) {
        return "No users found in database! Run 'php artisan db:seed' first.";
    }
    Mail::raw("Welcome to the app, {$user->name}! This is a test email sent by Sean Rosalejos.", function ($message) use ($user) {
        $message->to($user->email)
                ->subject('Laravel Docker Test Email');
    });
    return "Email sent to {$user->name} ({$user->email})! Check Mailpit: http://localhost:8025";
});
