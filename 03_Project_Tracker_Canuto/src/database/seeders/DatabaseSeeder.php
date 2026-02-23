<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
{
    // Create a test user
    $user = \App\Models\User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);

    // Section 2: Create 10 fake projects for this user
    \App\Models\Project::factory(10)->create([
        'user_id' => $user->id
    ])->each(function ($project) {
        // Create 5 tasks for each project
        \App\Models\Task::factory(5)->create([
            'project_id' => $project->id
        ]);
    });
}
}