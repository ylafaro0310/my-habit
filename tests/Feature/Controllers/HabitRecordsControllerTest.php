<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\HabitRecords;
use App\Http\Controllers\HabitRecordsController;

class HabitRecordsControllerTest extends TestCase
{
    protected function setUp(): void{
        parent::setUp();
        $this->habitRecordsPath = '/api/habits/records';
        $this->tableName = HabitRecords::$tableName;

        Artisan::call('migrate:refresh --seed --env=testing');
    }

    /**
     * index() test
     *
     * @return void
     */
    public function testIndex()
    {
        $expectedData = [
            'habitRecords' => [['habit_id'=>1]],
            'habits' => [
                [
                    'habit_name' => '本を読む',
                    'repeat_type' => 'day_of_week',
                    'repeat_value' => 127,
                    'target_time' => 5,
                    'time_of_day' => 'always',
                    'consecutive_days' => 3,
                    'consecutive_weeks' => null,
                ]
            ],
        ];
        $response = $this->get($this->habitRecordsPath);
        $response->assertJson($expectedData);
    }

    /**
     * store() test
     *
     * @return void
     */
    public function testStore()
    {
        $params = [
            'habit_id' => 3,
            'completed_at' => Date('2020-02-10'),
            'is_skipped' => 0,
        ];

        $expectedData = [
            'habitRecords' => [['habit_id'=>1]],
            'habits' => [
                [
                    'habit_name' => '本を読む',
                    'repeat_type' => 'day_of_week',
                    'repeat_value' => 127,
                    'target_time' => 5,
                    'time_of_day' => 'always',
                    'consecutive_days' => 3,
                    'consecutive_weeks' => null,
                ]
            ],
        ];

        $response = $this->post($this->habitRecordsPath,$params);
        $this->assertDatabaseHas($this->tableName, $params);
        $response->assertJson($expectedData);
    }

    /**
     * delete() test
     *
     * @return void
     */
    public function testDelete()
    {
        $expectedData = [
            'habitRecords' => [['habit_id'=>1]],
            'habits' => [
                [
                    'habit_name' => '本を読む',
                    'repeat_type' => 'day_of_week',
                    'repeat_value' => 127,
                    'target_time' => 5,
                    'time_of_day' => 'always',
                    'consecutive_days' => 3,
                    'consecutive_weeks' => null,
                ]
            ],
        ];
        
        $this->assertDatabaseHas($this->tableName, ['id'=>1]);
        $response = $this->delete($this->habitRecordsPath.'/1');
        $response->assertStatus(200);
        $response->assertJson($expectedData);
        $this->assertDatabaseMissing($this->tableName, ['id'=>1]);

        // 存在しないhabit_idのテスト
        $response = $this->delete($this->habitRecordsPath.'/999');
        $response->assertStatus(400);
    }
}
