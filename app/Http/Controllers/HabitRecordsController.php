<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Habits;
use App\Models\HabitRecords;
use App\SystemClock;

class HabitRecordsController extends Controller
{
    function __construct(HabitRecords $habitRecords,Habits $habits,SystemClock $systemClock){
        $this->habits = $habits;
        $this->habitRecords = $habitRecords;
        $this->systemClock = $systemClock;
        $this->pdo = DB::connection()->getPdo();
    }

    private function createResponse(){
        $response = [
            'habits' => $this->habits->select(),
            'habitRecords' => $this->habitRecords->select(),
        ];
        return $response;
    }

    private function calcConsecutiveDays($id){
        $habitRecords = $this->habitRecords->where(['habit_id'=>$id])->order('completed_at','desc')->select();
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
        $this->habits->where(['id'=>$id])->update(['consecutive_days'=>$count]);
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
        $params = $request->all();
        try{
            $this->pdo->beginTransaction();
            $this->habitRecords->store($params);
            $this->calcConsecutiveDays($params['habit_id']);
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
    public function destroy($id)
    {
        if($this->habitRecords->where(['id'=>$id])->exists()){
            try{
                $this->pdo->beginTransaction();
                $habit_id = $this->habitRecords->where(['id'=>$id])->first(['habit_id'])['habit_id'];
                $this->habitRecords->where(['id'=>$id])->delete();                
                $this->calcConsecutiveDays($habit_id);
                $this->pdo->commit();
            }catch(Exception $e){
                $this->pdo->rollback();
                Log::error('Transaction Error: '.$e->getMessage());
            }
            $response = $this->createResponse();
            return json_encode($response);
        }else{
            abort(400,'Invalid parameter specified');
        }
    }
}
