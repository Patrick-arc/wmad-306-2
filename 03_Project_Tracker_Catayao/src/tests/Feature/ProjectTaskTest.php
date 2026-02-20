<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_project_or_task_endpoints(): void
    {
        $owner = User::factory()->create();
        $project = Project::create([
            'user_id' => $owner->id,
            'title' => 'Secret',
            'description' => 'Private',
        ]);
        $task = Task::create([
            'project_id' => $project->id,
            'title' => 'Private task',
            'description' => null,
            'priority' => Task::PRIORITY_MEDIUM,
            'status' => Task::STATUS_PENDING,
        ]);

        $this->get(route('projects.index'))->assertRedirect('/login');
        $this->post(route('projects.store'), [
            'title' => 'New project',
            'description' => 'Desc',
        ])->assertRedirect('/login');
        $this->post(route('tasks.store'), [
            'project_id' => $project->id,
            'title' => 'Task',
            'priority' => Task::PRIORITY_MEDIUM,
        ])->assertRedirect('/login');
        $this->put(route('tasks.update', $task), [
            'title' => 'Updated',
            'priority' => Task::PRIORITY_HIGH,
            'status' => Task::STATUS_PENDING,
        ])->assertRedirect('/login');
    }

    public function test_user_can_create_update_and_delete_their_project(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('projects.store'), [
                'title' => 'Website Launch',
                'description' => 'Rollout project',
            ])
            ->assertRedirect();

        $project = Project::where('user_id', $user->id)->first();
        $this->assertNotNull($project);

        $this->actingAs($user)
            ->put(route('projects.update', $project), [
                'title' => 'Website Launch v2',
                'description' => 'Updated plan',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'title' => 'Website Launch v2',
        ]);

        $this->actingAs($user)
            ->delete(route('projects.destroy', $project))
            ->assertRedirect();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_user_cannot_manage_other_users_project(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $project = Project::create([
            'user_id' => $owner->id,
            'title' => 'Owner project',
            'description' => 'Private',
        ]);

        $this->actingAs($intruder)
            ->get(route('projects.show', $project))
            ->assertForbidden();

        $this->actingAs($intruder)
            ->put(route('projects.update', $project), [
                'title' => 'Hacked',
                'description' => 'Nope',
            ])
            ->assertForbidden();

        $this->actingAs($intruder)
            ->delete(route('projects.destroy', $project))
            ->assertForbidden();
    }

    public function test_user_can_create_update_toggle_and_delete_their_task(): void
    {
        $user = User::factory()->create();
        $project = Project::create([
            'user_id' => $user->id,
            'title' => 'Task board',
            'description' => null,
        ]);

        $this->actingAs($user)
            ->post(route('tasks.store'), [
                'project_id' => $project->id,
                'title' => 'Initial task',
                'priority' => Task::PRIORITY_MEDIUM,
            ])
            ->assertRedirect();

        $task = Task::where('project_id', $project->id)->first();
        $this->assertNotNull($task);

        $this->actingAs($user)
            ->put(route('tasks.update', $task), [
                'title' => 'Edited task',
                'description' => 'Edited description',
                'priority' => Task::PRIORITY_HIGH,
                'status' => Task::STATUS_PENDING,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Edited task',
            'priority' => Task::PRIORITY_HIGH,
            'status' => Task::STATUS_PENDING,
        ]);

        $this->actingAs($user)
            ->patch(route('tasks.toggle', $task))
            ->assertRedirect();

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'status' => Task::STATUS_COMPLETED,
        ]);

        $this->actingAs($user)
            ->delete(route('tasks.destroy', $task))
            ->assertRedirect();

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_user_cannot_create_task_inside_other_users_project(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $project = Project::create([
            'user_id' => $owner->id,
            'title' => 'Owner project',
            'description' => null,
        ]);

        $this->actingAs($intruder)
            ->from(route('dashboard'))
            ->post(route('tasks.store'), [
                'project_id' => $project->id,
                'title' => 'Intruder task',
                'priority' => Task::PRIORITY_MEDIUM,
            ])
            ->assertSessionHasErrors('project_id');
    }

    public function test_user_cannot_manage_other_users_task(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $project = Project::create([
            'user_id' => $owner->id,
            'title' => 'Owner project',
            'description' => null,
        ]);

        $task = Task::create([
            'project_id' => $project->id,
            'title' => 'Owner task',
            'description' => null,
            'priority' => Task::PRIORITY_MEDIUM,
            'status' => Task::STATUS_PENDING,
        ]);

        $this->actingAs($intruder)
            ->put(route('tasks.update', $task), [
                'title' => 'Hacked task',
                'priority' => Task::PRIORITY_LOW,
                'status' => Task::STATUS_PENDING,
            ])
            ->assertForbidden();

        $this->actingAs($intruder)
            ->patch(route('tasks.toggle', $task))
            ->assertForbidden();

        $this->actingAs($intruder)
            ->delete(route('tasks.destroy', $task))
            ->assertForbidden();
    }
}
