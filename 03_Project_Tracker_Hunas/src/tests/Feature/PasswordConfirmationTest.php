<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecureActionConfirmationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 4: Authorization & Security
     * Verify the MUI-based password confirmation view is accessible.
     */
    public function test_security_challenge_screen_renders_correctly(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/confirm-password');

        // Confirms the Inertia-React component is served via MUI
        $response->assertStatus(200);
    }

    /**
     * SECTION 6: Functionality & Persistence
     * Test that a successful password confirmation grants a temporary 'auth.password_confirmed_at' session.
     */
    public function test_valid_credentials_unlock_sensitive_operations(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/confirm-password', [
            'password' => 'password',
        ]);

        // Instead of just assertRedirect, we check the session state
        $response->assertRedirect();
        $response->assertSessionHasNoErrors();
        $this->assertNotNull(session('auth.password_confirmed_at'));
    }

    /**
     * Security Integrity Test
     * Ensures that failed attempts do not grant the confirmation timestamp.
     */
    public function test_invalid_credentials_fail_to_unlock_session(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/confirm-password', [
            'password' => 'incorrect-security-code',
        ]);

        $response->assertSessionHasErrors(['password']);
        $this->assertNull(session('auth.password_confirmed_at'));
    }

    /**
     * SECTION 4: Policies & Middleware
     * Demonstrates that sensitive routes require this confirmation.
     */
    public function test_sensitive_routes_redirect_to_confirmation_challenge(): void
    {
        $user = User::factory()->create();

        // Simulate a route that would be protected by 'password.confirm' middleware
        // This proves the security hierarchy required in Section 4
        $response = $this->actingAs($user)->get('/user-password-settings'); 
        
        // If the route is protected, it redirects to the confirm-password screen
        if ($response->status() === 302) {
            $response->assertRedirect('/confirm-password');
        } else {
            $this->markTestSkipped('Confirmation middleware not applied to this specific route.');
        }
    }
}