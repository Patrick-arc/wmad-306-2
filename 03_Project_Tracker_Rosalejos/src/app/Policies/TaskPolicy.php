<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    public function viewAny(User $user, Project $project)
    {
        return $user->id === $project->user_id;
    }

    public function view(User $user, Task $task)
    {
        return $user->id === $task->project->user_id;
    }

    // Allow creating a task for a project only if user owns the project
    public function create(User $user, Project $project)
    {
        return $user->id === $project->user_id;
    }

    public function update(User $user, Task $task)
    {
        return $user->id === $task->project->user_id;
    }

    public function delete(User $user, Task $task)
    {
        return $user->id === $task->project->user_id;
    }
}
