<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Habits;

class HabitsController extends Controller
{
    function __construct(Habits $habits){
        $this->habits = $habits;
        $this->pdo = DB::connection()->getPdo();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return json_encode($this->habits->index());
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
            $this->habits->store($params);
            $this->pdo->commit();
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
        $params = $request->all();
        try{
            $this->pdo->beginTransaction();
            $this->habits->update($id,$params);
            $this->pdo->commit();
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
        try{
            $this->pdo->beginTransaction();
            $this->habits->destroy($id);
            $this->pdo->commit();
        }catch(Exception $e){
            $this->pdo->rollback();
            Log::error('Transaction Error: '.$e->getMessage());
        }

    }
}
