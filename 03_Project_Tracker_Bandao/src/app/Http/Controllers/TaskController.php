<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Create the controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->authorizeResource(Task::class, 'task');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Get all tasks, optionally with project relationship
            $tasks = Task::all();
            
            // Filter tasks that belong to user's projects or have no project
            $filteredTasks = $tasks->filter(function ($task) {
                // If task has no project, include it
                if (!$task->project_id) {
                    return true;
                }
                
                // If task has project, check if it belongs to the user
                return $task->project && $task->project->user_id === auth()->id();
            });

            // Render the Inertia Tasks page and pass the data
            return inertia('Tasks', [
                'tasks' => $filteredTasks->values(),
            ]);
        } catch (\Exception $e) {
            // If there's an error, return empty tasks array
            return inertia('Tasks', [
                'tasks' => [],
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get user's projects for selection
        $projects = auth()->user()->projects()->get(['id', 'title']);
        
        return inertia('Tasks/Create', [
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $validatedData = $request->validated();
        
        // Get user's first project as default, or use 0 for unassigned
        $defaultProjectId = null;
        if (!isset($validatedData['project_id']) || $validatedData['project_id'] === null) {
            $firstProject = auth()->user()->projects()->first();
            $defaultProjectId = $firstProject ? $firstProject->id : 0;
        }
        
        $taskData = [
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? null,
            'priority' => $validatedData['priority'] ?? 'medium',
            'status' => $validatedData['status'] ?? 'pending',
            'project_id' => $validatedData['project_id'] ?? $defaultProjectId,
        ];
        
        Task::create($taskData);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Tasks/Show', [
            'task' => $task->load('project'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        // Get user's projects for selection
        $projects = auth()->user()->projects()->get(['id', 'title']);
        
        return inertia('Tasks/Edit', [
            'task' => $task,
            'projects' => $projects,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update([
            'title' => $request->validated()['title'],
            'description' => $request->validated()['description'] ?? null,
            'project_id' => $request->validated()['project_id'],
            'priority' => $request->validated()['priority'] ?? $task->priority,
            'status' => $request->validated()['status'] ?? $task->status,
        ]);

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }

    /**
     * Custom method: Toggle task status
     */
    public function toggleStatus(Task $task)
    {
        $this->authorize('update', $task);

        $task->status = !$task->status;
        $task->save();

        return back();
    }
}
