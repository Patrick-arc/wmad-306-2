<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    // Show all projects for the logged-in user
    public function index()
    {
        $projects = Auth::user()->projects()->with('tasks')->get();

        return Inertia::render('ProjectsPage', [
            'projects' => $projects,
        ]);
    }

    // Dashboard (optional)
    public function dashboard()
    {
        $user = Auth::user();
        $projects = $user->projects()->with('tasks')->get();

        return Inertia::render('Dashboard', [
            'projects' => $projects,
        ]);
    }

    // Create a new project
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,completed',
        ]);

        $project = Auth::user()->projects()->create($request->only('title','description','status'));

        return redirect()->back();
    }

    // Update a project
    public function update(Request $request, Project $project)
    {
        if ($project->user_id !== Auth::id()) abort(403);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,completed',
        ]);

        $project->update($request->only('title','description','status'));

        return redirect()->back();
    }

    // Delete a project
    public function destroy(Project $project)
    {
        if ($project->user_id !== Auth::id()) abort(403);

        $project->delete();

        return redirect()->back();
    }
}
