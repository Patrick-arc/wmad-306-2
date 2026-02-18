<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $tasks = Task::query()
            ->whereHas('project', fn ($query) => $query->where('user_id', $userId))
            ->with('project:id,title')
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $projects = Project::query()
            ->where('user_id', $userId)
            ->latest()
            ->get(['id', 'title']);

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => [
                'required',
                Rule::exists('projects', 'id')->where('user_id', auth()->id()),
            ],
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => ['nullable', Rule::in(Task::PRIORITY_OPTIONS)],
            'status' => ['nullable', Rule::in(Task::STATUS_OPTIONS)],
        ]);

        Task::create([
            'project_id' => $validated['project_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'] ?? Task::PRIORITY_MEDIUM,
            'status' => $validated['status'] ?? Task::STATUS_PENDING,
        ]);

        return back();
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return back();
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => ['required', Rule::in(Task::PRIORITY_OPTIONS)],
            'status' => ['required', Rule::in(Task::STATUS_OPTIONS)],
        ]);

        $task->update($validated);

        return back();
    }

    public function toggle(Task $task)
    {
        $this->authorize('update', $task);

        $task->update([
            'status' => $task->status === Task::STATUS_COMPLETED
                ? Task::STATUS_PENDING
                : Task::STATUS_COMPLETED,
        ]);

        return back();
    }
}
