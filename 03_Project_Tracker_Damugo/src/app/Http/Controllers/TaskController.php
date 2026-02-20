<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // <--- ADD THIS

class TaskController extends Controller
{
    use AuthorizesRequests; // <--- ADD THIS
    public function index()
    {
        // Return tasks that belong directly to the user. Tasks may have null project_id.
        $tasks = Task::where('user_id', Auth::id())->get();

        $projects = Auth::user()->projects()->get();

        return Inertia::render('Tasks/Index', ['tasks' => $tasks, 'projects' => $projects]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'in:low,medium,high',
            'status' => 'in:todo,in_progress,done',
        ]);

        // If a project_id is provided, ensure the current user owns the project
        if (!empty($data['project_id'])) {
            $project = Project::findOrFail($data['project_id']);
            if ($project->user_id !== Auth::id()) {
                abort(403);
            }
        }

        // Associate task with the authenticated user (tasks can be standalone)
        $data['user_id'] = Auth::id();

        $task = Task::create($data);

        return Redirect::route('tasks.index');
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);
        return Inertia::render('Tasks/Show', ['task' => $task]);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'in:low,medium,high',
            'status' => 'in:todo,in_progress,done',
        ]);

        $task->update($data);

        // Redirect to index since show page does not exist
        return Redirect::route('tasks.index');
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return Redirect::route('tasks.index');
    }

    /**
     * Mark a task as done (quick action)
     */
    public function markDone(Request $request, Task $task)
    {
        $this->authorize('update', $task);
        try {
            // store previous status for undo
            $task->previous_status = $task->status ?: null;
            $task->status = 'done';
            $task->save();
        } catch (\Illuminate\Database\QueryException $e) {
            // If migrations not applied, fall back to status-only update
            $task->status = 'done';
            $task->save();
        }
        return Redirect::back();
    }

    public function markUndo(Request $request, Task $task)
    {
        $this->authorize('update', $task);
        try {
            $target = $task->previous_status ?: 'todo';
            $task->status = $target;
            $task->previous_status = null;
            $task->save();
        } catch (\Illuminate\Database\QueryException $e) {
            $task->status = 'todo';
            $task->save();
        }
        return Redirect::back();
    }
}
