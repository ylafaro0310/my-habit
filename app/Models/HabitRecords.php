<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\BaseModel;

class HabitRecords extends BaseModel {
    public $validationRules = [
        'habit_id' => 'required|integer',
        'completed_at' => 'required|integer',
        'is_skipped' => 'required|boolean',
    ];

    public $tableName = 'habit_records';
}