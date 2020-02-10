<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\HabitRecords;
use App\Http\Controllers\HabitRecordsController;

class HabitRecordsControllerTest extends TestCase
{
    protected function setUp(): void{
        parent::setUp();
        $habitRecords = new HabitRecords();
        $this->habitRecordsPath = '/habits/records';
        $this->tableName = $habitRecords->table_name;
    }

    /**
     * index() test
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get($this->habitRecordPath);
        $this->assertArrayHasKey('habit_name',$response);
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
            'is_skipped' => false,
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
        $this->delete($this->habitRecordsPath.'/1');
        $this->assertDatabaseMissing($this->tableName, ['id'=>1]);

        // 存在しないhabit_idのテスト
    }
}
