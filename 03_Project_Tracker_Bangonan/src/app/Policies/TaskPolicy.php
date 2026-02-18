<?php
namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    // Can the user see all tasks? Only their own tasks
    public function viewAny(User $user): bool
    {
        return true;
    }

    // Can the user view a single task?
    public function view(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }

    // Can the user create a task? Any logged-in user can create for their project
    public function create(User $user): bool
    {
        return true;
    }

    // Can the user update a task? Only if they own the project
    public function update(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }

    // Can the user delete a task? Only if they own the project
    public function delete(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }

    public function restore(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }

    public function forceDelete(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }
}
