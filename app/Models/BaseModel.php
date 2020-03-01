<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BaseModel {
    public $validationRules = [];

    public $tableName = '';
    
    public $where = '';
    public $order = '';

    function __construct(){
        $this->pdo = DB::connection()->getPdo();        
    }

    public function value($columns){
        return array_map(function($key,$value){
            return "$key = ".$this->escapeValue($value);
        },array_keys($columns),array_values($columns));
    }

    public function escapeValue($value){
        return $value === NULL ? "NULL" : "'$value'";
    }

    public function exists(){       
        $sth = $this->pdo->prepare("select count(*) from ".$this->tableName." ".$this->where);
        $sth->execute();
        return $sth->fetchColumn();
    }

    public function where($conditions){
        $setConditions = $this->value($conditions);
        $setConditions = implode(' and ',$setConditions);
        $this->where = " where $setConditions";
        return $this;
    }

    public function order($by,$order='asc'){
        $this->order = " order by " . $by . " " . $order;
        return $this;
    }

    public function select($columns=['*']){
        $query = "select ".implode(', ',$columns)." from ".$this->tableName.$this->where.$this->order;        
        
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        $sth->execute();
        $result = $sth->fetchAll();
        return $result;
    }
    
    public function first($columns=['*']){
        $query = "select ".implode(', ',$columns)." from ".$this->tableName.$this->where.$this->order;        
        
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        $sth->execute();
        $result = $sth->fetchAll();
        return $result[0];
    }

    public function store($params){
        $columns = implode(', ',array_keys($params));
        $values = implode(', ',array_map(function($v){return $this->escapeValue($v);},array_values($params)));
        $query = "insert into ".$this->tableName." (${columns}) values (${values})";
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        return $sth->execute();
    }

    public function update($params){
        $setValues = $this->value($params);
        $setValues = implode(', ',$setValues);
        $query = "update ".$this->tableName." set $setValues". $this->where;
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        return $sth->execute();
    }

    public function delete(){
        $query = "delete from ".$this->tableName.$this->where;
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        return $sth->execute();
    }
}