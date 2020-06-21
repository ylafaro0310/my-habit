<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\Models\Habits;
use App\Models\HabitRecords;
use App\Utils\Util;

class HabitsController extends Controller
{
    function __construct(Habits $habits, HabitRecords $habitRecords){
        $this->habits = $habits;
        $this->habitRecords = $habitRecords;
        $this->pdo = DB::connection()->getPdo();
    }

    private function createResponse(){
        $userId = Auth::id();
        $habits = $this->habits->where(['user_id'=>$userId])->select();
        $response = [
            'habits' => $habits,
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
    public function store(Request $request)
    {
        $userId = Auth::id();
        $params = $request->all();
        $params['userId'] = $userId;
        $params = Util::snakeArray($params);
        try{
            $this->pdo->beginTransaction();
            $this->habits->store($params);
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
        $userId = Auth::id();
        $response = $this->habits->where(['id'=>$id,'user_id'=>$userId])->first();
        $response = Util::camelArray($response);
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
        $userId = Auth::id();
        $params = $request->all();
        $params = Util::snakeArray($params);
        try{
            $this->pdo->beginTransaction();
            $this->habits->where(['id'=>$id,'user_id'=>$userId])->update($params);
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
        if(!$this->habits->where(['id'=>$id])->exists()){
            abort(400,'Invalid parameter specified');
        }
        try{
            $this->pdo->beginTransaction();
            $this->habits->where(['id'=>$id])->delete();
            $this->habitRecords->where(['habit_id'=>$id])->delete();
            $this->pdo->commit();
            $response = $this->createResponse();
            return json_encode($response);
        }catch(Exception $e){
            $this->pdo->rollback();
            Log::error('Transaction Error: '.$e->getMessage());
        }

    }
}
