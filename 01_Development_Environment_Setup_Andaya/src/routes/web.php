<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Route::get('/', function () {
    return "Succesfully installed Laravel! Arvin ";
});

route::get('/about', function () {
    return "This is the about page. Created by Arvin";
});


route::get('/insert-user', function () {
    return User::create([
        'name' => 'Arvin Andaya' . rand(1, 1000000),
        'email' => 'Arvin.andaya' . rand(1, 1000000) . '@gmail.com',
        'password' => Hash::make('123456'),
    ]);
});

route::get('/test-email', function () {
    $user = User::where('name','like','%ella%')->get();

});

Route::get('/test-email', function () {
    $user = User::all()->shuffle()->first();
    Mail::raw("Welcome $user->name!",function($message) use ($user){
        $message->to($user->email)->subject("Hello from Laravel!");
    });

});