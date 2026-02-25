<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $projects = Project::all();

        foreach ($projects as $project) {
            // Inject 5-10 tasks per project
            Task::factory()
                ->count(5)
                ->create([
                    'project_id' => $project->id,
                ]);
        }
    }
}