<?php

namespace App\Notifications;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentPostedNotification extends Notification
{
    use Queueable;

    public function __construct(public Article $article, public Comment $comment)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Comment on Your Article')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Someone commented on your article.')
            ->line('Article: ' . $this->article->title)
            ->line('Comment: ' . $this->comment->content)
            ->action('View Article', url('/student/articles/' . $this->article->id))
            ->line('Keep writing great content!');
    }
}
