<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTaskHierarchyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a user can have multiple projects.
     */
    public function test_user_has_many_projects(): void
    {
        $user = User::factory()->create();
        $projects = Project::factory(3)->create(['user_id' => $user->id]);

        $this->assertCount(3, $user->projects);
        $this->assertTrue($user->projects->contains($projects[0]));
    }

    /**
     * Test that a project belongs to a user.
     */
    public function test_project_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $project->user);
        $this->assertEquals($user->id, $project->user->id);
    }

    /**
     * Test that a project has many tasks.
     */
    public function test_project_has_many_tasks(): void
    {
        $project = Project::factory()->create();
        $tasks = Task::factory(5)->create(['project_id' => $project->id]);

        $this->assertCount(5, $project->tasks);
        $this->assertTrue($project->tasks->contains($tasks[0]));
    }

    /**
     * Test that a task belongs to a project.
     */
    public function test_task_belongs_to_project(): void
    {
        $project = Project::factory()->create();
        $task = Task::factory()->create(['project_id' => $project->id]);

        $this->assertInstanceOf(Project::class, $task->project);
        $this->assertEquals($project->id, $task->project->id);
    }

    /**
     * Test that task status persists correctly.
     */
    public function test_task_status_persists(): void
    {
        $task = Task::factory()->create(['status' => 'pending']);
        $this->assertEquals('pending', $task->status);

        $task->update(['status' => 'in_progress']);
        $this->assertEquals('in_progress', $task->fresh()->status);

        $task->update(['status' => 'completed']);
        $this->assertEquals('completed', $task->fresh()->status);
    }

    /**
     * Test that task priority persists correctly.
     */
    public function test_task_priority_persists(): void
    {
        $task = Task::factory()->create(['priority' => 'low']);
        $this->assertEquals('low', $task->priority);

        $task->update(['priority' => 'medium']);
        $this->assertEquals('medium', $task->fresh()->priority);

        $task->update(['priority' => 'high']);
        $this->assertEquals('high', $task->fresh()->priority);
    }

    /**
     * Test the complete hierarchy: User → Project → Task.
     */
    public function test_complete_hierarchy(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $tasks = Task::factory(3)->create(['project_id' => $project->id]);

        // Navigate the hierarchy
        $projectFromUser = $user->projects()->first();
        $this->assertEquals($project->id, $projectFromUser->id);

        $tasksFromProject = $projectFromUser->tasks;
        $this->assertCount(3, $tasksFromProject);

        // Access task's project back
        $taskFromProject = $tasksFromProject->first();
        $this->assertEquals($project->id, $taskFromProject->project->id);
        $this->assertEquals($user->id, $taskFromProject->project->user->id);
    }

    /**
     * Test that deleting a project cascades to delete tasks.
     */
    public function test_cascading_delete_project_tasks(): void
    {
        $project = Project::factory()->create();
        $task = Task::factory()->create(['project_id' => $project->id]);

        $project->delete();

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /**
     * Test that deleting a user cascades to delete projects and tasks.
     */
    public function test_cascading_delete_user_projects_and_tasks(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $task = Task::factory()->create(['project_id' => $project->id]);

        $user->delete();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /**
     * Test task scopes.
     */
    public function test_task_scopes(): void
    {
        $project = Project::factory()->create();
        Task::factory(2)->create(['project_id' => $project->id, 'status' => 'pending']);
        Task::factory(3)->create(['project_id' => $project->id, 'status' => 'in_progress']);
        Task::factory(1)->create(['project_id' => $project->id, 'priority' => 'high']);

        $this->assertCount(2, Task::byStatus('pending')->get());
        $this->assertCount(3, Task::byStatus('in_progress')->get());
        $this->assertCount(6, Task::inProject($project->id)->get());
    }
}
