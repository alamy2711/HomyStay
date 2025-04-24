<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Client;
use App\Models\Host;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    //REGISTER
    public function register(RegisterUserRequest $request){

        $validated = $request->validated();

        if($validated->fails()){
            return response()->json($validated->errors(), 422);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'birthday' => $request->birthday,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        $user->sendEmailVerificationNotifications();

        if ($role === 'client') {
            $client = Client::create([
                'id_user' => $request->id_user,
            ]);
        }
        if ($role === 'host') {
            $host = Host::create([
                'id_user' => $request->id_user,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response->json([
            'message' => 'Inscription réussie',
            'user' => $user,
            'token' => $token,
        ], 201);
    }    

    //LOGIN
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $request->email)->first();

        //if(!$user || !Hash::check($request->password, $user->password)){
        //    return response()->json([
        //        'message' => 'Identifiants invalides'
        //    ], 401);
        //}

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'token' => $token
        ]);

    }

    //LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' =>'Déconnexion réussie'
        ]);
    }
}
