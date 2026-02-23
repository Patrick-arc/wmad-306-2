<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // These are the ONLY fields Laravel allows to be saved via create()
    protected $fillable = ['title', 'description', 'project_id', 'status']; 

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}