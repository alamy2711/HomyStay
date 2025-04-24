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

class ApartmentController extends Controller
{
    public function index()
    {
        $apartments = Apartment::with(['pictures', 'amenities'])->get();

        return ApartmentResource::collection($apartments);
    }

    public function show(Apartment $apartment)
    {
        $apartment->load(['pictures', 'amenities', 'host']);

        return new ApartmentResource($apartment);
    }

    public function store(ApartmentRequest $request)
    {
        $data = $request->validated();

        // 1. Create Apartment
        $apartment = Apartment::create([
            ...$data,
            // 'user_id' => auth()->id(), // or pass user manually
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
