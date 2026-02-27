<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        $priorities = ['low', 'medium', 'high'];

        return [
            'project_id' => Project::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'priority' => $priorities[array_rand($priorities)],
            'status' => fake()->boolean(30),
        ];
    }
}
