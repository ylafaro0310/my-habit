<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HabitRecords {
    static $validationRules = [
        'habit_id' => 'required|integer',
        'completed_at' => 'required|integer',
        'is_skipped' => 'required|boolean',
    ];

    static $tableName = 'habit_records';

    function __construct(){
        $this->pdo = DB::connection()->getPdo();        
    }

    public function exists($conditions){
        $setConditions = array_map(function($key,$value){
            return $value === NULL ? "$key = NULL" : "$key = '$value'";
        },array_keys($conditions),array_values($conditions));
        $setConditions = implode(' and ',$setConditions);
        $sth = $this->pdo->prepare("select count(*) from ".self::$tableName." where $setConditions");
        $sth->execute();
        return $sth->fetchColumn();
    }

    public function index(){
        $sth = $this->pdo->prepare("select * from ".self::$tableName);
        $sth->execute();
        $result = $sth->fetchAll();
        return $result;
    }

    public function store($params){
        $columns = implode(', ',array_keys($params));
        $values = implode(', ',array_map(function($v){return "'$v'";},array_values($params)));
        $sth = $this->pdo->prepare("insert into ".self::$tableName." (${columns}) values (${values})");
        return $sth->execute();
    }

    public function destroy($id){
        $sth = $this->pdo->prepare("delete from ".self::$tableName." where id = ${id}");
        return $sth->execute();
    }
}