<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (! Schema::hasColumn('projects', 'previous_status')) {
            Schema::table('projects', function (Blueprint $table) {
                $table->string('previous_status')->nullable()->after('status');
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('projects', 'previous_status')) {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropColumn('previous_status');
            });
        }
    }
};
