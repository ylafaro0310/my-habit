<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\HabitRecords;
use App\Http\Controllers\HabitRecordsController;

class HabitRecordsControllerTest extends TestCase
{
    protected function setUp(): void{
        parent::setUp();
        $habitRecords = new HabitRecords();
        $this->habitRecordsPath = '/api/habits/records';
        $this->tableName = $habitRecords->table_name;

        Artisan::call('migrate:refresh --seed --env=testing');
    }

    /**
     * index() test
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get($this->habitRecordsPath);
        $response->assertJson([['habit_id'=>1]]);
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
        $this->post($this->habitRecordsPath,$params);
        $this->assertDatabaseHas($this->tableName, $params);

        // 存在しないhabit_idのテスト
    }

    /**
     * delete() test
     *
     * @return void
     */
    public function testDelete()
    {
        $this->assertDatabaseHas($this->tableName, ['id'=>1]);
        $this->delete($this->habitRecordsPath.'/1');
        $this->assertDatabaseMissing($this->tableName, ['id'=>1]);

        // 存在しないhabit_idのテスト
    }
}
