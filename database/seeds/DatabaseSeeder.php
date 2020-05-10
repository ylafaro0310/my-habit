<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(HabitsSeeder::class);
        $this->call(HabitRecordsSeeder::class);
        $this->call(HabitSessionsSeeder::class);
    }
}
