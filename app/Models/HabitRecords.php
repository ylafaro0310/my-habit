<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class HabitRecords {
    function __construct(){
        $this->pdo = DB::connection()->getPdo();
    }
    public function get(){
        $pdo->prepare('select * from habit_records');
        $pdo->execute();
        return $pdo->fetchAll();
    }
}