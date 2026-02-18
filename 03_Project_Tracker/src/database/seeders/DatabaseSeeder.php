<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
{
    // 1. Create a Test User
    $user = \App\Models\User::factory()->create([
        'name' => 'Student Developer',
        'email' => 'test@example.com',
    ]);

    // 2. Create 10 Projects for that user
    \App\Models\Project::factory(10)->create([
        'user_id' => $user->id
    ])->each(function ($project) {
        // 3. For each project, create 5-10 tasks [cite: 1, 23, 29]
        \App\Models\Task::factory(rand(5, 10))->create([
            'project_id' => $project->id
        ]);
    });
}
}
