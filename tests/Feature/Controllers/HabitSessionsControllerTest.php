<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HabitSessionsController;

use App\User;
use App\Models\HabitSessions;
use App\Utils\Util;

class HabitSessionsControllerTest extends TestCase
{
    protected function setUp(): void{
        parent::setUp();
        $habitSessions = new HabitSessions;
        $this->habitPath = '/api/habits';
        $this->habitSessionsPath = '/api/habits/sessions';
        $this->tableName = $habitSessions->tableName;
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
            'habitSessions' => [
                [
                    'habitId' => 2,
                    'workingMinutes' => 5,
                ]
            ]
        ];
        $response = $this->actingAs($this->user)->get($this->habitSessionsPath);
        $response->assertJson($expectedData);
        $response->assertJsonMissing(['habits'=>['user_id'=>2]]);
    }

    /**
     * show() test
     *
     * @return void
     */
    public function testShow()
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
            ],
            'habitSessions' => [
                [
                    'habitId' => 2,
                    'workingMinutes' => 5,
                ]
            ]
        ];
        $response = $this->actingAs($this->user)->get($this->habitPath.'/1/sessions');
        $response->assertJson($expectedData);
        $response->assertJsonMissing(['habits'=>['user_id'=>2]]);
    }

    /**
     * store() test
     *
     * @return void
     */
    public function testStore()
    {
        $params = [
            'workingMinutes' => 90,
            'completedAt' => '2020-05-10',
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
            ],
            'habitSessions' => [
                [
                    'habitId' => 2,
                    'workingMinutes' => 10,
                ],[
                    'habitId' => 2,
                    'workingMinutes' => 90,
                ]
            ]
        ];
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($params));
        $response = $this->actingAs($this->user)->post($this->habitPath.'/2/sessions',$params);
        $response->assertJson($expectedData);
        $response->assertJsonMissing(['habits'=>['user_id'=>2]]);
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
            'workingMinutes' => 30,
            'completedAt' => '2020-05-10',
        ];
        $expectedData = $params;
        $expectedResponse = [
            'habits' => [
                [
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                ]
            ],
            'habitSessions' => [
                [
                    'workingMinutes' => 30,
                ],
            ]
        ];
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($expectedData));
        $response = $this->actingAs($this->user)->patch($this->habitSessionsPath.'/2',$params);
        $response->assertJson($expectedResponse);
        $response->assertJsonMissing(['habits'=>['user_id'=>2]]);
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
            ],
            'habitSessions' => [
                [
                    'id' => 1,
                    'workingMinutes' => 5,
                ]
            ]
        ];
        $this->assertDatabaseHas($this->tableName, ['id'=>2]);
        $response = $this->actingAs($this->user)->delete($this->habitSessionsPath.'/2');
        $response->assertJson($expectedData);
        $response->assertJsonMissing(['habits'=>['user_id'=>2]]);
        $this->assertDatabaseMissing($this->tableName, ['id'=>2]);

        // 存在しないhabit_idのテスト
        $this->assertDatabaseMissing($this->tableName, ['id'=>999]);
        $response = $this->actingAs($this->user)->delete($this->habitSessionsPath.'/999');
        $response->assertStatus(400);
    }
}
