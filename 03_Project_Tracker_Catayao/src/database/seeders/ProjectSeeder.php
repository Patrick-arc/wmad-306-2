<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->each(function (User $user) {
            if ($user->projects()->exists()) {
                return;
            }

            $projectCount = fake()->numberBetween(5, 10);

            Project::factory()
                ->count($projectCount)
                ->create(['user_id' => $user->id]);
        });
    }
}
