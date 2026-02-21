<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        // Eager-load tasks for each project so the index can display them on flip
        $projects = Auth::user()->projects()->with('tasks')->withCount('tasks')->get();
        $tasksCount = Task::where('user_id', Auth::id())->count();
        return Inertia::render('Projects/Index', ['projects' => $projects, 'tasksCount' => $tasksCount]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'nullable|in:todo,in_progress,done',
        ]);

        $data['priority'] = $data['priority'] ?? 'medium';
        $data['status'] = $data['status'] ?? 'todo';

        $project = Auth::user()->projects()->create($data);

        return Redirect::route('projects.index');
    }

    public function show(Project $project)
    {
        $this->authorize('view', $project);
        $project->load('tasks');
        return Inertia::render('Projects/Show', ['project' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'nullable|in:todo,in_progress,done',
        ]);

        // ensure defaults if caller omits fields
        if (! array_key_exists('priority', $data)) {
            $data['priority'] = $project->priority ?? 'medium';
        }
        if (! array_key_exists('status', $data)) {
            $data['status'] = $project->status ?? 'todo';
        }

        $project->update($data);

        return Redirect::route('projects.show', $project);
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();
        return Redirect::route('projects.index');
    }

    /**
     * Mark a project as done (quick action)
     */
    public function markDone(Project $project)
    {
        $this->authorize('update', $project);
        // persist previous status so undo can restore it
        try {
            $project->previous_status = $project->status ?: null;
            $project->status = 'done';
            $project->save();
        } catch (\Illuminate\Database\QueryException $e) {
            // If migrations haven't been run (column missing), fallback to setting status only
            $project->status = 'done';
            $project->save();
        }
        return Redirect::back();
    }

    public function markUndo(Project $project)
    {
        $this->authorize('update', $project);
        try {
            $target = $project->previous_status ?: 'todo';
            $project->status = $target;
            $project->previous_status = null;
            $project->save();
        } catch (\Illuminate\Database\QueryException $e) {
            // If previous_status column doesn't exist, just set to todo
            $project->status = 'todo';
            $project->save();
        }
        return Redirect::back();
    }
}
