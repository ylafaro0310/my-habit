<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\Habits;
use App\Http\Controllers\HabitsController;

class HabitsControllerTest extends TestCase
{
    protected function setUp(): void{
        parent::setUp();
        $habits = new Habits;
        $this->habitsPath = '/api/habits';
        $this->tableName = $habits->tableName;

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
            [
                'habit_name' => '本を読む',
                'repeat_type' => 'day_of_week',
                'repeat_value' => 127,
                'target_time' => 5,
                'time_of_day' => 'always',
                'consecutive_days' => 3,
                'consecutive_weeks' => null,
            ]
        ];
        $response = $this->get($this->habitsPath);
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
            'habit_name' => 'プログラムを書く',
            'repeat_type' => 'day_of_week',
            'repeat_value' => 127,
            'started_at' => Date('2020-02-09'),
            'target_time' => null,
            'time_of_day' => 'always',
            'consecutive_days' => 0,
            'consecutive_weeks' => null,
        ];
        $this->assertDatabaseMissing($this->tableName, $params);
        $this->post($this->habitsPath,$params);
        $this->assertDatabaseHas($this->tableName, $params);
    }

/**
     * update() test
     *
     * @return void
     */
    public function testUpdate()
    {
        $params = [
            'habit_name' => '本を5分読む',
            'repeat_type' => 'day_of_week',
            'repeat_value' => 127,
            'target_time' => 5,
            'time_of_day' => 'always',
            'consecutive_days' => 0,
            'consecutive_weeks' => null,
        ];
        $expectedData = $params;
        $this->assertDatabaseMissing($this->tableName, $expectedData);
        $this->patch($this->habitsPath.'/1',$params);
        $this->assertDatabaseHas($this->tableName, $expectedData);
    }

    /**
     * delete() test
     *
     * @return void
     */
    public function testDelete()
    {
        $this->assertDatabaseHas($this->tableName, ['id'=>1]);
        $this->delete($this->habitsPath.'/1');
        $this->assertDatabaseMissing($this->tableName, ['id'=>1]);

        // 存在しないhabit_idのテスト
    }
}
