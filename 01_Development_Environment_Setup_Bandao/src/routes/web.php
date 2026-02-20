<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "Successfully install Laravel! Jsa Bandao";
});

Route::get('/about', function () {
    return "This is the about page.Created by Jsa Bandao";

});
Route::get('/insert-user', function () {
    //Model(ORM) - Eloquent//
    return user::create([
        'name' => 'Jsa Bandao' . rand(1, 1000000),
        'email' => 'jsa.bandao' . rand(1, 100000) . '@example.com',
        'password' => Hash::make('123456'),
    ]);

});
 Route::get('/users', function () {
    return User::where('name', 'like', '%ella%')->get();
});

Route::get('/test-email', function () {
    $user = User::all()->shuffle()->first();
    Mail::raw("Kumusta $user->name!", function ($message) use ($user) {
        $message->to($user->email)->subject("Hello from Laravel!");
    });
});
