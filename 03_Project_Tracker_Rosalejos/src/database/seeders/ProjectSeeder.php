<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $count = rand(5, 10);
            Project::factory()->count($count)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
