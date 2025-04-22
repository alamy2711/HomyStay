<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function getAuthenticatedUser(Request $request)
    {
        $user = $request->user();

        // Load relationships based on role
        if ($user->role === 'client') {
            $user->load(['reports']);
        } elseif ($user->role === 'host') {
            $user->load(['apartments', 'reports']);
        }

        return new UserResource($user);
    }

    /**
     * Update the authenticated user's profile.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateUserRequest $request)
    {
        try {
            $user = $request->user();

            $user->first_name = $request->input('firstName');
            $user->last_name  = $request->input('lastName');
            $user->birthday = $request->input('birthday');
            $user->gender   = $request->input('gender');
            $user->phone    = $request->input('phone');

            // Process the profile picture if provided.
            if ($request->hasFile('profilePicture')) {
                // Delete old profile picture before saving new one
                $rawPath = $user->getRawOriginal('profile_picture');
                if ($rawPath && Storage::disk('public')->exists($rawPath)) {
                    Storage::disk('public')->delete($rawPath);
                }

                $file = $request->file('profilePicture');
                $filename = time() . '_' . $file->getClientOriginalName(); // Create a unique file name.
                $path = $file->storeAs('profile_pictures', $filename, 'public'); // Store the file in the "public/profile_pictures" directory.
                $user->profile_picture = "storage/" . $path;
            }

            $user->save();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update profile',
                'error'   => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'user'    => $user,
        ]);
    }
}
