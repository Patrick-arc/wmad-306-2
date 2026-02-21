<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tasks = Task::whereHas('project', function ($q) use ($request) {
            $q->where('user_id', $request->user()->id);
        })->with('project')->get();

        return response()->json($tasks);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'project_id' => 'required|integer|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'nullable|boolean',
        ]);

        $project = Project::findOrFail($data['project_id']);
        $this->authorize('view', $project);

        $task = Task::create($data);
        return response()->json($task, 201);
    }

    public function show(Request $request, Task $task): JsonResponse
    {
        $this->authorize('view', $task);
        $task->load('project');
        return response()->json($task);
    }

    public function update(Request $request, Task $task): JsonResponse
    {
        $this->authorize('update', $task);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'nullable|boolean',
        ]);

        $task->update($data);
        return response()->json($task);
    }

    public function destroy(Request $request, Task $task): JsonResponse
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }

    public function toggleStatus(Request $request, Task $task): JsonResponse
    {
        $this->authorize('update', $task);
        $task->status = !$task->status;
        $task->save();
        return response()->json($task);
    }
}
