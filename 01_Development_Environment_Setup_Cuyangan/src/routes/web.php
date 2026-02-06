<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "Successfully installed Laravel! Lryn Cuyangan";
});

Route::get('/about', function () {
    return "This is the about page. Created by Lryn Cuyangan.";
});

Route::get('/insert-user', function () {
    //Model (ORM) - Eloquent
    return User::create([
        'name' => 'Lryn Cuyangan' . rand(1, 1000000),
        'email' => 'lryn.cuyangan' . rand(1, 1000000) . '@example.com',
        'password' =>Hash::make('123456'),
    ]);
});

Route::get('/users', function () {
    return User::where('name', 'LIKE', '%Lryn%')->get();
});

Route::get('test-email', function () {
    $user = User::all()->shuffle()->first();
        Mail::raw("Kamusta $user->name!", function ($message) use ($user) {
            $message->to($user->email)->subject('Test Email from Laravel');
        });

});