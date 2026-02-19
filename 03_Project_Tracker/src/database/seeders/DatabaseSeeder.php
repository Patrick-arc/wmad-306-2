<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
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
        // User::factory(10)->create();

        User::factory(3)->create()->each(function ($user) {
    $projects = Project::factory(5)->create([
        'user_id' => $user->id
    ]);

    foreach ($projects as $project) {
        Task::factory(5)->create([
            'project_id' => $project->id
        ]);
    }
});
    }
}
