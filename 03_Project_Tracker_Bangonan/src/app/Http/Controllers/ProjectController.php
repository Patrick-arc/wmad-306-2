<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Show the dashboard with stats.
     */
    public function dashboard()
    {
        $user = Auth::user();

        // Load projects with tasks in one query
        $projects = $user->projects()->with('tasks')->get();

        $projectsCount = $projects->count();
        $allTasks = $projects->flatMap->tasks;

        $activeTasksCount = $allTasks->where('status', 'active')->count();
        $completedTasksCount = $allTasks->where('status', 'completed')->count();

        $recentActivities = $allTasks
            ->sortByDesc('created_at')
            ->take(5)
            ->map(function ($task) {
                return [
                    'description' => "Task '{$task->title}' in project '{$task->project->title}'",
                    'timeAgo' => $task->created_at->diffForHumans(),
                ];
            })
            ->values();

        return Inertia::render('Dashboard', [
            'projectsCount' => $projectsCount,
            'activeTasksCount' => $activeTasksCount,
            'completedTasksCount' => $completedTasksCount,
            'recentActivities' => $recentActivities,
            'projects' => $projects,  // Added for dashboard management
            'tasks' => $allTasks,     // Added for dashboard management
        ]);
    }

    /**
     * List all projects (GET /projects)
     */
    public function index()
    {
        $user = Auth::user();
        $projects = $user->projects()->get();

        return Inertia::render('ProjectsPage', [
            'projects' => $projects,
        ]);
    }

    /**
     * Store a new project (POST /projects)
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed',  // Allow status
        ]);

        Auth::user()->projects()->create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? 'active',  // Default to 'active'
        ]);

        // Return updated page data instead of just redirecting
        $user = Auth::user();
        $projects = $user->projects()->get();

        return Inertia::render('ProjectsPage', [
            'projects' => $projects,
        ]);
    }

    /**
     * Update a project (PUT /projects/{id})
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed',  // Allow status
        ]);

        $project = Auth::user()->projects()->findOrFail($id);
        $project->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? $project->status,  // Preserve if not provided
        ]);

        // Return updated page data
        $user = Auth::user();
        $projects = $user->projects()->get();

        return Inertia::render('ProjectsPage', [
            'projects' => $projects,
        ]);
    }

    /**
     * Delete a project (DELETE /projects/{id})
     */
    public function destroy($id)
    {
        $project = Auth::user()->projects()->findOrFail($id);
        $project->delete();

        // Return updated page data
        $user = Auth::user();
        $projects = $user->projects()->get();

        return Inertia::render('ProjectsPage', [
            'projects' => $projects,
        ]);
    }

    /**
     * Optional: show single project
     */
    public function show($id)
    {
        $project = Auth::user()->projects()->with('tasks')->findOrFail($id);

        return Inertia::render('ProjectDetailPage', [
            'project' => $project,
        ]);
    }
}