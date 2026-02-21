<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{

    public function index(Request $request)
    {
        $projects = $request->user()->projects()->withCount('tasks')->get();
        return inertia('Projects/Index', compact('projects'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project = $request->user()->projects()->create($data);
        return redirect()->back();
    }

    public function show(Project $project)
    {
        Gate::authorize('view', $project);
        $project->load('tasks');
        return inertia('Projects/Show', compact('project'));
    }

    public function update(Request $request, Project $project)
    {
        Gate::authorize('update', $project);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $project->update($data);
        return redirect()->back();
    }

    public function destroy(Project $project)
    {
        Gate::authorize('delete', $project);
        $project->delete();
        return redirect()->back();
    }
}
