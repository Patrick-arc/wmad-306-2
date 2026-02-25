<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // For each existing project, create between 5 and 10 tasks
        Project::all()->each(function (Project $project) {
            Task::factory()->count(rand(5, 10))->create([
                'project_id' => $project->id,
            ]);
        });
    }
}
