<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Require authentication for all methods.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display all tasks across all projects for the authenticated user.
     */
    public function allTasks()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Get all tasks from user's projects
        $tasks = Task::whereHas('project', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->with('project')
        ->latest()
        ->get();

        // Get all projects for the user (for creating new tasks)
        $projects = $user->projects()->orderBy('title')->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'projects' => $projects,
            'showAll' => true, // Flag to indicate this is showing all tasks
        ]);
    }

    /**
     * Display tasks for a specific project.
     */
    public function index(Project $project)
    {
        $this->authorizeProject($project);

        $tasks = $project->tasks()->latest()->get();

        return Inertia::render('Tasks/Index', [
            'project' => $project,
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show form to create a new task.
     */
    public function create(Project $project)
    {
        $this->authorizeProject($project);

        return Inertia::render('Tasks/Create', [
            'project' => $project,
        ]);
    }

    /**
     * Store a newly created task.
     */
    public function store(StoreTaskRequest $request, Project $project)
    {
        $this->authorizeProject($project);

        $project->tasks()->create($request->validated());

        return redirect()
            ->route('projects.show', $project)
            ->with('message', 'Task created successfully');
    }

    /**
     * Show a specific task.
     */
    public function show(Project $project, Task $task)
    {
        $this->authorizeTask($project, $task);

        return Inertia::render('Tasks/Show', [
            'project' => $project,
            'task' => $task,
        ]);
    }

    /**
     * Show form to edit a task.
     */
    public function edit(Project $project, Task $task)
    {
        $this->authorizeTask($project, $task);

        return Inertia::render('Tasks/Edit', [
            'project' => $project,
            'task' => $task,
        ]);
    }

    /**
     * Update a task.
     */
    public function update(UpdateTaskRequest $request, Project $project, Task $task)
    {
        $this->authorizeTask($project, $task);

        $task->update($request->validated());

        return redirect()
            ->route('projects.show', $project)
            ->with('message', 'Task updated successfully');
    }

    /**
     * Delete a task.
     */
    public function destroy(Project $project, Task $task)
    {
        $this->authorizeTask($project, $task);

        $task->delete();

        return redirect()
            ->route('projects.show', $project)
            ->with('message', 'Task deleted successfully');
    }

    /**
     * Toggle task status: pending -> in_progress -> completed -> pending
     */
    public function toggleStatus(Project $project, Task $task)
    {
        $this->authorizeTask($project, $task);

        $statuses = ['pending', 'in_progress', 'completed'];
        $currentStatus = $task->status ?? 'pending';
        $currentIndex = array_search($currentStatus, $statuses);

        $nextIndex = ($currentIndex === false ? 0 : ($currentIndex + 1) % count($statuses));
        $task->status = $statuses[$nextIndex];
        $task->save();

        return redirect()
            ->route('projects.show', $project)
            ->with('message', 'Task status updated successfully');
    }

    /**
     * Helper: Ensure the authenticated user owns the project.
     */
    private function authorizeProject(Project $project)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user || $project->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
    }

    /**
     * Helper: Ensure the task belongs to the project and user owns the project.
     */
    private function authorizeTask(Project $project, Task $task)
    {
        $this->authorizeProject($project);

        if ($task->project_id !== $project->id) {
            abort(404);
        }
    }
}
