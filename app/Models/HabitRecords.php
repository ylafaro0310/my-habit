<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HabitRecords {
    public $validationRules = [
        'habit_id' => 'required|integer',
        'completed_at' => 'required|integer',
        'is_skipped' => 'required|boolean',
    ];
    
    function __construct(){
        $this->pdo = DB::connection()->getPdo();
        $this->table_name = 'habit_records';
    }

    public function index(){
        $sth = $this->pdo->prepare("select * from $this->table_name");
        $sth->execute();
        $result = $sth->fetchAll();
        Log::debug($result);
        return $result;
    }

    public function store($params){
        $columns = implode(', ',array_keys($params));
        $values = implode(', ',array_map(function($v){return "'$v'";},array_values($params)));
        $sth = $this->pdo->prepare("insert into $this->table_name (${columns}) values (${values})");
        return $sth->execute();
    }

    public function destroy($id){
        $sth = $this->pdo->prepare("delete from $this->table_name where id = ${id}");
        return $sth->execute();
    }
}