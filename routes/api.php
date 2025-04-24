<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





// Public endpoints: Login and registration.
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

// Apartment endpoints: viewing available apartments.
Route::get('/apartments', [ApartmentController::class, 'index']);
Route::get('/apartments/{apartment}', [ApartmentController::class, 'show']);

// Protected routes using sanctum authentication.
Route::middleware('auth:sanctum')->group(function () {
    // Protected endpoints: User details and logout.
    Route::get('/user', [UserController::class, 'getAuthenticatedUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // User endpoints.
    Route::post('/profile/update', [UserController::class, 'update']);
    Route::delete('/profile/delete', [UserController::class, 'destroy']);

    // Routes for "host" role: managing apartment listings.
    // Route::middleware('role:host')->group(function () {
    //     Route::get('/listings', [ApartmentController::class, 'index']);
        Route::post('/apartments', [ApartmentController::class, 'store']);
        Route::post('/apartments/{apartment}', [ApartmentController::class, 'update']);
        Route::delete('/apartments/{apartment}', [ApartmentController::class, 'destroy']);
    // });

    // Reservation endpoints.
    // Only clients and hosts roles can list reservations.
    // Route::middleware('role:client,host')->group(function () {
    //     Route::get('/reservations', [ReservationController::class, 'index']);
    //     Route::get('/requests', [ReservationController::class, 'index']);
    //     // Only clients can create a reservation.
    //     Route::middleware('role:client')->post('/reservations', [ReservationController::class, 'store']);
    //     // Only clients can cancel their reservations.
    //     Route::middleware('role:client')->delete('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);
    //     // Hosts update reservation status (accept/reject).
    //     Route::middleware('role:host')->put('/requests/{reservation}/status', [ReservationController::class, 'updateStatus']);
    // });

    // Admin endpoints.
    Route::middleware('role:admin,super_admin')->group(function () {
        Route::get('/admin/users', [AdminController::class, 'showUsers']);
        Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser']);
        Route::delete('/admin/apartments/{apartment}', [AdminController::class, 'deleteApartment']);
        Route::post('/admin/notify', [AdminController::class, 'notifyUsers']);
    });

    // Super Admin endpoints for managing admins.
    Route::middleware('role:super_admin')->group(function () {
        Route::post('/super-admin/create-admin', [AdminController::class, 'createAdmin']);
        Route::delete('/super-admin/delete-admin/{admin}', [AdminController::class, 'deleteAdmin']);
    });
});


// Route::group(['prefix' => 'sanctum'], function () {
//     Route::get('/csrf-cookie', function () {
//         return response()->noContent();
//     });
// });