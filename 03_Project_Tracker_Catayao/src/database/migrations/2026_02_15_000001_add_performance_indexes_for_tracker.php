<?php

use App\Models\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (
            Schema::hasColumn('projects', 'user_id')
            && Schema::hasColumn('projects', 'created_at')
            && !Schema::hasIndex('projects', 'projects_user_created_idx')
        ) {
            Schema::table('projects', function (Blueprint $table) {
                $table->index(['user_id', 'created_at'], 'projects_user_created_idx');
            });
        }

        if (!Schema::hasColumn('tasks', 'project_id')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->unsignedBigInteger('project_id')->nullable();
            });
        }

        if (!Schema::hasColumn('tasks', 'status')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->string('status')->default(Task::STATUS_PENDING);
            });
        }

        if (!Schema::hasIndex('tasks', 'tasks_project_created_idx')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->index(['project_id', 'created_at'], 'tasks_project_created_idx');
            });
        }

        if (!Schema::hasIndex('tasks', 'tasks_project_status_idx')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->index(['project_id', 'status'], 'tasks_project_status_idx');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasIndex('tasks', 'tasks_project_created_idx')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->dropIndex('tasks_project_created_idx');
            });
        }

        if (Schema::hasIndex('tasks', 'tasks_project_status_idx')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->dropIndex('tasks_project_status_idx');
            });
        }

        if (Schema::hasIndex('projects', 'projects_user_created_idx')) {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropIndex('projects_user_created_idx');
            });
        }
    }
};
