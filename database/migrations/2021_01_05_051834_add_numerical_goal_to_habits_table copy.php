<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNumericalGoalToHabitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('habits', function (Blueprint $table) {
            $table->integer('numerical_goal')->nullable();
            $table->string('numerical_goal_unit')->nullable();
            $table->string('per_what')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if(Schema::hasColumn('habits', 'numerical_goal')){
            Schema::table('habits', function (Blueprint $table) {
                $table->dropColumn('numerical_goal');
            });
        }
        if(Schema::hasColumn('habits', 'numerical_goal_unit')){
            Schema::table('habits', function (Blueprint $table) {
                $table->dropColumn('numerical_goal_unit');
            });
        }
        if(Schema::hasColumn('habits', 'per_what')){
            Schema::table('habits', function (Blueprint $table) {
                $table->dropColumn('per_what');
            });
        }
    }
}
