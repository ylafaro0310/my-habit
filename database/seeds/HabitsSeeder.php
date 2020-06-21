<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HabitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('habits')->insert([
            'user_id' => 2,
            'habit_name' => '勉強',
            'repeat_type' => 'week',
            'repeat_value' => 3,
            'started_at' => Date('2020-02-01'),
            'target_time' => null,
            'time_of_day' => 'always',
        ]);
        DB::table('habits')->insert([
            'user_id' => 1,
            'habit_name' => '本を読む',
            'repeat_type' => 'dayOfWeek',
            'repeat_value' => 127,
            'started_at' => Date('2020-02-10'),
            'target_time' => 5,
            'time_of_day' => 'always',
        ]);
        DB::table('habits')->insert([
            'user_id' => 1,
            'habit_name' => '新しいCDを1枚聴く',
            'repeat_type' => 'dayOfWeek',
            'repeat_value' => 0b1000001,
            'started_at' => Date('2020-02-09'),
            'target_time' => null,
            'time_of_day' => 'always',
        ]);
        DB::table('habits')->insert([
            'user_id' => 1,
            'habit_name' => '筋トレ',
            'repeat_type' => 'interval',
            'repeat_value' => 3,
            'started_at' => Date('2020-02-01'),
            'target_time' => null,
            'time_of_day' => 'always',
        ]);
        DB::table('habits')->insert([
            'user_id' => 1,
            'habit_name' => 'ゲーム',
            'repeat_type' => 'week',
            'repeat_value' => 3,
            'started_at' => Date('2020-02-01'),
            'target_time' => null,
            'time_of_day' => 'always',
        ]);
    }
}
