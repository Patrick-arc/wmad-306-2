<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Store a new task under a project
    public function store(Request $request, Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:1,2,3',
            'status' => 'required|in:not_yet_done,completed',
        ]);

        $task = $project->tasks()->create($request->only('title','description','priority','status'));

        return response()->json(['task' => $task]);
    }

    // Delete a task
    public function destroy(Project $project, Task $task)
    {
        if ($project->user_id !== Auth::id() || $task->project_id !== $project->id) {
            abort(403, 'Unauthorized');
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
