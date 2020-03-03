<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\BaseModel;

class Habits extends BaseModel {
    public $validationRules = [
        'habit_name' => 'required|string|max255',
        'repeat_type' => 'required|string|in:day,week,day_of_week',
        'repeat_value' => 'required|integer',
        'started_at' => 'required|integer',
        'target_time' => 'nullable|integer',
        'time_of_day' => 'required|string|in:always,am,pm',
        'consecutive_days' => 'required|integer',
        'consecutive_weeks' => 'nullable|integer',
    ];

    public $tableName = 'habits';
}