<?php


namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {        if (! Schema::hasTable('users') || ! Schema::hasTable('projects')) {
            $this->command->warn('Skipping ProjectSeeder — `users` or `projects` table does not exist. Run migrations first.');
            return;
        }
        $user = User::factory()->create();
        Project::factory()->count(10)->create([
            'user_id' => $user->id
        ]);
    }
}
