<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $tasks = Task::whereHas('project', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('project')->get();
        $projects = $user->projects;  // User's projects for the component's dropdown

        return Inertia::render('TasksPage', [
            'tasks' => $tasks,
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        // Not needed for Inertia; handled in the component
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'project_id' => 'required|exists:projects,id',
            'priority' => 'sometimes|in:low,medium,high',  // Added for component support
        ]);

        // Ensure the project belongs to the user
        $project = Auth::user()->projects()->findOrFail($request->project_id);

        $project->tasks()->create([
            'title' => $request->title,
            'project_id' => $request->project_id,
            'priority' => $request->priority ?? 'low',
            'status' => 'active',  // Default status
        ]);

        return redirect()->back();
    }

    public function show(Task $task)
    {
        // Optional: If you want a detail page, implement Inertia render here
    }

    public function edit(Task $task)
    {
        // Not needed for Inertia; handled in the component
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'project_id' => 'sometimes|required|exists:projects,id',
            'priority' => 'sometimes|in:low,medium,high',
        ]);

        // Scope to user's tasks
        $task = Task::whereHas('project', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->findOrFail($task->id);

        $task->update($request->only(['title', 'project_id', 'priority']));

        return redirect()->back();
    }

    public function destroy(Task $task)
    {
        // Scope to user's tasks
        $task = Task::whereHas('project', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->findOrFail($task->id);

        $task->delete();

        return redirect()->back();
    }

    // Added for component's toggle functionality
    public function toggleStatus($id)
    {
        $task = Task::whereHas('project', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->findOrFail($id);

        $task->status = $task->status === 'active' ? 'completed' : 'active';
        $task->save();

        return redirect()->back();
    }
}