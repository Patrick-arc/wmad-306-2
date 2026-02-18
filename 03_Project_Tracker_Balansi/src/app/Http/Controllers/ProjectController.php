<?php
namespace App\Http\Controllers;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;
    
    public function index(Request $request) {
        return Inertia::render('Projects/Index', [
            'projects' => Project::where('user_id', $request->user()->id)->get()
        ]);
    }
    public function create() { return Inertia::render('Projects/Create'); }
    
    public function store(Request $request) {
        $validated = $request->validate(['title'=>'required|string','description'=>'required']);
        $request->user()->projects()->create($validated);
        return redirect()->route('projects.index');
    }
    
    public function edit(Project $project) {
        $this->authorize('update', $project);
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }
    
    public function update(Request $request, Project $project) {
        $this->authorize('update', $project);
        $project->update($request->validate(['title'=>'required','description'=>'required']));
        return redirect()->route('projects.index');
    }
    
    public function destroy(Project $project) {
        $this->authorize('delete', $project);
        $project->delete();
        return redirect()->route('projects.index');
    }
}