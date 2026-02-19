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
        // Get the first user or create one
        $user = User::first() ?? User::factory()->create();

        // Create 10 projects for the user
        Project::factory(10)->create([
            'user_id' => $user->id,
        ]);

        // Create projects for additional users if they exist
        User::skip(1)->limit(4)->get()->each(function ($user) {
            Project::factory(5)->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
