<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add user_id to tasks so tasks can belong directly to a user
        Schema::table('tasks', function (Blueprint $table) {
            if (!Schema::hasColumn('tasks', 'user_id')) {
                $table->foreignId('user_id')->constrained()->cascadeOnDelete()->after('id');
            }
        });

        // Make project_id nullable so tasks may exist without a project
        Schema::table('tasks', function (Blueprint $table) {
            // Drop existing FK if present, change column to nullable, then re-add FK
            try {
                $table->dropForeign(['project_id']);
            } catch (\Exception $e) {
                // ignore if foreign key name differs or doesn't exist
            }

            // Use change(); this requires doctrine/dbal in the environment.
            if (Schema::hasColumn('tasks', 'project_id')) {
                $table->unsignedBigInteger('project_id')->nullable()->change();
            }

            // Re-add FK (ignore if it already exists)
            try {
                $table->foreign('project_id')->references('id')->on('projects')->cascadeOnDelete();
            } catch (\Exception $e) {
                // foreign key may already exist; ignore
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            if (Schema::hasColumn('tasks', 'user_id')) {
                try {
                    $table->dropForeign(['user_id']);
                } catch (\Exception $e) {
                }
                $table->dropColumn('user_id');
            }
        });

        Schema::table('tasks', function (Blueprint $table) {
            try {
                $table->dropForeign(['project_id']);
            } catch (\Exception $e) {
            }

            $table->unsignedBigInteger('project_id')->nullable(false)->change();
            $table->foreign('project_id')->references('id')->on('projects')->cascadeOnDelete();
        });
    }
};
