<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return "Successfuly Installed Laravel Rhode";
});

Route::get('/about', function () {
    return "This is the about page, Created by Rhode";
});

Route::get('/insert-user', function (){
    //Model (ORM) - Eloquent
    return User::Create([
        'name' => 'Rhode John Abiñon' . rand (1, 1000000),
        'email' => 'Rhode.Abiñon' . rand(1, 1000000) . '@example.com',
        'password' => Hash::make('123456'),
    ]);
});

route::get('/test-email', function(){
    $user = User::where('name','like','%ella%')->get();
});
 Route::get('/test-email', function (){
    $user = User::all()->shuffle()->first();
    Mail::raw("Welcome $user->name!",function($message) use ($user){
        $message->to($user->email)->subject("Hello From Laravel");
    });
 });
