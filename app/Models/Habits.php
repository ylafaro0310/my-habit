<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class Habits {
    function __construct(){
        $this->pdo = DB::connection()->getPdo();
    }
    public function get(){
        $pdo->prepare('select * from habits');
        $pdo->execute();
        return $pdo->fetchAll();
    }
}