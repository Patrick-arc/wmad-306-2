<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class FakeEmailController extends Controller
{
    public function index(): Response
    {
        $path = storage_path('logs/laravel.log');
        $emails = [];

        if (File::exists($path)) {
            $contents = File::get($path);
            $normalized = preg_replace("/=\r?\n/", '', $contents) ?? $contents;

            preg_match_all(
                '/https?:\/\/[^\s<>"\']*\/reset-password\/[^\s<>"\']+/i',
                $normalized,
                $urlMatches,
                PREG_OFFSET_CAPTURE
            );

            $seen = [];

            foreach (array_reverse($urlMatches[0]) as [$rawUrl, $offset]) {
                $url = rtrim(html_entity_decode($rawUrl), ".,'\" )]");

                if (isset($seen[$url])) {
                    continue;
                }

                $seen[$url] = true;
                $windowStart = max(0, $offset - 600);
                $window = substr($normalized, $windowStart, 1200);

                preg_match('/To:\s*([^\r\n]+)/i', $window, $toMatch);
                preg_match('/\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]/', $window, $timestampMatch);

                $emails[] = [
                    'to' => isset($toMatch[1]) ? trim($toMatch[1]) : 'Unknown recipient',
                    'reset_url' => $url,
                    'logged_at' => $timestampMatch[1] ?? null,
                ];

                if (count($emails) >= 20) {
                    break;
                }
            }
        }

        return Inertia::render('Auth/FakeEmailInbox', [
            'emails' => $emails,
            'logFileExists' => File::exists($path),
        ]);
    }
}
