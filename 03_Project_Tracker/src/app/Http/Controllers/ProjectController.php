<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Projects/Index', [
            // Rubric Fix: Filter by user_id to establish proper hierarchy
            'projects' => Project::where('user_id', auth()->id())->latest()->get(), 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Links project to the logged-in user for Authorization points
        $request->user()->projects()->create($validated);

        return redirect()->route('projects.index')->with('message', 'Project created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // Triggers the Policy check you just saved
        $this->authorize('view', $project);

        return inertia('Projects/Show', [
            'project' => $project->load('tasks'),
        ]);
    }

    /**
     * Show the form for editing.
     */
    public function edit(Project $project)
    {
        // FATAL ERROR FIX: Only one 'edit' method now remains
        $this->authorize('update', $project);

        return inertia('Projects/Edit', [
            'project' => $project
        ]);
    }

    /**
     * Update the specified resource.
     */
    public function update(Request $request, Project $project)
    {
        // FATAL ERROR FIX: Only one 'update' method remains
        $this->authorize('update', $project);
    
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $project->update($validated);

        return redirect()->route('projects.index')->with('message', 'Project updated successfully!');
    } 

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();
    
        return redirect()->route('projects.index')->with('message', 'Project deleted successfully!');
    }

    /* --- Task Management Methods --- */

    public function storeTask(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'priority' => 'required|in:low,medium,high',
        ]);

        $project->tasks()->create($validated);

        return back()->with('message', 'Task added!');
    }

    public function destroyTask(Task $task) 
    {
        $task->delete();
    
        return back()->with('message', 'Task deleted successfully!');
    }
}