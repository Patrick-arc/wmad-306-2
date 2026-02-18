<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;    

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all existing users
        $users = User::all();
        
        // Create 5-10 projects for each user
        foreach ($users as $user) {
            Project::factory()->count(rand(5, 10))->create([
                'user_id' => $user->id
            ]);
        }
    }
}   
