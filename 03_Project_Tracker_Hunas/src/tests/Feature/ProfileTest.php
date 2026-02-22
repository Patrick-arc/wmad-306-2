<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileIntegrityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 5: Frontend Rendering
     * Verify the MUI Profile management interface is active.
     */
    public function test_workspace_profile_is_accessible(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/profile');

        $response->assertOk();
    }

    /**
     * SECTION 6: Functionality & Persistence
     * Test that updating the email address correctly triggers a re-verification state.
     */
    public function test_profile_metadata_updates_successfully(): void
    {
        $user = User::factory()->create(['name' => 'Original Name']);

        $response = $this->actingAs($user)->patch('/profile', [
            'name' => 'Lead Developer',
            'email' => 'new-lead@tracker.com',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/profile');

        $user->refresh();
        $this->assertSame('Lead Developer', $user->name);
        $this->assertSame('new-lead@tracker.com', $user->email);
        $this->assertNull($user->email_verified_at); // Verification should reset
    }

    /**
     * SECTION 1 & 6: Data Integrity & Hierarchy
     * CRITICAL: Test that deleting a user purges their entire Project -> Task hierarchy.
     */
    public function test_account_deletion_purges_entire_workspace_hierarchy(): void
    {
        $user = User::factory()->create();
        
        // Seed a project and task for this user (Section 2)
        $project = Project::factory()->create(['user_id' => $user->id]);
        $task = Task::factory()->create(['project_id' => $project->id]);

        $response = $this->actingAs($user)->delete('/profile', [
            'password' => 'password',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/');

        $this->assertGuest();
        
        // Assertions for Section 1 (Migrations/Cascading)
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /**
     * SECTION 4: Authorization
     * Ensure destructive actions are blocked without valid session confirmation.
     */
    public function test_unauthorized_deletion_attempt_is_blocked(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'incorrect-auth-challenge',
            ]);

        $response->assertSessionHasErrors('password');
        $this->assertNotNull($user->fresh());
    }
}