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
        $tasks = Task::whereHas('project', function ($q) {
            $q->where('user_id', Auth::id());
        })->get();
        
        $projects = Auth::user()->projects()->get();

        return Inertia::render('Tasks/Index', ['tasks' => $tasks, 'projects' => $projects]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'in:low,medium,high',
            'status' => 'in:todo,in_progress,done',
        ]);

        $project = Project::findOrFail($data['project_id']);
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

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
}
