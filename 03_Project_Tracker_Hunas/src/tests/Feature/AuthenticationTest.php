<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectSecurityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 4: Policies & Authorization
     * Verify that users are redirected to login when accessing tracker resources.
     */
    public function test_unauthenticated_users_cannot_access_tracker_data(): void
    {
        $this->get('/projects')->assertRedirect('/login');
        $this->get('/tasks')->assertRedirect('/login');
        $this->get('/dashboard')->assertRedirect('/login');
    }

    /**
     * SECTION 4 & 6: Relationships & Authorization
     * Ensure a user can only see their own projects.
     */
    public function test_users_can_only_access_their_own_projects(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();
        
        // Project belonging to User B
        $projectB = Project::factory()->create(['user_id' => $userB->id]);

        // User A tries to view User B's project data via the Controller
        $response = $this->actingAs($userA)->get(route('projects.index'));
        
        $response->assertStatus(200);
        // Ensure User B's project title is NOT visible to User A
        $response->assertDontSee($projectB->title);
    }

    /**
     * SECTION 3 & 4: CRUD + Policies
     * Test that route model binding and policies prevent unauthorized deletion.
     */
    public function test_user_cannot_delete_someone_elses_project(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $owner->id]);

        $response = $this->actingAs($intruder)->delete("/projects/{$project->id}");

        // Should return 403 Forbidden because of ProjectPolicy
        $response->assertStatus(403);
        $this->assertDatabaseHas('projects', ['id' => $project->id]);
    }

    /**
     * SECTION 6: Relationships & Functionality
     * Verify the User -> Project -> Task hierarchy works.
     */
    public function test_tasks_are_correctly_associated_with_projects(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $task = Task::factory()->create([
            'project_id' => $project->id,
            'status' => 'todo',
            'priority' => 'high'
        ]);

        $this->actingAs($user);

        // Check Relationship (Manual Section 6)
        $this->assertEquals($project->id, $task->project->id);
        $this->assertTrue($project->tasks->contains($task));
    }

    /**
     * Basic Auth Test: User Session Destruction
     */
    public function test_active_session_can_be_terminated(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}