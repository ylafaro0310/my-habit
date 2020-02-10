<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

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

    public function get(){
        $this->pdo->prepare("select * from ${$this->table_name}");
        $this->pdo->execute();
        return $pdo->fetchAll();
    }

    public function insert($params){
        $this->pdo->prepare("insert into ${$this->table_name}");
    }

    public function delete($id){
        $this->pdo->prepare("delete from ${$this->table_name} where id = ${id}");
        $this->pdo->execute();
    }
}