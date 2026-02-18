<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
            'password' => bcrypt('password'),
        ]);

        User::firstOrCreate([
            'email' => 'demo@tracker.test',
        ], [
            'name' => 'Demo Manager',
            'password' => bcrypt('password'),
        ]);

        if (User::count() < 5) {
            User::factory()->count(5 - User::count())->create();
        }

        $this->call([
            ProjectSeeder::class,
            TaskSeeder::class,
        ]);
    }
}
