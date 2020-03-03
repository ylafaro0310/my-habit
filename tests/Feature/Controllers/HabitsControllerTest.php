<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HabitsController;
use App\Models\Habits;
use App\Utils\Util;

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
                'habitName' => '本を読む',
                'repeatType' => 'day_of_week',
                'repeatValue' => 127,
                'targetTime' => 5,
                'timeOfDay' => 'always',
            ]
        ];
        $response = $this->get($this->habitsPath);
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
            'repeatType' => 'day_of_week',
            'repeatValue' => 127,
            'targetTime' => 5,
            'timeOfDay' => 'always',
        ];
        $response = $this->get($this->habitsPath.'/1');
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
            'repeatType' => 'day_of_week',
            'repeatValue' => 127,
            'startedAt' => Date('2020-02-09'),
            'targetTime' => null,
            'timeOfDay' => 'always',
        ];
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($params));
        $this->post($this->habitsPath,$params);
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
            'habitName' => '本を5分読む',
            'repeatType' => 'day_of_week',
            'repeatValue' => 127,
            'targetTime' => 5,
            'timeOfDay' => 'always',
        ];
        $expectedData = $params;
        $this->assertDatabaseMissing($this->tableName, Util::snakeArray($expectedData));
        $this->patch($this->habitsPath.'/1',$params);
        $this->assertDatabaseHas($this->tableName, Util::snakeArray($expectedData));
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
