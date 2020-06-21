<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HabitsController;

use App\User;
use App\Models\Habits;
use App\Utils\Util;

class HabitsControllerTest extends TestCase
{
    protected function setUp(): void{
        parent::setUp();
        $habits = new Habits;
        $this->habitsPath = '/api/habits';
        $this->tableName = $habits->tableName;
        $this->user = factory(User::class)->create();

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
            'habits' => [
                [
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                ]
            ]
        ];
        $response = $this->actingAs($this->user)->get($this->habitsPath);
        $response->assertJson($expectedData);
    }

    /**
     * show() test
     *
     * @return void
     */
    public function testShow()
    {
        $expectedData = [
            'habitName' => '本を読む',
            'repeatType' => 'dayOfWeek',
            'repeatValue' => 127,
            'targetTime' => 5,
            'timeOfDay' => 'always',
        ];
        $response = $this->actingAs($this->user)->get($this->habitsPath.'/1');
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
            'habitName' => 'プログラムを書く',
            'repeatType' => 'dayOfWeek',
            'repeatValue' => 127,
            'startedAt' => Date('2020-02-09'),
            'targetTime' => null,
            'timeOfDay' => 'always',
        ];
        $expectedData = [
            'habits' => [
                [
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                ]   
            ]
        ];
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($params));
        $response = $this->actingAs($this->user)->post($this->habitsPath,$params);
        $response->assertJson($expectedData);
        $this->assertDatabaseHas($this->tableName, Util::snakeArray($params));
    }

/**
     * update() test
     *
     * @return void
     */
    public function testUpdate()
    {
        $params = [
            'habitName' => '新しいCDを2枚聴く',
            'repeatType' => 'dayOfWeek',
            'repeatValue' => 127,
            'targetTime' => 5,
            'timeOfDay' => 'always',
        ];
        $expectedData = $params;
        $expectedResponse = [
            'habits' => [
                [
                    'id' => 1,
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                ]
            ]
        ];
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($expectedData));
        $response = $this->actingAs($this->user)->patch($this->habitsPath.'/2',$params);
        $response->assertJson($expectedResponse);
        $this->assertDatabaseHas($this->tableName, Util::snakeArray($expectedData));
    }

    /**
     * delete() test
     *
     * @return void
     */
    public function testDelete()
    {
        $expectedData = [
            'habits' => [
                [
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                ]
            ]
        ];
        $this->assertDatabaseHas($this->tableName, ['id'=>2]);
        $response = $this->actingAs($this->user)->delete($this->habitsPath.'/2');
        $response->assertJson($expectedData);
        $this->assertDatabaseMissing($this->tableName, ['id'=>2]);
        $this->assertDatabaseMissing('habit_records', ['habit_id'=>2]);

        // 存在しないhabit_idのテスト
        $this->assertDatabaseMissing($this->tableName, ['id'=>999]);
        $response = $this->actingAs($this->user)->delete($this->habitsPath.'/999');
        $response->assertStatus(400);
    }
}
