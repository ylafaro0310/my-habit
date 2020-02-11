<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Habits {
    static $validationRules = [
        'habit_name' => 'required|string|max255',
        'repeat_type' => 'required|string|in:day,week,day_of_week',
        'repeat_value' => 'required|integer',
        'started_at' => 'required|integer',
        'target_time' => 'nullable|integer',
        'time_of_day' => 'required|string|in:always,am,pm',
        'consecutive_days' => 'required|integer',
        'consecutive_weeks' => 'nullable|integer',
    ];

    static $tableName = 'habits';

    function __construct(){
        $this->pdo = DB::connection()->getPdo();
    }
    
    public function index(){
        $sth = $this->pdo->prepare("select * from ".self::$tableName);
        $sth->execute();
        $result = $sth->fetchAll();
        return $result;
    }

    public function store($params){
        $columns = implode(', ',array_keys($params));
        $values = implode(', ',array_map(function($v){return $v===NULL?"NULL":"'$v'";},array_values($params)));
        $sth = $this->pdo->prepare("insert into ".self::$tableName." (${columns}) values (${values})");
        return $sth->execute();
    }

    public function update($id,$params){
        $setValues = array_map(function($key,$value){
            return $value === NULL ? "$key = NULL" : "$key = '$value'";
        },array_keys($params),array_values($params));
        $setValues = implode(', ',$setValues);
        $sth = $this->pdo->prepare("update ".self::$tableName." set $setValues where id = $id");
        return $sth->execute();
    }

    public function destroy($id){
        $sth = $this->pdo->prepare("delete from ".self::$tableName." where id = ${id}");
        return $sth->execute();
    }
}