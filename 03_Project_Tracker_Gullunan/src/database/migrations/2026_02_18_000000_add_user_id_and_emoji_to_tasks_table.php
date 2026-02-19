<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->after('id');
            $table->string('emoji')->nullable()->after('due_date');
            $table->dropForeign(['project_id']); // Drop the foreign key constraint first
            $table->foreignId('project_id')->nullable()->change(); // Make project_id nullable
        });

        // Populate user_id from projects for existing tasks
        DB::statement('UPDATE tasks SET user_id = (SELECT user_id FROM projects WHERE projects.id = tasks.project_id) WHERE user_id IS NULL');

        Schema::table('tasks', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('set null'); // Re-add constraint as nullable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            $table->dropColumn('emoji');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });
    }
};