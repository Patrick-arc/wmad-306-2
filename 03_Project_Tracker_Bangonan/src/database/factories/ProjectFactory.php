<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    protected $model = \App\Models\Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Must provide a user_id (create one if none exists)
            'user_id' => User::factory(),

            // Required NOT NULL title
            'title' => $this->faker->sentence(3),

            // Optional description
            'description' => $this->faker->paragraph(),
        ];
    }
}
