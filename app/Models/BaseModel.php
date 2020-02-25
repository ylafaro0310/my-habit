<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BaseModel {
    public $validationRules = [];

    public $tableName = '';

    function __construct(){
        $this->pdo = DB::connection()->getPdo();        
    }

    public function exists($conditions){
        $setConditions = array_map(function($key,$value){
            return $value === NULL ? "$key = NULL" : "$key = '$value'";
        },array_keys($conditions),array_values($conditions));
        $setConditions = implode(' and ',$setConditions);
        $sth = $this->pdo->prepare("select count(*) from ".$this->tableName." where $setConditions");
        $sth->execute();
        return $sth->fetchColumn();
    }

    public function index(){
        $sth = $this->pdo->prepare("select * from ".$this->tableName);
        Log::debug('SQL: '.$sth->queryString);
        $sth->execute();
        $result = $sth->fetchAll();
        return $result;
    }

    public function store($params){
        $columns = implode(', ',array_keys($params));
        $values = implode(', ',array_map(function($v){return $v===NULL?"NULL":"'$v'";},array_values($params)));
        $sth = $this->pdo->prepare("insert into ".$this->tableName." (${columns}) values (${values})");
        return $sth->execute();
    }

    public function update($id,$params){
        $setValues = array_map(function($key,$value){
            return $value === NULL ? "$key = NULL" : "$key = '$value'";
        },array_keys($params),array_values($params));
        $setValues = implode(', ',$setValues);
        $sth = $this->pdo->prepare("update ".$this->tableName." set $setValues where id = $id");
        return $sth->execute();
    }

    public function destroy($id){
        $sth = $this->pdo->prepare("delete from ".$this->tableName." where id = ${id}");
        return $sth->execute();
    }
}