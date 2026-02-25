<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get user's projects
        $projects = Project::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get();

        // Calculate statistics
        $totalProjects = Project::where('user_id', $user->id)->count();
        $inProgressProjects = Project::where('user_id', $user->id)->count(); // You can add a status column
        $completedProjects = 0; // You can add a status column
        $teamMembers = 1; // You can add team functionality

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'stats' => [
                [
                    'label' => 'Total Projects',
                    'value' => (string)$totalProjects,
                    'icon' => '📊',
                    'color' => 'from-blue-500 to-blue-600'
                ],
                [
                    'label' => 'In Progress',
                    'value' => (string)$inProgressProjects,
                    'icon' => '⚙️',
                    'color' => 'from-purple-500 to-purple-600'
                ],
                [
                    'label' => 'Completed',
                    'value' => (string)$completedProjects,
                    'icon' => '✅',
                    'color' => 'from-green-500 to-green-600'
                ],
                [
                    'label' => 'Team Members',
                    'value' => (string)$teamMembers,
                    'icon' => '👥',
                    'color' => 'from-orange-500 to-orange-600'
                ],
            ],
        ]);
    }
}
