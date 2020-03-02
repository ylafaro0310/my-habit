<?php 

namespace App\Utils;

class SystemClock {
    public function now(){
        return new \DateTimeImmutable();
    }
}