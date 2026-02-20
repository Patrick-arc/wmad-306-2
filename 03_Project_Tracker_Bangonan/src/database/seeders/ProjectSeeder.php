<?php

namespace Database\Seeders;

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
        // For each user, create 5–10 projects
        User::all()->each(function ($user) {
            Project::factory()
                ->count(rand(5, 10)) // random 5–10 projects
                ->for($user)          // assign user_id
                ->create();
        });
    }
}
