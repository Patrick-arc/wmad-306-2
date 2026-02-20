<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Project::query()->each(function (Project $project) {
            if ($project->tasks()->exists()) {
                return;
            }

            $taskCount = fake()->numberBetween(5, 10);

            Task::factory()
                ->count($taskCount)
                ->create(['project_id' => $project->id]);
        });
    }
}
