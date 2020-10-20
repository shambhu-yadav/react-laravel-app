<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post("user-signup", "UserController@userSignUp");

Route::post("user-login", "UserController@userLogin");

Route::get("user/{email}", "UserController@userDetail");

Route::get("users", "UserController@all");

Route::post("deleteuser/{id}", "UserController@delete"); 

Route::get("edit-data/{id}", "UserController@edit_data"); 

Route::post("save-data/{id}", "UserController@save_data"); 


