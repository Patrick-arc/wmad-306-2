<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserCredentialIntegrityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 6: Functionality & Persistence
     * Confirm that users can successfully rotate their workspace credentials.
     */
    public function test_workspace_credentials_can_be_rotated(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('Old-Project-Password-123')
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'Old-Project-Password-123',
                'password' => 'New-Secure-Vault-456',
                'password_confirmation' => 'New-Secure-Vault-456',
            ]);

        // Verify state change persistence
        $response->assertSessionHasNoErrors()->assertRedirect('/profile');
        
        $this->assertTrue(
            Hash::check('New-Secure-Vault-456', $user->refresh()->password),
            'The database failed to persist the updated credential hash.'
        );
    }

    /**
     * SECTION 4: Authorization & Security
     * Ensure the system blocks credential changes without the original password "key".
     */
    public function test_credential_rotation_requires_valid_current_password(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'totally-wrong-password',
                'password' => 'new-password-123',
                'password_confirmation' => 'new-password-123',
            ]);

        $response->assertSessionHasErrors('current_password');
        
        $this->assertFalse(
            Hash::check('new-password-123', $user->refresh()->password),
            'Security Breach: Password was updated despite incorrect current password.'
        );
    }

    /**
     * SECTION 5: Frontend & Validation
     * Test the validation logic that would be triggered by MUI form errors.
     */
    public function test_new_password_must_be_confirmed_to_prevent_lockout(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'password',
                'password' => 'new-password-123',
                'password_confirmation' => 'mismatched-password',
            ]);

        $response->assertSessionHasErrors('password');
    }
}