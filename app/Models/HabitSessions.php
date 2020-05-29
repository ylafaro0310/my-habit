<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\BaseModel;

class HabitSessions extends BaseModel {
    public $validationRules = [
        'completed_at' => 'required|integer',
    ];

    public $tableName = 'habit_sessions';
}