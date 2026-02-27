<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    // Show Dashboard with all projects and their tasks
    public function index()
    {
        return Inertia::render('Dashboard', [
            'projects' => Project::where('user_id', auth()->id())
                ->with('tasks')
                ->get()
        ]);
    }

    // Store a new task
    public function storeTask(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        // Get first project of user, or create one if none exists
        $project = Project::where('user_id', auth()->id())->first();

        if (!$project) {
            $project = Project::create([
                'title' => 'My First Project',
                'user_id' => auth()->id(),
            ]);
        }

        $projectId = $validated['project_id'] ?? $project->id;

        Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'project_id' => $projectId,
            'status' => 'pending',
        ]);

        return back();
    }

    // Update an existing task
    public function updateTask(Request $request, Task $task)
    {
        // Security: Ensure user owns this task
        if ($task->project->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task->update($validated);

        return back();
    }

    // Toggle task status: pending <-> completed
    public function toggleTask(Task $task)
    {
        // Security: Ensure user owns this task
        if ($task->project->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update([
            'status' => $task->status === 'pending' ? 'completed' : 'pending'
        ]);

        return back();
    }

    // Trash/Delete task
    public function destroyTask(Task $task)
    {
        // Security: Ensure user owns this task
        if ($task->project->user_id !== auth()->id()) {
            abort(403);
        }

        if ($task->status === 'pending') {
            // If pending, move to completed (like "mark as done")
            $task->update(['status' => 'completed']);
        } else {
            // If already completed, delete permanently
            $task->delete();
        }

        return back();
    }
}