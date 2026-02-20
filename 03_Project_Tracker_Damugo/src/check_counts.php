<?php

require __DIR__ . '/vendor/autoload.php';

use App\Models\User;
use App\Models\Project;
use App\Models\Task;

echo "Users: " . User::count() . PHP_EOL;
echo "Projects: " . Project::count() . PHP_EOL;
echo "Tasks: " . Task::count() . PHP_EOL;

$u = User::first();
if ($u) {
    echo "First user: " . $u->id . " - projects: " . $u->projects()->count() . PHP_EOL;
} else {
    echo "No users found" . PHP_EOL;
}

$p = Project::first();
if ($p) {
    echo "First project: " . $p->id . " - tasks: " . $p->tasks()->count() . PHP_EOL;
} else {
    echo "No projects found" . PHP_EOL;
}
