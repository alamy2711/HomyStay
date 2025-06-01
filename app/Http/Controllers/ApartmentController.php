<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApartmentRequest;
use App\Http\Resources\ApartmentResource;
use App\Models\Amenity;
use App\Models\Apartment;
use App\Models\Picture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Stringable;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ApartmentController extends Controller
{
    public function index(Request $request)
    {
        $today = Carbon::today();

        // Automatically mark expired apartments
        Apartment::where('check_out', '<=', $today)
            ->where('status', '!=', 'expired')
            ->update(['status' => 'expired']);

        
        $apartments = Apartment::with(['pictures', 'amenities', 'favorites'])
            ->latest()
            ->paginate(9); // 9 apartments per page
        return response()->json([
            'data' => $apartments->items(), // just the apartments array
            'current_page' => $apartments->currentPage(),
            'last_page' => $apartments->lastPage(),
        ]);
    }

    // Fetch listings for a specific host
    public function hostIndex(Request $request)
    {
        $today = Carbon::today();

        // Automatically mark expired apartments
        Apartment::where('check_out', '<=', $today)
            ->where('status', '!=', 'expired')
            ->update(['status' => 'expired']);
        
        $user = $request->user();
        $apartments = Apartment::where('host_id', $user->id)
            ->with(['pictures', 'amenities', 'favorites'])
            ->get();

        return ApartmentResource::collection($apartments);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $apartments = Apartment::where('title', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->with(['pictures', 'amenities', 'favorites'])
            ->get();

        return ApartmentResource::collection($apartments);
    }

    public function show(Apartment $apartment)
    {
        $apartment->load(['pictures', 'amenities', 'host', 'favorites', 'reviews']);

        return new ApartmentResource($apartment);
    }

    public function store(ApartmentRequest $request)
    {
        $data = $request->validated();

        // 1. Create Apartment
        $apartment = Apartment::create([
            ...$data,
            'host_id' => $request->user()->id,
        ]);

        // 2. Store Images
        foreach ($request->file('images') as $image) {

            $filename = uniqid('', true) . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('apartments', $filename, 'public');

            Picture::create([
                'apartment_id' => $apartment->id,
                'path' => 'storage/' . $path,
            ]);
        }

        // 3. Store Amenities
        if (!empty($data['amenities'])) {
            foreach ($data['amenities'] as $amenity) {
                Amenity::create([
                    'apartment_id' => $apartment->id,
                    'name' => $amenity,
                ]);
            }
        }

        return response()->json(['message' => 'Apartment created', 'apartment' => $apartment], 201);
    }

    public function update(ApartmentRequest $request, Apartment $apartment)
    {
        // Cannot update if apartment status is reserved
        if ($apartment->status === 'reserved') {
            return response()->json(['message' => 'Cannot update reserved apartment'], 403);
        }

        $data = $request->validated();

        // Update basic info
        $apartment->update($data);

        // Handle existing images
        $existingImagePaths = $request->input('existingImages', []);
        $remainingImages = collect($apartment->pictures)
            ->filter(function ($picture) use ($existingImagePaths) {
                return in_array($picture->path, $existingImagePaths);
            });

        // Remove images that are not included in `existingImages`
        $apartment->pictures
            ->diff($remainingImages)
            ->each(function ($picture) {
                $relativePath = Str::after($picture->path, 'storage/');
                Storage::disk('public')->delete($relativePath);
                $picture->delete();
            });

        // Handle new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('apartments', $filename, 'public');

                Picture::create([
                    'apartment_id' => $apartment->id,
                    'path' => 'storage/' . $path,
                ]);
            }
        }

        // Replace amenities
        $apartment->amenities()->delete();

        if (!empty($data['amenities'])) {
            foreach ($data['amenities'] as $amenity) {
                Amenity::create([
                    'apartment_id' => $apartment->id,
                    'name' => $amenity,
                ]);
            }
        }

        return response()->json(['message' => 'Apartment updated', 'apartment' => $apartment]);
    }

    public function destroy($id)
    {
        // Find the apartment by ID
        $apartment = Apartment::findOrFail($id);

        // First, delete images from storage
        $apartment->pictures->each(function ($picture) {
            // Delete the image file from storage
            $relativePath = Str::after($picture->path, 'storage/');
            Storage::disk('public')->delete($relativePath);

            // Delete the image record from the database
            $picture->delete();
        });

        // Now delete the apartment itself
        $apartment->delete();

        // Return a success response
        return response()->json(['message' => 'Apartment and associated images deleted successfully']);
    }
}
