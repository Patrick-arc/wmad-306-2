<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserOnboardingTest extends TestCase
{
    use RefreshDatabase;

    /**
     * SECTION 5: Frontend (MUI + React)
     * Verify that the registration portal is accessible.
     */
    public function test_onboarding_interface_is_ready(): void
    {
        $response = $this->get('/register');

        // Confirms the Inertia response is successful
        $response->assertStatus(200);
    }

    /**
     * SECTION 1 & 6: Models and Relationships
     * Verify a new user is created and their project workspace is initialized.
     */
    public function test_new_entity_can_establish_account(): void
    {
        $userData = [
            'name' => 'Project Lead',
            'email' => 'lead@tracker.com',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
        ];

        $response = $this->post('/register', $userData);

        // Verify Authentication
        $this->assertAuthenticated();
        
        // Verify Database Persistence (Section 1)
        $this->assertDatabaseHas('users', [
            'email' => 'lead@tracker.com',
        ]);

        // Verify Relationship State (Section 6)
        $user = User::where('email', 'lead@tracker.com')->first();
        $this->assertEquals(0, $user->projects()->count(), 'New users should start with an empty project list.');

        $response->assertRedirect(route('dashboard', false));
    }

    /**
     * SECTION 4: Validation & Security
     * Ensure registration fails if password standards are not met.
     */
    public function test_onboarding_fails_with_mismatched_credentials(): void
    {
        $response = $this->post('/register', [
            'name' => 'Insecure User',
            'email' => 'bad@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different-password',
        ]);

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
    }
}