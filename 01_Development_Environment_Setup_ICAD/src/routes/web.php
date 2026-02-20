<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return "Succesfully installed Laravel! Icad Jamiell";
});

route::get('/anout', function () {
    return "This about page was created by Jamiell";
});

route::get('/insert-user', function () {
    return User::create([
        'name' => 'Jamiell Icad' . rand(1, 1000000),
        'email' => 'Jamiell.icad' . rand(1, 1000000) . '@gmail.com',
        'password' => Hash::make('123456'),
    ]);
});

route::get('/test-email', function () {
    $user = User::where('name','like','%ella%')->get();

});

Route::get('/test-email', function () {
    $user = User::all()->shuffle()->first();
    Mail::raw("Welcome $user->name!", function($message) use ($user){
        $message->to($user->email)->subject("Hello from Laravel!");
    });

});
