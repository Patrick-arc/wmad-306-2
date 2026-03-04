<?php

namespace App\Notifications;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ArticleSubmittedNotification extends Notification
{
    use Queueable;

    public function __construct(public Article $article)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Article Submitted for Review')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('A new article has been submitted for your review.')
            ->line('Title: ' . $this->article->title)
            ->line('Writer: ' . $this->article->writer->name)
            ->action('Review Article', url('/editor/articles/' . $this->article->id . '/review'))
            ->line('Please review and take action on this submission.');
    }
}
