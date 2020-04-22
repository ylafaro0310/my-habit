<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HabitRecordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('habit_records')->insert([
            'habit_id' => 1,
            'completed_at' => Date('2020-02-08'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 1,
            'completed_at' => Date('2020-02-09'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 1,
            'completed_at' => Date('2020-02-10'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 3,
            'completed_at' => Date('2020-02-01'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 3,
            'completed_at' => Date('2020-02-07'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 3,
            'completed_at' => Date('2020-02-09'),
            'is_skipped' => false,
        ]);
    }
}
