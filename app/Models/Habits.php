<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class Habits {
    public $validationRules = [
        'habit_name' => 'required|string|max255',
        'repeat_type' => [
            'required',
            'string',
            Rule::in(['day','week','day_of_week']),
        ],
        'repeat_value' => 'required|integer',
        'started_at' => 'required|integer',
        'target_time' => 'nullable|integer',
        'time_of_day' => [
            'required',
            'string',
            Rule::in(['always','am','pm']),
        ],
        'consecutive_days' => 'required|integer',
        'consecutive_weeks' => 'nullable|integer',
    ];

    function __construct(){
        $this->pdo = DB::connection()->getPdo();
    }
    
    public function get(){
        $pdo->prepare('select * from habits');
        $pdo->execute();
        return $pdo->fetchAll();
    }
}