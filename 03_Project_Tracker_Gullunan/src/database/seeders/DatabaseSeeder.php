<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\ProjectSeeder;
use Database\Seeders\TaskSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // create a deterministic test user without causing duplicate-key errors
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        if (Schema::hasTable('projects')) {
            $this->call([
                ProjectSeeder::class,
            ]);
        } else {
            $this->command->warn('Skipping ProjectSeeder — `projects` table does not exist. Run migrations first.');
        }

        // tasks (will check inside TaskSeeder whether `tasks` table exists)
        $this->call([
            TaskSeeder::class,
        ]);
    }
}