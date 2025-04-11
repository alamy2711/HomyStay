<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Fondation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\ResisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;



Route::post('/register', [RegisterController::class,'register']);

Route::middleware('auth:sanctum')->post('/login', [RegisterController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [RegisterController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user/profile', function (Request $request){
    return $request->user();
});

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request){
    $request->fulfill();
    return response()->json(['message' => 'Email verified']);
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function(Request $request){
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'verifiaction link has been send']);
})->middleware(['auth:sanctum', 'throttle:6,1']);

Route::post('/forget-password', [ForgotPasswordController::class, 'sendResetLink']);

Route::post('/reset-password', [ResetPasswordController::class, 'reset']);