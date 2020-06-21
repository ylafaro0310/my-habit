<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HabitRecordsController;

use App\User;
use App\Models\HabitRecords;
use App\Utils\Util;

class HabitRecordsControllerTest extends TestCase
{
    protected function setUp(): void{
        parent::setUp();
        $habitRecords = new HabitRecords;
        $this->habitRecordsPath = '/api/habits/records';
        $this->tableName = $habitRecords->tableName;
        $this->user = factory(User::class)->create();

        Artisan::call('migrate:refresh --seed --env=testing');

        $mock = \Mockery::mock('App\Utils\SystemClock')->makePartial();
        $mock->shouldReceive('now')->andReturn(new \DateTimeImmutable('2020-02-11'));
        $mock->shouldReceive('getLastSunday')->andReturn(new \DateTimeImmutable('2020-02-09'));
        $this->app->instance('App\Utils\SystemClock', $mock);
    }

    /**
     * index() test
     *
     * @return void
     */
    public function testIndex()
    {
        $expectedData = [
            'habitRecords' => [['habitId'=>1]],
            'habits' => [
                [
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                    'consecutiveDays' => 3,
                    'consecutiveWeeks' => null,
                ],[
                    'habitName' => '新しいCDを1枚聴く',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 0b1000001,
                    'targetTime' => null,
                    'timeOfDay' => 'always',
                    'consecutiveDays' => 3,
                    'consecutiveWeeks' => 1,
                ],[
                    'habitName' => '筋トレ',
                    'repeatType' => 'interval',
                    'repeatValue' => 3,
                    'targetTime' => null,
                    'timeOfDay' => 'always',
                    'consecutiveDays' => 2,
                    'consecutiveWeeks' => null,
                ],[
                    'habitName' => 'ゲーム',
                    'repeatType' => 'week',
                    'repeatValue' => 3,
                    'targetTime' => null,
                    'timeOfDay' => 'always',
                    'consecutiveDays' => 4,
                    'consecutiveWeeks' => 1,
                ]
            ],
        ];
        $response = $this->actingAs($this->user)->get($this->habitRecordsPath);
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
            'habitId' => 1,
            'completedAt' => '2020-02-11',
            'isSkipped' => 0,
        ];

        $expectedData = [
            'habitRecords' => [['habitId'=>1]],
            'habits' => [
                [
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                    'consecutiveDays' => 4,
                    //'consecutiveWeeks' => null,
                ]
            ],
        ];

        $response = $this->actingAs($this->user)->post($this->habitRecordsPath,$params);
        $this->assertDatabaseHas($this->tableName, Util::snakeArray($params));
        $response->assertJson($expectedData);
    }

    /**
     * delete() test
     *
     * @return void
     */
    public function testDelete()
    {
        $params = [
            'habitId' => 1,
            'completedAt' => '2020-02-08',
        ];

        $expectedData = [
            'habitRecords' => [['habitId'=>1]],
            'habits' => [
                [
                    'habitName' => '本を読む',
                    'repeatType' => 'dayOfWeek',
                    'repeatValue' => 127,
                    'targetTime' => 5,
                    'timeOfDay' => 'always',
                    'consecutiveDays' => 2,
                    //'consecutiveWeeks' => null,
                ]
            ],
        ];
        
        $this->assertDatabaseHas($this->tableName, ['id'=>1]);
        $response = $this->actingAs($this->user)->delete($this->habitRecordsPath,$params);
        $response->assertStatus(200);
        $response->assertJson($expectedData);
        $this->assertDatabaseMissing($this->tableName, ['id'=>1]);

        // 不正なパラメータのテスト
        $response = $this->actingAs($this->user)->delete($this->habitRecordsPath,['habitId'=>1]);
        $response->assertStatus(400);

        $response = $this->actingAs($this->user)->delete($this->habitRecordsPath,['completedAt'=>'2020-02-08']);
        $response->assertStatus(400);
    }
}
