<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Habits;
use App\Models\HabitSessions;
use App\Utils\Util;

class HabitSessionsController extends Controller
{
    function __construct(Habits $habits,HabitSessions $habitSessions){
        $this->habits = $habits;
        $this->habitSessions = $habitSessions;
        $this->pdo = DB::connection()->getPdo();
    }

    private function createResponse($habitId = null){
        $habits = $this->habits->select();
        if(empty($habitId)){
            $habitSessions = $this->habitSessions->select();
        }else{
            $habitSessions = $this->habitSessions->where(['habit_id'=>$habitId])->select();
        }
        $response = [
            'habits' => $habits,
            'habitSessions' => $habitSessions,
        ];
        return Util::camelArray($response);
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
    public function store(Request $request,$habitId)
    {
        $params = $request->all();
        $params['habitId'] = $habitId;
        unset($params['id']);
        $params = Util::snakeArray($params);
        try{
            $this->pdo->beginTransaction();
            $this->habitSessions->store($params);
            $this->pdo->commit();
            $response = $this->createResponse();
            return json_encode($response);
        }catch(Exception $e){
            $this->pdo->rollback();
            Log::error('Transaction Error: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $response = $this->createResponse($id);
        return json_encode($response);
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
        $params = $request->all();
        $params = Util::snakeArray($params);
        try{
            $this->pdo->beginTransaction();
            $this->habitSessions->where(['id'=>$id])->update($params);
            $this->pdo->commit();
            $response = $this->createResponse();
            return json_encode($response);
        }catch(Exception $e){
            $this->pdo->rollback();
            Log::error('Transaction Error: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(!$this->habitSessions->where(['id'=>$id])->exists()){
            abort(400,'Invalid parameter specified');
        }
        try{
            $this->pdo->beginTransaction();
            $this->habitSessions->where(['id'=>$id])->delete();
            $this->pdo->commit();
            $response = $this->createResponse();
            return json_encode($response);
        }catch(Exception $e){
            $this->pdo->rollback();
            Log::error('Transaction Error: '.$e->getMessage());
        }
    }
}
