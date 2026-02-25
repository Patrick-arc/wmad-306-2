<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $user): bool
    {
        // Allow any authenticated user to view their projects
        return true;
    }

    public function view(User $user, Project $project): bool
    {
        // Only allow if the user owns the project
        return $user->id === $project->user_id;
    }

    public function create(User $user): bool
    {
        // Any authenticated user can create a project
        return true;
    }

    public function update(User $user, Project $project): bool
    {
        // Only the owner can update
        return $user->id === $project->user_id;
    }

    public function delete(User $user, Project $project): bool
    {
        // Only the owner can delete
        return $user->id === $project->user_id;
    }

    public function restore(User $user, Project $project): bool
    {
        return $user->id === $project->user_id;
    }

    public function forceDelete(User $user, Project $project): bool
    {
        return $user->id === $project->user_id;
    }
}
