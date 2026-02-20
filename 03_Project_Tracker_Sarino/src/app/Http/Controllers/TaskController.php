<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Create a new task for a project
    public function store(Request $request, Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:1,2,3',
            'status' => 'required|in:not_yet_done,completed',
        ]);

        $task = $project->tasks()->create($validated);

        return response()->json($task, 201);
    }

    // Delete a task
    public function destroy(Project $project, Task $task)
    {
        if ($project->user_id !== Auth::id() || $task->project_id !== $project->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted'], 200);
    }
}
