<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    // List all projects
    public function index()
    {
        $projects = Auth::user()->projects()->with('tasks')->get();
        return Inertia::render('ProjectsPage', ['projects' => $projects]);
    }

    // Dashboard (optional)
    public function dashboard()
    {
        $projects = Auth::user()->projects()->with('tasks')->get();
        return Inertia::render('Dashboard', ['projects' => $projects]);
    }

    // Create project
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,completed',
        ]);

        $project = Auth::user()->projects()->create($validated);

        return response()->json($project, 201);
    }

    // Update project
    public function update(Request $request, Project $project)
    {
        if ($project->user_id !== Auth::id()) return response()->json(['message' => 'Unauthorized'], 403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,completed',
        ]);

        $project->update($validated);

        return response()->json($project, 200);
    }

    // Delete project
    public function destroy(Project $project)
    {
        if ($project->user_id !== Auth::id()) return response()->json(['message' => 'Unauthorized'], 403);

        $project->delete();
        return response()->json(['message' => 'Project deleted'], 200);
    }
}