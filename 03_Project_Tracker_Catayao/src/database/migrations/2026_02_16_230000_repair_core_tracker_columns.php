<?php

use App\Models\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('projects')) {
            Schema::table('projects', function (Blueprint $table) {
                if (!Schema::hasColumn('projects', 'user_id')) {
                    $table->unsignedBigInteger('user_id')->nullable()->after('id');
                }

                if (!Schema::hasColumn('projects', 'title')) {
                    $table->string('title')->nullable()->after('user_id');
                }

                if (!Schema::hasColumn('projects', 'description')) {
                    $table->text('description')->nullable()->after('title');
                }
            });

            if (Schema::hasColumn('projects', 'userId')) {
                DB::statement('UPDATE projects SET user_id = userId WHERE user_id IS NULL AND userId IS NOT NULL');
            }
        }

        if (Schema::hasTable('tasks')) {
            Schema::table('tasks', function (Blueprint $table) {
                if (!Schema::hasColumn('tasks', 'project_id') && !Schema::hasColumn('tasks', 'projectId')) {
                    $table->unsignedBigInteger('project_id')->nullable()->after('id');
                }

                if (!Schema::hasColumn('tasks', 'title')) {
                    $table->string('title')->nullable()->after('project_id');
                }

                if (!Schema::hasColumn('tasks', 'description')) {
                    $table->text('description')->nullable()->after('title');
                }

                if (!Schema::hasColumn('tasks', 'priority')) {
                    $table->string('priority')->default(Task::PRIORITY_MEDIUM)->after('description');
                }

                if (!Schema::hasColumn('tasks', 'status')) {
                    $table->string('status')->default(Task::STATUS_PENDING)->after('priority');
                }
            });

            if (Schema::hasColumn('tasks', 'projectId') && Schema::hasColumn('tasks', 'project_id')) {
                DB::statement('UPDATE tasks SET project_id = projectId WHERE project_id IS NULL AND projectId IS NOT NULL');
            }
        }

        if (
            Schema::hasTable('projects')
            && Schema::hasColumn('projects', 'user_id')
            && Schema::hasColumn('projects', 'created_at')
            && !Schema::hasIndex('projects', 'projects_user_created_idx')
        ) {
            Schema::table('projects', function (Blueprint $table) {
                $table->index(['user_id', 'created_at'], 'projects_user_created_idx');
            });
        }

        if (
            Schema::hasTable('tasks')
            && Schema::hasColumn('tasks', 'project_id')
            && !Schema::hasIndex('tasks', 'tasks_project_id_index')
        ) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->index('project_id');
            });
        }
    }

    public function down(): void
    {
        // Intentionally left empty to avoid destructive rollback on repaired schemas.
    }
};
