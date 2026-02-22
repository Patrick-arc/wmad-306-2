<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Models\Project;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class WorkspaceAccessTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 4: Authorization
     * Verify the 'verified' middleware protects the Project Tracker.
     * Unverified users should be bounced to the notice page.
     */
    public function test_unverified_users_cannot_access_project_workspace(): void
    {
        $user = User::factory()->unverified()->create();

        // Attempting to hit the main project list
        $response = $this->actingAs($user)->get(route('projects.index'));

        $response->assertRedirect(route('verification.notice'));
    }

    /**
     * SECTION 6: Functionality
     * Test the full transition from Restricted to Verified.
     */
    public function test_user_unlocks_workspace_upon_email_confirmation(): void
    {
        $user = User::factory()->unverified()->create();
        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(30),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->actingAs($user)->get($verificationUrl);

        // Core Assertions
        Event::assertDispatched(Verified::class);
        $this->assertTrue($user->fresh()->hasVerifiedEmail(), 'The user email was not marked as verified in the DB.');
        
        // Ensure successful redirect to the dashboard (Section 5)
        $response->assertRedirect(route('dashboard', false).'?verified=1');
    }

    /**
     * Security Integrity Test
     * Prevents access using tampered or malicious verification hashes.
     */
    public function test_verification_fails_with_malformed_token(): void
    {
        $user = User::factory()->unverified()->create();

        $invalidUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1('tampered-email-input')]
        );

        $this->actingAs($user)->get($invalidUrl);

        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    /**
     * UI Rendering
     * Confirms the MUI-based verification prompt displays correctly.
     */
    public function test_verification_notice_screen_renders(): void
    {
        $user = User::factory()->unverified()->create();

        $response = $this->actingAs($user)->get('/verify-email');

        $response->assertStatus(200);
    }
}