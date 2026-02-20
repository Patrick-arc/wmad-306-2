<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Auth::user()->tasks;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
            'due_time' => 'nullable',
            'emoji' => 'nullable|string',
            'type' => 'required|in:task,project',
        ]);

        $due_date = null;
        if ($validated['due_date']) {
            $due_date = $validated['due_date'];
            if (isset($validated['due_time']) && $validated['due_time']) {
                $due_date .= ' ' . $validated['due_time'];
            }
        }

        Task::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'due_date' => $due_date,
            'emoji' => $validated['emoji'] ?: '📝',
            'is_completed' => false,
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
            'due_time' => 'nullable',
            'emoji' => 'nullable|string',
        ]);

        $due_date = null;
        if ($validated['due_date']) {
            $due_date = $validated['due_date'];
            if (isset($validated['due_time']) && $validated['due_time']) {
                $due_date .= ' ' . $validated['due_time'];
            }
        }

        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'due_date' => $due_date,
            'emoji' => $validated['emoji'] ?: '📝',
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $this->authorize('delete', $task);

        $task->delete();

        return redirect()->route('dashboard');
    }

    public function toggleComplete(Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $task->update(['is_completed' => !$task->is_completed]);

        return redirect()->route('dashboard');
    }
}
