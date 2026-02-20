<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'priority', 'status', 'project_id'];

    // Relationship: Task belongs to Project
    public function project() {
        return $this->belongsTo(Project::class); // [cite: 18, 19]
    }
}