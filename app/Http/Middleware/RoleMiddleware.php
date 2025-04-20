<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * Accepts one or more roles as additional parameters.
     *
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        // If no user present, return unauthorized.
        if (!$user) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }

        // Check if the user's role is among the allowed roles.
        if (!in_array($user->role, $roles)) {
            return response()->json(['error' => 'Forbidden. You do not have permission.'], 403);
        }
        
        return $next($request);
    }
}
