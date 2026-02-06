<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\Email;
use App\Mail\UserMail;

Route::get('/', function () {
    $users = User::limit(20)->get();
    $emails = Email::latest()->get();
    return view('welcome', compact('users', 'emails'));
});

Route::post('/send-email', function () {
    $users = User::all();

    foreach ($users as $user) {
        $body = "Hello {$user->name}, this is a test email.";

        Mail::to($user->email)->send(new UserMail($body));

        Email::create([
            'to_email' => $user->email,
            'subject' => 'User Notification',
            'body' => $body,
        ]);
    }

    return redirect('/');
});
