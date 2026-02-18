<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('tasks')) {
            return;
        }

        if (!Schema::hasColumn('tasks', 'project_id')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->unsignedBigInteger('project_id')->nullable()->after('id');
            });
        }

        if (Schema::hasColumn('tasks', 'projectId')) {
            DB::statement('UPDATE tasks SET project_id = projectId WHERE project_id IS NULL AND projectId IS NOT NULL');
        }

        if (!Schema::hasIndex('tasks', 'tasks_project_id_index')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->index('project_id');
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
        // Intentionally left empty to avoid destructive schema rollback.
    }
};
