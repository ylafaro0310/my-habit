<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HabitSessionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('habit_sessions')->insert([
            'habit_id' => 1,
            'working_minutes' => 5,
            'completed_at' => '2020-05-10',
        ]);
        DB::table('habit_sessions')->insert([
            'habit_id' => 2,
            'working_minutes' => 10,
            'completed_at' => '2020-05-10',
        ]);
    }
}
