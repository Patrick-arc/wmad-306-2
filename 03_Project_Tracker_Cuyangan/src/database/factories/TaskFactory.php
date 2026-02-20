<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'project_id' => Project::factory(),
            'title' => fake()->sentences(3, true),
            'description' => fake()->paragraph(3, true),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed'])
        ];  
    }
}

