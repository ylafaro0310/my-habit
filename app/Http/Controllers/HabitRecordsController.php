<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Habits;
use App\Models\HabitRecords;
use App\Utils\SystemClock;
use App\Utils\Util;

class HabitRecordsController extends Controller
{
    function __construct(HabitRecords $habitRecords,Habits $habits,SystemClock $systemClock){
        $this->habits = $habits;
        $this->habitRecords = $habitRecords;
        $this->systemClock = $systemClock;
        $this->pdo = DB::connection()->getPdo();
    }

    private function createResponse(){
        $habits = $this->habits->select();
        $habitRecords = $this->habitRecords->select();

        foreach($habits as &$habit){
            $filteredRecords = array_filter($habitRecords,function($v)use($habit){return $v['habit_id'] === $habit['id'];});
            $consecutiveDays = $this->calcConsecutiveDays($filteredRecords);
            $habit['consecutiveDays'] = $consecutiveDays;
        }

        $response = [
            'habits' => $habits,
            'habitRecords' => $habitRecords,
        ];

        return Util::camelArray($response);
    }

    private function calcConsecutiveDays($habitRecords){
        $completedAt = array_column($habitRecords,'completed_at');
        array_multisort($completedAt,SORT_DESC,$habitRecords);
        $count = 0;

        // 今日があるか
        $today = $this->systemClock->now();
        $yesterday = $today->sub(new \DateInterval('P1D'));
        $recordsBeforeYesterday = [];
        foreach($habitRecords as $key => $value){
            $completed_at = new \DateTime($value['completed_at']);
            // 今日があるか
            $interval = $completed_at->diff($today);
            if($interval->days == 0){
                $count = 1;
                continue;
            }

            // 昨日があるか
            $interval = $completed_at->diff($yesterday);
            if($interval->days == 0){
                $recordsBeforeYesterday = array_slice($habitRecords,$key);
                $prev = $completed_at->sub(new \DateInterval('P1D'));
                break;
            }            
        }

        if($recordsBeforeYesterday != []){
            foreach($recordsBeforeYesterday as $value){
                $next = new \DateTime($value['completed_at']);
                $interval = $next->diff($prev);
                if($interval->days == 1){
                    $count++;
                }else{
                    break;
                }
                $prev = $next;
            }
        }
        return $count;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = $this->createResponse();
        return json_encode($response);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $params = $request->only('habitId','completedAt','isSkipped');
        $params = Util::snakeArray($params);
        if(empty($params['habit_id']) || empty($params['completed_at'])){
            abort(400,'Invalid parameter specified');
        }
        try{
            $this->pdo->beginTransaction();
            $this->habitRecords->store($params);
            $this->pdo->commit();
        }catch(Exception $e){
            $this->pdo->rollback();
            Log::error('Transaction Error: '.$e->getMessage());
        }

        $response = $this->createResponse();
        return json_encode($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $params = $request->only('habitId','completedAt');
        $params = Util::snakeArray($params);
        if(empty($params['habit_id']) || empty($params['completed_at'])){
            abort(400,'Invalid parameter specified');
        }
        try{
            $this->pdo->beginTransaction();
            $this->habitRecords->where($params)->delete();                
            $this->pdo->commit();
        }catch(Exception $e){
            $this->pdo->rollback();
            Log::error('Transaction Error: '.$e->getMessage());
        }
        $response = $this->createResponse();
        return json_encode($response);
    }
}
