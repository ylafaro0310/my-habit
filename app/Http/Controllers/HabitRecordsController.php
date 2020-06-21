<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

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
        $userId = Auth::id();
        $habits = $this->habits->where(['user_id'=>$userId])->select();
        $habitRecords = $this->habitRecords->where(['user_id'=>$userId])->join('habits','habits.id','=','habit_records.habit_id')->select();

        foreach($habits as &$habit){
            $filteredRecords = array_filter($habitRecords,function($v)use($habit){return $v['habit_id'] === $habit['id'];});
            $consecutiveDays = $this->calcConsecutiveDays($filteredRecords,$habit['repeat_type'],$habit['repeat_value']);
            $habit['consecutiveDays'] = $consecutiveDays[0];
            $habit['consecutiveWeeks'] = $consecutiveDays[1];
        }

        $response = [
            'habits' => $habits,
            'habitRecords' => $habitRecords,
        ];

        return Util::camelArray($response);
    }

    private function calcConsecutiveDays($habitRecords,$repeatType,$repeatValue){
        $completedAt = array_column($habitRecords,'completed_at');
        array_multisort($completedAt,SORT_DESC,$habitRecords);

        $definedRepeatType = [
            'dayOfWeek',
            'interval',
            'week'
        ];
        if(!in_array($repeatType,$definedRepeatType)){
            throw new Exception('未定義の$repeatTypeが入力されました。');
        }

        if($repeatType == 'dayOfWeek'){
            if($repeatValue==127){
                return [$this->calcInterval($habitRecords,1),null];
            }else{
                return $this->calcDayOfWeek($habitRecords,$repeatValue);
            }
        }
        if($repeatType == 'interval'){
            return [$this->calcInterval($habitRecords,$repeatValue),null];
        }
        if($repeatType == 'week'){
            return $this->calcWeek($habitRecords,$repeatValue);
        }
    }

    private function calcWeek($habitRecords,$repeatValue){
        $countDay = 0;
        $countDayThisWeek = 0;
        $countWeek = 0;
        $lastSunday = $this->systemClock->getLastSunday();
        foreach($habitRecords as $value){
            // 日曜より新しい場合はカウント
            $date = new \DateTime($value['completed_at']);
            $interval = $lastSunday->diff($date);
            // 日曜より古い場合は前の週の日曜をセット
            if($interval->invert != 0){
                if($countDayThisWeek == $repeatValue){
                    $countWeek++;
                }
                if($countDayThisWeek < $repeatValue){
                    // 今週以外の週で、指定回数達成していない場合はループを抜ける
                    if($lastSunday->diff($this->systemClock->getLastSunday())->days != 0){
                        break;
                    }
                }
                $countDayThisWeek=0;
                $lastSunday = $lastSunday->sub(new \DateInterval('P7D'));
            }
            $countDayThisWeek++;
            $countDay++;
        }
        return [$countDay,$countWeek];
    }

    private function calcDayOfWeek($habitRecords,$repeatValue){
        $countDay = 0;
        $dowFrag = $repeatValue;
        $countWeek = 0;
        $lastSunday = $this->systemClock->getLastSunday();
        foreach($habitRecords as $value){
            // 日曜より新しい場合はカウント
            $date = new \DateTime($value['completed_at']);
            $interval = $lastSunday->diff($date);
            // 日曜より古い場合は前の週の日曜をセット
            if($interval->invert != 0){
                if($dowFrag == 0){
                    $countWeek++;
                }else{
                    // 今週以外の週で、指定曜日を達成していない場合はループを抜ける
                    if($lastSunday->diff($this->systemClock->getLastSunday())->days != 0){
                        break;
                    }
            }
                $dowFrag = $repeatValue;
                $lastSunday = $lastSunday->sub(new \DateInterval('P7D'));
            }
            $dowValue = 0b1 << (6 - (new \DateTime($value['completed_at']))->format('w'));
            $dowFrag = $dowFrag & ~ $dowValue;
            // 今週または、現在の曜日より新しい曜日を全て達成している場合のみカウント
            if($lastSunday->diff($this->systemClock->getLastSunday())->days == 0
                || (($dowFrag & ($dowValue - 1)) == 0)){
                $countDay++;
            }

        }
        return [$countDay,$countWeek];
    }

    private function calcInterval($habitRecords,$habitInterval){
        $count = 0;
        // 今日があるか
        $today = $this->systemClock->now();
        $prev = clone $today;
        foreach($habitRecords as $value){
            $next = new \DateTime($value['completed_at']);
            
            // 今日があるか
            $interval = $next->diff($today);
            if($interval->days == 0){
                $count = 1;
                $prev = $today;
                continue;
            }

            $interval = $next->diff($prev);
            if($interval->days != 0 && $interval->days <= $habitInterval){
                $count++;
            }else{
                break;
            }
            $prev = $next;
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
