<?php 

namespace App\Utils;

class SystemClock {
    public function now(){
        return new \DateTimeImmutable();
    }
    public function getLastSunday(){
        return new \DateTimeImmutable('last sunday');
    }
}