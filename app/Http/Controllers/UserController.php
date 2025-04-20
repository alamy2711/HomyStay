<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * We eager load all potential relationships so that the Resource can return the
     * correct relationships based on each user’s role.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    // public function index()
    // {
    //     $users = User::with(['apartments', 'reports'])->get();

    //     // return response()->json($users);

    //     // Return the user resource collection.
    //     return UserResource::collection($users);
    // }
}
