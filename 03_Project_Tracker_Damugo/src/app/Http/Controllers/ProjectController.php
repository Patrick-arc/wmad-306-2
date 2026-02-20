<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        // Eager-load tasks for each project so the index can display them on flip
        $projects = Auth::user()->projects()->with('tasks')->withCount('tasks')->get();
        return Inertia::render('Projects/Index', ['projects' => $projects]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project = Auth::user()->projects()->create($data);

        return Redirect::route('projects.index');
    }

    public function show(Project $project)
    {
        $this->authorize('view', $project);
        $project->load('tasks');
        return Inertia::render('Projects/Show', ['project' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project->update($data);

        return Redirect::route('projects.show', $project);
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();
        return Redirect::route('projects.index');
    }
}
