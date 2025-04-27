<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApartmentResource;
use App\Http\Resources\FavoriteResource;
use App\Models\Apartment;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $favoritedApartments = Apartment::whereHas('favorites', function ($query) use ($user) {
            $query->where('client_id', $user->id);
        })
            ->with('pictures', 'amenities')
            ->get();

        return ApartmentResource::collection($favoritedApartments);
    }

    public function store(Request $request)
    {
        $data = $request;

        // Ensure client cannot favorite an apartment they already have favorited
        $existingFavorite = Favorite::where('client_id', $request->user()->id)
            ->where('apartment_id', $data['apartmentId'])
            ->first();

        if ($existingFavorite) {
            return response()->json(['message' => 'You have already favorited this apartment.'], 400);
        }

        $favorite = Favorite::create([
            'client_id' => $request->user()->id,
            'apartment_id' => $data['apartmentId'],
        ]);

        return response()->json([
            'message' => 'Favorite added successfully.',
            'favorite' => $favorite
        ], 201);
    }

    public function destroy(Request $request, $apartmentId)
    {
        $favorite = Favorite::where('client_id', $request->user()->id)
            ->where('apartment_id', $apartmentId)
            ->first();

        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found.'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Favorite deleted successfully.']);
    }
}
