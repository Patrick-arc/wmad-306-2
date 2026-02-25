<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::whereHas('project', function($query) {
            $query->where('user_id', Auth::id());
        })->with('project')->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks ?? [] // Fallback to empty array
        ]);
    }

    public function create()
    {
        // Fetches projects for the dropdown so you can link the task
        $projects = Project::where('user_id', Auth::id())->get();

        return Inertia::render('Tasks/Create', [
            'projects' => $projects ?? [] // Prevent undefined map error
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'status' => 'required|in:pending,completed',
        ]);

        Task::create($validated);

        return redirect()->route('tasks.index');
    }
}