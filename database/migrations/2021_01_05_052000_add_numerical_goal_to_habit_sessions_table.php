<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNumericalGoalToHabitSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('habit_sessions', function (Blueprint $table) {
            $table->integer('numerical_goal')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if(Schema::hasColumn('habit_sessions', 'numerical_goal')){
            Schema::table('habit_sessions', function (Blueprint $table) {
                $table->dropColumn('numerical_goal');
            });
        }
    }
}
