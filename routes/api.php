<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ResisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;

Route::post('/register', [RegisterController::class,'register']);

Route::middleware('auth:sanctum')->post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [LogoutController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user/profile', function (Request $request){
    return $request->user();
});