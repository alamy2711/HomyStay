<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request){
        $request->validate(['email' => 'required | email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $statut === Password::RESET_LINK_SENT 
        ?
        response()->json(['message' => 'Link send to address mail.']) 
        :
        response()->json(['message' => 'Erreur'], 400);
    }
}
