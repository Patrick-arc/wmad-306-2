<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Project $project): Response
    {
        $this->authorize('viewAny', $project);

        $tasks = $project->tasks()->get();

        return Inertia::render('Tasks/Index', [
            'project' => $project,
            'tasks' => $tasks,
        ]);
    }

    public function create(Project $project): Response
    {
        $this->authorize('create', [\App\Models\Task::class, $project]);

        return Inertia::render('Tasks/Create', [
            'project' => $project,
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $this->authorize('create', [\App\Models\Task::class, $project]);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in_progress,done',
        ]);

        $data['project_id'] = $project->id;

        $task = Task::create($data);

        // For AJAX/JSON callers return JSON, otherwise redirect to the shallow task show route
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(['task' => $task], 201);
        }

        return Redirect::route('tasks.show', $task->id);
    }

    public function show(Project $project, Task $task): Response
    {
        $this->authorize('view', $task);

        return Inertia::render('Tasks/Show', [
            'project' => $project,
            'task' => $task,
        ]);
    }

    public function edit(Project $project, Task $task): Response
    {
        $this->authorize('update', $task);

        return Inertia::render('Tasks/Edit', [
            'project' => $project,
            'task' => $task,
        ]);
    }

    public function update(Request $request, Project $project, Task $task)
    {
        $this->authorize('update', $task);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in_progress,done',
        ]);

        $task->update($data);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(['task' => $task], 200);
        }

        return Redirect::route('tasks.show', $task->id);
    }

    public function destroy(Project $project, Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return Redirect::route('projects.tasks.index', $project->id);
    }

    // Toggle task status between 'todo' -> 'in_progress' -> 'done'
    public function toggleStatus(Task $task)
    {
        $this->authorize('update', $task);

        $next = [
            'todo' => 'in_progress',
            'in_progress' => 'done',
            'done' => 'todo',
        ];

        $task->status = $next[$task->status] ?? 'todo';
        $task->save();

        return redirect()->back();
    }
}
