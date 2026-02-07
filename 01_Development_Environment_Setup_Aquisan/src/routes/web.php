<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;


Route::get('/', function () {
    return "Succesfully installed Laravel Paulo";
});

Route::get('/about', function (){
    return "This is about page. Created by Jp";
});

Route::get('/insert-user', function(){
    return User::Create([
        'name' => 'Jp Aquisan' . rand(1, 1000000),
        'email' => 'jp.aquisan' . rand(1, 1000000) . '@example.com',
        'password' => Hash::make('123456'),

    ]);
});

Route::get('/test-email', function(){
    $user= User::where('name','like','%ella%')->get();
});

Route::get('test-email', function(){
    $user =User::all()->shuffle()->first();
    Mail::raw("Welcome $user->name!", function($message)use($user){
        $message->to($user->email)->subject("Hello from Laravel");
    });
});