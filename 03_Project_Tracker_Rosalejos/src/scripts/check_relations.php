<?php

// Bootstrap Laravel
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Project;
use App\Models\Task;

echo "User::first()->id = ";
$u = User::first();
echo ($u ? $u->id : 'null') . PHP_EOL;

echo "User::first()->projects count = ";
if ($u) {
    $projects = $u->projects()->get();
    echo $projects->count() . PHP_EOL;
} else {
    echo "no user" . PHP_EOL;
}

echo "Project::first()->id = ";
$p = Project::first();
echo ($p ? $p->id : 'null') . PHP_EOL;

echo "Project::first()->tasks count = ";
if ($p) {
    $tasks = $p->tasks()->get();
    echo $tasks->count() . PHP_EOL;
} else {
    echo "no project" . PHP_EOL;
}

// Test status persistence: pick a task, toggle and save
$t = Task::first();
if ($t) {
    echo "Task::first()->id = {$t->id}, status = {$t->status}\n";
    $orig = $t->status;
    $t->status = ($t->status === 'todo') ? 'in_progress' : 'todo';
    $t->save();
    $t2 = Task::find($t->id);
    echo "After toggle saved status = {$t2->status}\n";
    // restore original
    $t2->status = $orig;
    $t2->save();
    echo "Restored status = {$t2->status}\n";
} else {
    echo "no task found\n";
}
