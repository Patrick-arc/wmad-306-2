<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Store a newly created task in a specific project.
     * Route: POST /projects/{project}/tasks
     * 
     * @param Request $request
     * @param Project $project - Injected via route model binding
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Project $project)
    {
        // Verify user owns this project
        $this->authorize('create', [Task::class, $project]);

        // Validate input - project_id is automatically set
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        // Create task - project_id automatically associated via $project->tasks()
        $task = $project->tasks()->create($validated);

        // Return JSON or redirect based on request type
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Task created successfully',
                'task' => $task,
            ], 201);
        }

        return back()->with('success', 'Task created successfully');
    }

    /**
     * Update the specified task in a project.
     * Route: PATCH /projects/{project}/tasks/{task}
     * 
     * @param Request $request
     * @param Project $project
     * @param Task $task
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Project $project, Task $task)
    {
        // Verify task belongs to project
        if ($task->project_id !== $project->id) {
            abort(404, 'Task not found in this project');
        }

        // Verify user owns this task's project
        $this->authorize('update', $task);

        // Validate input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        // Update task
        $task->update($validated);

        // Return JSON or redirect
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Task updated successfully',
                'task' => $task,
            ]);
        }

        return back()->with('success', 'Task updated successfully');
    }

    /**
     * Delete the specified task from a project.
     * Route: DELETE /projects/{project}/tasks/{task}
     * 
     * @param Project $project
     * @param Task $task
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function destroy(Project $project, Task $task)
    {
        // Verify task belongs to project
        if ($task->project_id !== $project->id) {
            abort(404, 'Task not found in this project');
        }

        // Verify user owns this task's project
        $this->authorize('delete', $task);

        // Delete task
        $task->delete();

        // Return JSON or redirect
        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully',
            ]);
        }

        return back()->with('success', 'Task deleted successfully');
    }
}
