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
        $this->habitRecordsPath = '/habits/records';
    }

    /**
     * index() test
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get($this->habitRecordPath);
        
    }

    /**
     * store() test
     *
     * @return void
     */
    public function testStore()
    {
    }
}
