<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // GET /api/users
    public function index()
    {

        $users = User::with(['apartments'])->get();

        return response()->json($users);
    }
}
