<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;

/*
Route::get('/login', function () {
    return view('login');
})->name('login');
*/

Route::fallback(function () {
    return file_get_contents(public_path("index.html"));
})->middleware('auth');

Auth::routes();