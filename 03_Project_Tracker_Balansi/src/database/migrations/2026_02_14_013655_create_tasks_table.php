<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   // database/migrations/xxxx_xx_xx_create_tasks_table.php

    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // [cite: 7]
            // Links the task to a specific project
            $table->foreignId('project_id')->constrained()->onDelete('cascade'); // [cite: 9]
            $table->string('title'); // [cite: 9]
            $table->text('description'); // [cite: 9]
            $table->string('priority'); // [cite: 9] (e.g., 'high', 'medium', 'low')
            $table->string('status')->default('pending'); // [cite: 12] (e.g., 'pending', 'completed')
            $table->timestamps(); // 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
