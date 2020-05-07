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

        DB::table('habit_records')->insert([
            'habit_id' => 2,
            'completed_at' => Date('2020-01-26'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 2,
            'completed_at' => Date('2020-02-02'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 2,
            'completed_at' => Date('2020-02-08'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 2,
            'completed_at' => Date('2020-02-09'),
            'is_skipped' => false,
        ]);

        DB::table('habit_records')->insert([
            'habit_id' => 4,
            'completed_at' => Date('2020-01-31'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 4,
            'completed_at' => Date('2020-02-03'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 4,
            'completed_at' => Date('2020-02-05'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 4,
            'completed_at' => Date('2020-02-06'),
            'is_skipped' => false,
        ]);
        DB::table('habit_records')->insert([
            'habit_id' => 4,
            'completed_at' => Date('2020-02-10'),
            'is_skipped' => false,
        ]);
    }
}
