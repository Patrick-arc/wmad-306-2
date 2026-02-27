<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTaskAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a user can only view their own projects.
     */
    public function test_user_cannot_view_other_users_projects(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user1->id]);

        $this->actingAs($user2);

        $this->assertTrue(
            $user2->cannot('view', $project),
            'User 2 should not be able to view User 1 project'
        );
    }

    /**
     * Test that a user can update their own projects.
     */
    public function test_user_can_update_own_project(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $this->assertTrue(
            $user->can('update', $project),
            'User should be able to update their own project'
        );
    }

    /**
     * Test that a user cannot create tasks in other users projects.
     */
    public function test_user_cannot_modify_tasks_in_others_projects(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user1->id]);
        $task = Task::factory()->create(['project_id' => $project->id]);

        $this->actingAs($user2);

        $this->assertTrue(
            $user2->cannot('update', $task),
            'User 2 should not be able to update task in User 1 project'
        );

        $this->assertTrue(
            $user2->cannot('delete', $task),
            'User 2 should not be able to delete task in User 1 project'
        );
    }

    /**
     * Test that a user can manage tasks in their own projects.
     */
    public function test_user_can_manage_own_project_tasks(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $task = Task::factory()->create(['project_id' => $project->id]);

        $this->actingAs($user);

        $this->assertTrue(
            $user->can('view', $task),
            'User should be able to view task in their project'
        );

        $this->assertTrue(
            $user->can('update', $task),
            'User should be able to update task in their project'
        );

        $this->assertTrue(
            $user->can('delete', $task),
            'User should be able to delete task in their project'
        );
    }

    /**
     * Test task status update through controller.
     */
    public function test_task_status_update_through_controller(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $task = Task::factory()->create([
            'project_id' => $project->id,
            'status' => 'pending',
        ]);

        $this->actingAs($user);

        $response = $this->patch(route('tasks.update', $task), [
            'project_id' => $project->id,
            'title' => $task->title,
            'description' => $task->description,
            'priority' => $task->priority,
            'status' => 'in_progress',
        ]);

        $response->assertRedirect(route('tasks.show', $task));
        $this->assertEquals('in_progress', $task->fresh()->status);
    }

    /**
     * Test task priority persists through update.
     */
    public function test_task_priority_persists_through_update(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $task = Task::factory()->create([
            'project_id' => $project->id,
            'priority' => 'low',
        ]);

        $this->actingAs($user);

        $this->patch(route('tasks.update', $task), [
            'project_id' => $project->id,
            'title' => $task->title,
            'description' => $task->description,
            'priority' => 'high',
            'status' => $task->status,
        ]);

        $this->assertEquals('high', $task->fresh()->priority);
    }
}
