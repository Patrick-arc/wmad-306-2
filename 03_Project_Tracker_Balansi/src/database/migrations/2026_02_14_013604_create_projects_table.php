<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_projects_table.php

    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id(); // 
            // Links the project to a specific user
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // 
            $table->string('title'); // 
            $table->text('description'); // [cite: 8] ("description" is listed in task section but implies distinct field in projects too per source 6 list)
            $table->timestamps(); // [cite: 8]
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
