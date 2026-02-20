<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    public function __construct(...$args)
    {
        parent::__construct(...$args);
        $this->faker->locale('en_US');
    }
{
    protected $model = Task::class;

    public function definition(): array
    {
        $priorities = ['low','medium','high'];
        $statuses = ['todo','in_progress','done'];

        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'priority' => $this->faker->randomElement($priorities),
            'status' => $this->faker->randomElement($statuses),
            'project_id' => null, // supply when creating
        ];
    }
}
