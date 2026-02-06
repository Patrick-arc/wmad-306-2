<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserMail extends Mailable
{
    use SerializesModels;

    public string $body;

    public function __construct(string $body)
    {
        $this->body = $body;
    }

    public function build()
    {
        return $this->subject('User Notification')
            ->view('emails.user')
            ->with(['body' => $this->body]);
    }
}
