<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('user_id', Auth::id())
            ->withCount('tasks')
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects ?? [] // Ensure it's never null
        ]);
    }

    public function create()
    {
        // Fix: Pass an empty projects array so the frontend map() doesn't crash
        return Inertia::render('Projects/Create', [
            'projects' => [] 
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Project::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('projects.index');
    }
}