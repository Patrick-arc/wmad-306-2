<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch all users to ensure projects are linked to someone
        $users = User::all();

        // Loop through each user as per the manual's injection logic
        foreach ($users as $user) {
            // Inject 5-10 fake projects per user
            Project::factory()
                ->count(8) // You can choose any number between 5 and 10
                ->create([
                    'user_id' => $user->id,
                ]);
        }
    }
}