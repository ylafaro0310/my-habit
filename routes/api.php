<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('habits')->group(function () {
    Route::get('/', 'HabitsController@index');
    Route::get('/{id}', 'HabitsController@show')->where('id', '[0-9]+');
    Route::post('/', 'HabitsController@store');
    Route::patch('/{id}', 'HabitsController@update')->where('id', '[0-9]+');
    Route::delete('/{id}', 'HabitsController@destroy')->where('id', '[0-9]+');
    
    Route::get('/{id}/sessions', 'HabitSessionsController@show')->where('id', '[0-9]+');
});

Route::prefix('habits/records')->group(function () {
    Route::get('/', 'HabitRecordsController@index');
    Route::post('/', 'HabitRecordsController@store');
    Route::delete('/', 'HabitRecordsController@destroy');
});

Route::prefix('habits/sessions')->group(function () {
    Route::get('/', 'HabitSessionsController@index');
    Route::post('/', 'HabitSessionsController@store');
    Route::patch('/{id}', 'HabitSessionsController@update')->where('id', '[0-9]+');
    Route::delete('/{id}', 'HabitSessionsController@destroy')->where('id', '[0-9]+');
});
