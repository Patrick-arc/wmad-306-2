<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        // Get tasks for the current user's projects
        $query = Task::whereHas('project', function ($q) use ($request) {
            $q->where('user_id', $request->user()->id);
        });

        if ($request->project_id) {
            $query->where('project_id', $request->project_id);
        }

        return Inertia::render('Tasks/Index', [
            'tasks' => $query->with('project')->get(),
            'projects' => Project::where('user_id', $request->user()->id)->get(),
            'filters' => $request->only(['project_id'])
        ]);
    }

    // FIXED: Injected Request to safely get user ID
    public function create(Request $request)
    {
        return Inertia::render('Tasks/Create', [
            'projects' => Project::where('user_id', $request->user()->id)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'project_id' => 'required|exists:projects,id',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        Task::create($validated);

        return redirect()->route('tasks.index');
    }

    // FIXED: Injected Request to safely get user ID
    public function edit(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projects' => Project::where('user_id', $request->user()->id)->get()
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'sometimes|in:low,medium,high',
            'status' => 'sometimes|in:pending,completed',
            'project_id' => 'sometimes|exists:projects,id',
        ]);

        $task->update($validated);

        return redirect()->back();
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        
        $task->delete();
        return redirect()->back();
    }
}