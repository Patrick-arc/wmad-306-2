<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Schema;

class Task extends Model
{
    use HasFactory;

    protected static ?string $projectForeignKey = null;

    public const PRIORITY_LOW = 'low';
    public const PRIORITY_MEDIUM = 'medium';
    public const PRIORITY_HIGH = 'high';
    public const PRIORITY_OPTIONS = [
        self::PRIORITY_LOW,
        self::PRIORITY_MEDIUM,
        self::PRIORITY_HIGH,
    ];

    public const STATUS_PENDING = 'pending';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_OPTIONS = [
        self::STATUS_PENDING,
        self::STATUS_COMPLETED,
    ];

    protected $fillable = [
        'project_id',
        'projectId',
        'title',
        'description',
        'priority',
        'status',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, self::projectForeignKey());
    }

    public static function projectForeignKey(): string
    {
        if (self::$projectForeignKey !== null) {
            return self::$projectForeignKey;
        }

        if (!Schema::hasTable('tasks')) {
            self::$projectForeignKey = 'project_id';

            return self::$projectForeignKey;
        }

        if (Schema::hasColumn('tasks', 'project_id')) {
            self::$projectForeignKey = 'project_id';

            return self::$projectForeignKey;
        }

        self::$projectForeignKey = Schema::hasColumn('tasks', 'projectId')
            ? 'projectId'
            : 'project_id';

        return self::$projectForeignKey;
    }

    public function setProjectIdAttribute($value): void
    {
        $this->attributes[self::projectForeignKey()] = $value;
    }

    public function getProjectIdAttribute($value)
    {
        if ($value !== null) {
            return $value;
        }

        return $this->attributes['projectId'] ?? null;
    }
}
