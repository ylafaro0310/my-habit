<?php 

namespace App\Utils;

class Util {
    public static function camelArray(array $array){
        $result = [];
        foreach($array as $key => $value){
            if(is_array($value)){
                $result[\Str::camel($key)] = self::camelArray($value);
            }else{
                $result[\Str::camel($key)] = $value;
            }    
        }
        return $result;
    }

    public static function snakeArray(array $array){
        $result = [];
        foreach($array as $key => $value){
            if(is_array($value)){
                $result[\Str::snake($key)] = self::snakeArray($value);
            }else{
                $result[\Str::snake($key)] = $value;
            }
        }
        return $result;
    }
}