<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HabitSessionsController;
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
                    'id' => 1,
                    'workingMinutes' => 5,
                ]
            ]
        ];
        $response = $this->get($this->habitSessionsPath);
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
            'habitSessions' => [
                'habitId' => 1,
                'workingMinutes' => 5,
            ]
        ];
        $response = $this->get($this->habitPath.'/1/sessions');
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
            'workingMinutes' => 90,
            'completedAt' => '2020-05-10',
        ];
        $expectedData = [
            'habitSessions' => [
                [
                    'habitId' => 1,
                    'workingMinutes' => 5,
                ],[
                    'habitId' => 2,
                    'workingMinutes' => 10,
                ],[
                    'habitId' => 2,
                    'workingMinutes' => 90,
                ]
            ]
        ];
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($params));
        $response = $this->post($this->habitPath.'/2/sessions',$params);
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
            'id' => 1,
            'workingMinutes' => 10,
            'completedAt' => '2020-05-10',
        ];
        $expectedData = $params;
        $expectedResponse = [
            'habitSessions' => [
                [
                    'id' => 1,
                    'workingMinutes' => 10,
                ]
            ]
        ];
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($expectedData));
        $response = $this->patch($this->habitSessionsPath.'/1',$params);
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
            'habitSessions' => [
                [
                    'id' => 1,
                    'workingMinutes' => 5,
                ]
            ]
        ];
        $this->assertDatabaseHas($this->tableName, ['id'=>2]);
        $response = $this->delete($this->habitSessionsPath.'/2');
        $response->assertJson($expectedData);
        $this->assertDatabaseMissing($this->tableName, ['id'=>2]);

        // 存在しないhabit_idのテスト
        $this->assertDatabaseMissing($this->tableName, ['id'=>999]);
        $response = $this->delete($this->habitSessionsPath.'/999');
        $response->assertStatus(400);
    }
}
