<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Mockery\Matcher\Not;

// Public endpoints: Login and registration.
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

// Apartment endpoints: viewing available apartments.
Route::middleware('auth.optional:sanctum')->group(function () {
    // Publicly accessible endpoints with optional authentication
    Route::get('/apartments', [ApartmentController::class, 'index']);
    Route::get('/apartments/search', [ApartmentController::class, 'search']);
    Route::get('/apartments/{apartment}', [ApartmentController::class, 'show']);
    Route::get('/reviews/{apartment}', [ReviewController::class, 'index']);
});


// Protected routes using sanctum authentication.
Route::middleware('auth:sanctum')->group(function () {
    // Protected endpoints: User details and logout.
    Route::get('/user', [UserController::class, 'getAuthenticatedUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // User endpoints.
    Route::post('/profile/update', [UserController::class, 'update']);
    Route::delete('/profile/delete', [UserController::class, 'destroy']);
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy']);
    Route::post('/notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);

    // Routes for "host" role: managing apartment listings.
    Route::middleware('role:host')->group(function () {
        Route::get('/listings', [ApartmentController::class, 'hostIndex']);
        Route::post('/apartments', [ApartmentController::class, 'store']);
        Route::post('/apartments/{apartment}', [ApartmentController::class, 'update']);
        Route::delete('/apartments/{apartment}', [ApartmentController::class, 'destroy']);
    });

    // Reservation endpoints.
    // Only clients and hosts roles can list reservations.
    Route::middleware('role:client,host')->group(function () {
        Route::middleware('role:client')->get('/reservations', [ReservationController::class, 'index']);
        Route::middleware('role:host')->get('/requests', [ReservationController::class, 'index']);
        // Only clients can create a reservation.
        Route::middleware('role:client')->post('/reservations', [ReservationController::class, 'store']);
        // Only clients can cancel their reservations.
        Route::middleware('role:client')->put('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);
        // Hosts update reservation status (accept/reject/cancel after accepting).
        Route::middleware('role:host')->put('/requests/{reservation}/status', [ReservationController::class, 'updateStatus']);

        Route::middleware('role:client')->delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);
        Route::middleware('role:host')->delete('/requests/{reservation}', [ReservationController::class, 'destroy']);
    });

    // Client endpoints.
    Route::middleware('role:client')->group(function () {
        // Favorite endpoints.
        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites', [FavoriteController::class, 'store']);
        Route::delete('/favorites/{favorite}', [FavoriteController::class, 'destroy']);
        // Review endpoints.
        Route::post('/reviews', [ReviewController::class, 'store']);

    });

    // Admin endpoints.
    Route::middleware('role:admin,super_admin')->group(function () {
        Route::get('/admin/users', [AdminController::class, 'showUsers']);
        Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser']);
        Route::delete('/admin/apartments/{apartment}', [AdminController::class, 'deleteApartment']);
        Route::post('/admin/notify', [AdminController::class, 'notifyUsers']);

        Route::delete('/apartments/{apartment}', [ApartmentController::class, 'destroy']);
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