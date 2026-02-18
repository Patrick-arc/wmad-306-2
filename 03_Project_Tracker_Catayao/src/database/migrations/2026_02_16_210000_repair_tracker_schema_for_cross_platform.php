<?php

use App\Models\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('tasks')) {
            Schema::table('tasks', function (Blueprint $table) {
                if (!Schema::hasColumn('tasks', 'project_id')) {
                    $table->unsignedBigInteger('project_id')->nullable();
                }

                if (!Schema::hasColumn('tasks', 'description')) {
                    $table->text('description')->nullable();
                }

                if (!Schema::hasColumn('tasks', 'priority')) {
                    $table->string('priority')->default(Task::PRIORITY_MEDIUM);
                }

                if (!Schema::hasColumn('tasks', 'status')) {
                    $table->string('status')->default(Task::STATUS_PENDING);
                }
            });

            if (Schema::hasTable('projects') && !Schema::hasIndex('tasks', 'tasks_project_id_index')) {
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

        if (!Schema::hasTable('password_reset_tokens')) {
            Schema::create('password_reset_tokens', function (Blueprint $table) {
                $table->string('email')->primary();
                $table->string('token');
                $table->timestamp('created_at')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('tasks')) {
            if (Schema::hasIndex('tasks', 'tasks_project_status_idx')) {
                Schema::table('tasks', function (Blueprint $table) {
                    $table->dropIndex('tasks_project_status_idx');
                });
            }

            if (Schema::hasIndex('tasks', 'tasks_project_created_idx')) {
                Schema::table('tasks', function (Blueprint $table) {
                    $table->dropIndex('tasks_project_created_idx');
                });
            }
        }

        Schema::dropIfExists('password_reset_tokens');
    }
};

