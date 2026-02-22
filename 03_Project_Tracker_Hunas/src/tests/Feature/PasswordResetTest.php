<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CredentialRecoveryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 5: Frontend Rendering
     * Verify the MUI recovery request view is accessible.
     */
    public function test_recovery_request_interface_renders(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
    }

    /**
     * SECTION 4: Authorization Logic
     * Ensure the system dispatches a secure reset token to the correct user.
     */
    public function test_recovery_token_is_dispatched_on_request(): void
    {
        Notification::fake();
        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    /**
     * SECTION 6: Functional Integrity
     * Comprehensive test to verify the reset flow and subsequent workspace access.
     */
    public function test_account_access_is_restored_with_new_credentials(): void
    {
        Notification::fake();
        $user = User::factory()->create();
        $newPassword = 'NewSecurePassword123!';

        // 1. Request the reset
        $this->post('/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user, $newPassword) {
            // 2. Perform the reset using the intercepted token
            $response = $this->post('/reset-password', [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => $newPassword,
                'password_confirmation' => $newPassword,
            ]);

            $response->assertSessionHasNoErrors();
            $response->assertRedirect(route('login'));

            // 3. CRITICAL Logic: Verify the hash in DB actually changed (Manual Section 6)
            $this->assertTrue(Hash::check($newPassword, $user->fresh()->password));

            // 4. Verify the user can now authenticate and reach the tracker
            $loginResponse = $this->post('/login', [
                'email' => $user->email,
                'password' => $newPassword,
            ]);

            $this->assertAuthenticatedAs($user);
            $loginResponse->assertRedirect(route('dashboard'));

            return true;
        });
    }

    /**
     * Security Integrity Test
     * Ensures malicious password updates are blocked without a valid token.
     */
    public function test_recovery_fails_with_invalid_token(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/reset-password', [
            'token' => 'invalid-token-string',
            'email' => $user->email,
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertFalse(Hash::check('new-password', $user->fresh()->password));
    }
}