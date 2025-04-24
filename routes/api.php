<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Fondation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\ResisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\ApartmentController;


// REGISTER + LOGIN + LOGOUT 
Route::post('/register', [RegisterController::class,'register']);

Route::middleware('auth:sanctum')->post('/login', [RegisterController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [RegisterController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user/profile', function (Request $request){
    return $request->user();
});

// MAIL VERIFICATION 
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request){
    $request->fulfill();
    return response()->json(['message' => 'Email verified']);
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function(Request $request){
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'verifiaction link has been send']);
})->middleware(['auth:sanctum', 'throttle:6,1']);

// FORGOT PASSWORD + RESET PASSWORD
Route::post('/forget-password', [ForgotPasswordController::class, 'sendResetLink']);

Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

// APARTEMENTS CRUD
Route::get('/apartments', [ApartmentController::class, 'index']);
//create Route
Route::post('/apartments', [ApartmentController::class, 'store']);
Route::get('/apartments/{id}', [ApartmentController::class, 'show']);
Route::get('/apartments/{id}/edit', [ApartmentController::class, 'edit']);
Route::put('/apartment/{id}', [ApartmentController::class, 'update']);
Route::delete('/apartment/{id}', [ApartmentController::class, 'destroy']);