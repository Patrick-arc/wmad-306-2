<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\Project;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure there are projects
        if (Project::count() === 0) {
            return;
        }

        // For each project, create 5–10 tasks
        Project::all()->each(function ($project) {
            Task::factory()
                ->count(rand(5, 10)) // random 5–10 tasks
                ->for($project)       // assign project_id
                ->create();
        });
    }
}
