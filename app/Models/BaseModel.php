<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BaseModel {
    public $validationRules = [];

    public $tableName = '';
    
    public $bindings = [];

    function __construct(){
        $this->pdo = DB::connection()->getPdo();        
    }

    public function cleanBindings(){
        $this->bindings = [];
    }

    public function value($columns){
        return array_map(function($key,$value){
            return "$key = ".$this->escapeValue($value);
        },array_keys($columns),array_values($columns));
    }

    public function escapeValue($value){
        if($value === NULL){
            return "NULL";
        }
        if(is_bool($value)){
            return $value ? "true" : "false";
        }
        return "'$value'";
    }

    public function where($conditions){
        $setConditions = $this->value($conditions);
        $setConditions = implode(' and ',$setConditions);
        $this->bindings['where'] = " where $setConditions";
        return $this;
    }

    public function join($table,$first,$operator,$second){
        $this->bindings['join'] = " inner join $table on $first $operator $second"; 
        
        return $this;
    }

    public function order($by,$order='asc'){
        $this->bindings['order'] = " order by " . $by . " " . $order;
        return $this;
    }

    public function mergeBindings(){
        $return = "";
        
        if(array_key_exists('join',$this->bindings)){
            $return = $return . $this->bindings['join'];
        }

        if(array_key_exists('where',$this->bindings)){
            $return = $return . $this->bindings['where'];
        }

        if(array_key_exists('order',$this->bindings)){
            $return = $return . $this->bindings['order'];
        }

        return $return;
    }

    public function exists(){       
        $sth = $this->pdo->prepare("select count(*) from ".$this->tableName.$this->mergeBindings());
        $sth->execute();
        $this->cleanBindings();
        return $sth->fetchColumn();
    }
    
    public function select($columns=['*']){
        $query = "select ".implode(', ',$columns)." from ".$this->tableName.$this->mergeBindings();        
        
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        $sth->execute();
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        $this->cleanBindings();
        return $result;
    }
    
    public function first($columns=['*']){
        $query = "select ".implode(', ',$columns)." from ".$this->tableName.$this->mergeBindings();        
        
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        $sth->execute();
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        $this->cleanBindings();
        return count($result) > 0 ? $result[0] : [];
    }

    public function store($params){
        $columns = implode(', ',array_keys($params));
        $values = implode(', ',array_map(function($v){return $this->escapeValue($v);},array_values($params)));
        $query = "insert into ".$this->tableName." (${columns}) values (${values})";
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        $this->cleanBindings();
        return $sth->execute();
    }

    public function update($params){
        $setValues = $this->value($params);
        $setValues = implode(', ',$setValues);
        $query = "update ".$this->tableName." set $setValues". $this->mergeBindings();
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        $this->cleanBindings();
        return $sth->execute();
    }

    public function delete(){
        $query = "delete from ".$this->tableName.$this->mergeBindings();
        $sth = $this->pdo->prepare($query);
        Log::debug('SQL: '.$sth->queryString);
        $this->cleanBindings();
        return $sth->execute();
    }
}