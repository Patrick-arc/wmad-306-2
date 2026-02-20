<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $projects = Project::query()
            ->where('user_id', $user->id)
            ->withCount([
                'tasks',
                'tasks as completed_tasks_count' => fn ($query) => $query->where('status', Task::STATUS_COMPLETED),
            ])
            ->with([
                'tasks' => fn ($query) => $query->latest()->take(6),
            ])
            ->latest()
            ->take(6)
            ->get();

        $totalProjects = $projects->count();
        $totalTasks = (int) $projects->sum('tasks_count');
        $completedTasks = (int) $projects->sum('completed_tasks_count');

        $overdueTasks = 0;

        $activity = Task::query()
            ->whereHas('project', fn ($query) => $query->where('user_id', $user->id))
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalProjects' => $totalProjects,
                'totalTasks' => $totalTasks,
                'completedTasks' => $completedTasks,
                'overdueTasks' => $overdueTasks,
            ],
            'projects' => $projects,
            'activity' => $activity,
        ]);
    }
}
