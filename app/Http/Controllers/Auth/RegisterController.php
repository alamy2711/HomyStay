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
    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'first_name' => 'required | string',
            'last_name' => 'required | string',
            'phone' => 'required | string',
            'birthday' => 'required | date',
            'email' => 'required | email | unique:users',
            'password' => 'required | string | min:6',
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
        
        return response->json([
            'message' => 'Inscription réussie',
            'user' => $user
        ], 201);
    }    
}
