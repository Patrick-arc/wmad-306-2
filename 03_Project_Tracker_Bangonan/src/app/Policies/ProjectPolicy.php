<?php

namespace App\Policies;

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    // Anyone can view their own projects
    public function viewAny(User $user): bool
    {
        return true; // user can see their projects
    }

    public function view(User $user, Project $project): bool
    {
        return $user->id === $project->user_id; // only owner can view
    }

    public function create(User $user): bool
    {
        return true; // any logged-in user can create a project
    }

    public function update(User $user, Project $project): bool
    {
        return $user->id === $project->user_id; // only owner can update
    }

    public function delete(User $user, Project $project): bool
    {
        return $user->id === $project->user_id; // only owner can delete
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
