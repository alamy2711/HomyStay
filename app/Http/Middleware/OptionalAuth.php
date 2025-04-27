<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class OptionalAuth
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Attempt to authenticate the user, but do not require it
        Auth::shouldUse('sanctum');
        if ($request->bearerToken()) {
            Auth::authenticate();
        }

        return $next($request);
    }
}
