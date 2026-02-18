<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'user_id'];

    // Relationship: Project has many Tasks
    public function tasks() {
        return $this->hasMany(Task::class); // [cite: 14, 15]
    }

    // Inverse Relationship: Project belongs to User
    public function user() {
        return $this->belongsTo(User::class); // 
    }
}