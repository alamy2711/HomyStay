<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAdminRequest;
use App\Models\Apartment;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Delete a user.
     * Admins cannot delete other admins or super admins.
     */
    public function deleteUser(Request $request, User $user)
    {
        if (in_array($user->role, ['admin', 'super_admin'])) {
            return response()->json(['error' => 'You cannot delete this user.'], 403);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully.']);
    }

    /**
     * Delete an apartment.
     * Admin can delete any apartment regardless of the owner.
     */
    public function deleteApartment(Request $request, Apartment $apartment)
    {
        $apartment->delete();
        return response()->json(['message' => 'Apartment deleted successfully by admin.']);
    }

    /**
     * Send notifications to users.
     * This example expects a message and would typically use Laravel Notifications.
     */
    public function notifyUsers(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);
        // Add notification logic – for example, dispatch a job or use Notification facade.
        return response()->json(['message' => 'Users notified successfully.']);
    }

    /**
     * Create a new admin account.
     * Accessible only to a user with the super_admin role.
     */
    public function createAdmin(CreateAdminRequest $request)
    {
        $data = $request->validated();
        // $data['password'] = bcrypt($data['password']);
        // $data['role']     = 'admin';

        try {
            $user = User::create([
                    'first_name' => $data['firstName'],
                    'last_name' => $data['lastName'],
                    'email' => $data['email'],
                    'password' => bcrypt($data['password']),
                    'role' => $data['role'],
                ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
        return response()->json([
            'message' => 'Admin created successfully.',
            'admin'   => $user
        ], 201);
    }

    /**
     * Delete an admin account.
     * Only the super admin can perform this action.
     */
    public function deleteAdmin(Request $request, User $admin)
    {
        if ($admin->role !== 'admin') {
            return response()->json(['error' => 'Provided user is not an admin.'], 400);
        }
        $admin->delete();
        return response()->json(['message' => 'Admin deleted successfully.']);
    }
}
