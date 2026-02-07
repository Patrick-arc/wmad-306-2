<?php

namespace Database\Seeders;

use App\Models\User; // You must import the User model
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // This command creates 10 random users in your database
        User::factory(10)->create(); 
    }
}