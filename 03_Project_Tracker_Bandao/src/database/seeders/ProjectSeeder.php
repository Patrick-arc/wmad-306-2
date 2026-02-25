<?php

namespace Database\Seeders;

use App\Models\Project;
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
        // Create multiple users and give each user 5-10 projects
        User::factory()
            ->count(10)
            ->create()
            ->each(function (User $user) {
                Project::factory()->count(rand(5, 10))->create([
                    'user_id' => $user->id,
                ]);
            });
    }
}
