<?php

// database/factories/TaskFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Project;
use App\Models\Task;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            // Automatically create a project if none is provided
            'project_id' => Project::factory(),

            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
        ];
    }
}

