<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        // Ensure policy methods are used for resource authorization
        $this->authorizeResource(\App\Models\Project::class, 'project');
    }

    public function index(): Response
    {
        $projects = Project::where('user_id', auth()->id())
            ->with('tasks')
            ->get()
            ->map(function ($p) {
                $tasks = $p->tasks ?? collect([]);
                $todo = (int) $tasks->where('status', 'todo')->count();
                $inprog = (int) $tasks->where('status', 'in_progress')->count();
                $total = (int) $tasks->count();
                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'description' => $p->description,
                    'tasks_count' => $total,
                    'todo_count' => $todo,
                    'in_progress_count' => $inprog,
                    'completed' => ($todo + $inprog) === 0 && $total > 0,
                ];
            })->toArray();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', \App\Models\Project::class);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $data['user_id'] = $request->user()->id;

        $project = Project::create($data);

        return Redirect::route('projects.show', $project->id);
    }

    public function show(Project $project): Response
    {
        $this->authorize('view', $project);

        $project->load('tasks');

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }

    /**
     * Return JSON data for a single project (for modal usage)
     */
    public function data(Project $project)
    {
        $this->authorize('view', $project);

        $project->load('tasks');

        return response()->json($project);
    }

    public function edit(Project $project): Response
    {
        $this->authorize('view', $project);

        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project->update($data);

        // If this is an Inertia request, return a proper redirect (Inertia expects an Inertia response)
        if ($request->header('X-Inertia')) {
            return Redirect::route('projects.show', $project->id);
        }

        // For plain AJAX/API callers, return JSON
        if ($request->wantsJson() || $request->ajax()) {
            $project->load('tasks');
            return response()->json(['project' => $project]);
        }

        return Redirect::route('projects.show', $project->id);
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return Redirect::route('projects.index');
    }
}
