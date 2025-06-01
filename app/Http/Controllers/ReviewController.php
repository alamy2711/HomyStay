<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(ReviewRequest $request)
    {
        $data = $request->validated();

        if ($request->user()->role != 'client') {
            return response()->json([
                'message' => 'Unauthorized, you must be a client to submit a review'
            ], 403);
        }

        $review = Review::create([
            ...$data,
            'client_id' => $request->user()->id,
            'apartment_id' => $data['apartmentId']
        ]);

        // Recalculate average rating
        $apartment = $review->apartment;
        $average = $apartment->reviews()->avg('rating');
        $apartment->update(['rating' => $average]);

        return response()->json([
            'message' => 'Review submitted successfully',
            'review' => $review
        ], 201);
    }

    // Display all review for a certain apartment
    public function index($apartmentId)
    {
        $reviews = Review::with('client')->where('apartment_id', $apartmentId)->get();
        return response()->json($reviews);
    }
}
