<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $projects = Project::factory()
                ->count(rand(5, 10))
                ->create(['user_id' => $user->id]);

            foreach ($projects as $project) {
                Task::factory()
                    ->count(rand(5, 10))
                    ->create(['project_id' => $project->id]);
            }
        }
    }
}

