<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate; // 1. Added Gate import

class TaskController extends Controller
{
    // 2. REMOVED the __construct() method. 
    // Middleware is now handled in routes/web.php

    public function store(Request $request, Project $project)
    {
        // 3. Changed to Gate::authorize
        Gate::authorize('create', [Task::class, $project]);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|integer|min:1|max:5',
            'status' => 'nullable|string',
        ]);

        $project->tasks()->create($data);
        return redirect()->back();
    }

    public function update(Request $request, Task $task)
    {
        // 3. Changed to Gate::authorize
        Gate::authorize('update', $task);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'nullable|integer|min:1|max:5',
            'status' => 'nullable|string',
        ]);

        $task->update($data);
        return redirect()->back();
    }

    public function destroy(Task $task)
    {
        // 3. Changed to Gate::authorize
        Gate::authorize('delete', $task);
        
        $task->delete();
        return redirect()->back();
    }
}