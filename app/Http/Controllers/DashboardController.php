<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Section 6: Calculating stats for the dashboard cards
        $stats = [
            'totalProjects' => Project::where('user_id', $user->id)->count(),
            'totalTasks' => Task::whereHas('project', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->count(),
            'pendingTasks' => Task::whereHas('project', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->where('status', 'pending')->count(),
            'completedTasks' => Task::whereHas('project', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->where('status', 'completed')->count(),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}