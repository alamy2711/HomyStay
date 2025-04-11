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
    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'first_name' => 'required | string | min:3 | max:255',
            'last_name' => 'required | string | min:3 | max:255',
            'phone' => 'required | string | min:10 | max:15',
            'birthday' => 'required | date | date_format:DD/MM/YYYY',
            'email' => 'required | email | unique:users',
            'password' => 'required | string | min:6 | max:20 | confirmed',
            'role' => 'required | in:client, host',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
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
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required | email',
            'password' => 'required | string',
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

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
