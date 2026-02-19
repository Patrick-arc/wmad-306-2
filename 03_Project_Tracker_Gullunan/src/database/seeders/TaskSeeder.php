<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (! Schema::hasTable('projects') || ! Schema::hasTable('tasks')) {
            $this->command->warn('Skipping TaskSeeder — required table(s) missing. Run migrations first.');
            return;
        }

        // ensure we have some projects to attach tasks to
        $projects = Project::count() ? Project::all() : null;

        if (! $projects) {
            $user = User::firstOrCreate(
                ['email' => 'test@example.com'],
                ['name' => 'Test User', 'password' => Hash::make('password')]
            );

            $projects = Project::factory()->count(5)->create(['user_id' => $user->id]);
        }

        // create tasks for existing projects
        foreach ($projects as $project) {
            // create between 5 and 10 tasks per project
            Task::factory()->count(rand(5,10))->for($project)->create();
        }

        $this->command->info('TaskSeeder: seeded tasks for ' . $projects->count() . " project(s).");
    }
}
