<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Models\Task;

class WelcomeController extends Controller
{
    public function index()
    {
        $projects = Project::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'user_name' => optional($project->user)->name ?? 'Unknown',
                ];
            });

        $tasks = Task::with('project')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'status' => $task->status,
                    'project_title' => optional($task->project)->title ?? 'Unknown Project',
                ];
            });

        return Inertia::render('Welcome', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'featuredProjects' => $projects,
            'featuredTasks' => $tasks,
        ]);
    }
}
