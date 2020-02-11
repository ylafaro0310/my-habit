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
    Route::post('/', 'HabitsController@store');
    Route::patch('/{id}', 'HabitsController@update')->where('id', '[0-9]+');
    Route::delete('/{id}', 'HabitsController@destroy')->where('id', '[0-9]+');
});

Route::prefix('habits/records')->group(function () {
    Route::get('/', 'HabitRecordsController@index');
    Route::post('/', 'HabitRecordsController@store');
    Route::delete('/{id}', 'HabitRecordsController@destroy')->where('id', '[0-9]+');
});
