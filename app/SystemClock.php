<?php 

namespace App;

class SystemClock {
    public function now(){
        return new \DateTimeImmutable();
    }
}