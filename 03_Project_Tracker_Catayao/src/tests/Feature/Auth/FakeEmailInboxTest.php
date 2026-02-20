<?php

namespace Tests\Feature\Auth;

use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class FakeEmailInboxTest extends TestCase
{
    public function test_fake_email_inbox_screen_can_be_rendered(): void
    {
        $response = $this->get('/fake-email');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/FakeEmailInbox')
            ->has('emails')
        );
    }

    public function test_fake_email_inbox_extracts_password_reset_links_from_logs(): void
    {
        $logPath = storage_path('logs/laravel.log');

        File::ensureDirectoryExists(dirname($logPath));
        File::put(
            $logPath,
            "[2026-02-16 10:00:00] local.DEBUG: To: test@example.com\r\n".
            "Click here: http://localhost/reset-password/abc123?email=test%40example.com\r\n"
        );

        $response = $this->get('/fake-email');

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/FakeEmailInbox')
            ->where('emails.0.to', 'test@example.com')
            ->where('emails.0.reset_url', 'http://localhost/reset-password/abc123?email=test%40example.com')
        );

        File::delete($logPath);
    }
}
