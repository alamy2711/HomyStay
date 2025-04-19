<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAdminRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        try {
            $user = User::create([
                'first_name' => $data['firstName'],
                'last_name' => $data['lastName'],
                'phone' => $data['phone'],
                'birthday' => $data['birthday'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'role' => $data['role'],
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201); // 201 : Created : The server acknowledged a newly created resource.
    }
    // public function createAdmin(CreateAdminRequest $request)
    // {
    //     $data = $request->validated();

    //     try {
    //         $user = User::create([
    //             'first_name' => $data['firstName'],
    //             'last_name' => $data['lastName'],
    //             'email' => $data['email'],
    //             'password' => bcrypt($data['password']),
    //             'role' => $data['role'],
    //         ]);
    //     } catch (\Exception $e) {
    //         return $e->getMessage();
    //     }

    //     return response()->json([
    //         'message' => 'User registered successfully',
    //         'user' => $user,
    //     ], 201); // 201 : Created : The server acknowledged a newly created resource.
    // }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        // Check if email exists
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'Authentication failed',
                'errors' => [
                    'email' => ['This email does not exist']
                ]
            ], 401); // 401 : Unauthorized : The client lacks the authorization needed to access the requested resource.
        }


        if (!Auth::attempt($credentials, $request->rememberMe)) {
            return response()->json([
                'message' => 'Authentication failed',
                'errors' => [
                    'password' => ['Incorrect password']
                ]
            ], 401); // 401 : Unauthorized : The client lacks the authorization needed to access the requested resource.
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user,
            'token' => $token,
        ], 200); // 200 : OK : The request succeeded.
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            $user->tokens()->delete();

            return response()->json([
                'message' => 'User logged out successfully',
            ], 200); // 200 : OK : The request succeeded.
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
