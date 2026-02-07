<?php

namespace App\Http\Controllers;

// Import your User model and Inertia
use App\Models\User; 
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // 1. Get all users from the database using your User model
        $users = User::all();

        // 2. Render the 'UserList' React component and pass the users data to it
        return Inertia::render('UserList', [
            'users' => $users
        ]);
    }
}