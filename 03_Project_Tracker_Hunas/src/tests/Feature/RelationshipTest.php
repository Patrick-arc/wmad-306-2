<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RelationshipIntegrityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 6: User -> Project -> Task Hierarchy
     * This test validates the full relational chain and data persistence.
     */
    public function test_workspace_hierarchy_and_task_state_persistence(): void
    {
        // 1. Setup via Factories (Aligns with Section 2 & 6)
        $user = User::factory()->create(['name' => 'System Architect']);
        
        $project = Project::factory()->create([
            'user_id' => $user->id,
            'title' => 'Core Infrastructure'
        ]);

        $task = Task::factory()->create([
            'project_id' => $project->id,
            'priority' => 'high', // Using string labels as per typical MUI Selects
            'status' => 'todo'
        ]);

        // 2. Verify Forward Hierarchy: User can reach Task
        // Proof of Section 1: User -> Projects -> Tasks
        $this->assertTrue($user->projects->contains($project));
        $this->assertTrue($user->projects->first()->tasks->contains($task));
        
        // 3. Verify Inverse Hierarchy: Task can reach User
        // Proof of Section 1: Task -> Project -> User
        $this->assertEquals('Core Infrastructure', $task->project->title);
        $this->assertEquals($user->id, $task->project->user->id);

        // 4. Persistence & State Transition (Section 6: Status/Priority Persist)
        // We simulate a status toggle and priority shift
        $task->update([
            'priority' => 'low',
            'status' => 'done'
        ]);

        // Fresh database fetch to ensure it didn't just stay in memory
        $reloadedTask = $task->fresh();
        
        $this->assertEquals('low', $reloadedTask->priority, 'Priority state failed to persist in DB.');
        $this->assertEquals('done', $reloadedTask->status, 'Status toggle failed to persist in DB.');

        // 5. Section 1 Verification: Instance Types
        $this->assertInstanceOf(Project::class, $task->project);
        $this->assertInstanceOf(User::class, $project->user);
    }

    /**
     * Integrity Check: Orphan Prevention
     * Ensures that deleting a project cleans up associated tasks.
     */
    public function test_cascading_integrity_between_projects_and_tasks(): void
    {
        $project = Project::factory()->has(Task::factory()->count(3))->create();
        
        $this->assertCount(3, Task::where('project_id', $project->id)->get());

        // Delete project and check if tasks vanished
        $project->delete();

        $this->assertEquals(0, Task::where('project_id', $project->id)->count(), 'Tasks survived project deletion (Orphan detected).');
    }
}