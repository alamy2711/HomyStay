<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Apartment;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Create a new reservation for the authenticated client.
     */
    public function store(ReservationRequest $request)
    {
        // $data = $request->validated();
        $data = $request;

        // Check if the client already has a pending reservation for the apartment
        $existingPendingReservation = Reservation::where('client_id', $request->user()->id)
            ->where('apartment_id', $data['apartment_id'])
            ->where('status', 'pending')
            ->exists();

        if ($existingPendingReservation) {
            return response()->json([
                'error' => 'You already have a pending reservation for this apartment.'
            ], 403);
        }

        // Check if the apartment is reserved
        $apartment = Apartment::find($data['apartment_id']);
        if ($apartment->status === 'reserved') {
            return response()->json([
                'error' => 'Apartment is already reserved.'
            ], 403);
        }


        // $data['client_id'] = $request->user()->id;
        // $reservation = Reservation::create($data);

        $reservation = Reservation::create([
            'apartment_id' => $data['apartment_id'],
            'client_id'    => $request->user()->id,
            'check_in'     => $data['check_in'],
            'check_out'    => $data['check_out'],
            'total_price'  => $data['total_price'],
        ]);

        return response()->json([
            'message'     => 'Reservation created successfully.',
            'reservation' => $reservation
        ], 201);
    }

    /**
     * Cancel an existing reservation.
     * Only the client who made the reservation can cancel it.
     */
    public function cancel(Request $request, Reservation $reservation)
    {
        if ($request->user()->id !== $reservation->client_id) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }
        $reservation->update(['status' => 'canceled']);
        return response()->json(['message' => 'Reservation canceled successfully.']);
    }

    /**
     * List reservations.
     * - Hosts see reservations for their apartments.
     * - Clients see their own reservations.
     * - Admins and super admins see all reservations.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role == 'host') {
            // Fetch reservations for apartments owned by the host.
            $reservations = Reservation::whereHas('apartment', function ($query) use ($user) {
                $query->where('host_id', $user->id);
            })->with('apartment.pictures', 'client')->get();
        } elseif ($user->role == 'client') {
            $reservations = Reservation::where('client_id', $user->id)->with('apartment.pictures')->get();
        } else {
            $reservations = Reservation::with('apartment.pictures')->get();
        }

        // return response()->json($reservations);
        return ReservationResource::collection($reservations);
    }

    /**
     * For a host to update the reservation status (accept or reject a reservation).
     */
    // public function updateStatus(Request $request, Reservation $reservation)
    // {
    //     $request->validate([
    //         'status' => 'required|in:accepted,rejected'
    //     ]);

    //     if ($request->user()->id !== $reservation->apartment->host_id) {
    //         return response()->json(['error' => 'Unauthorized.'], 403);
    //     }
    //     $reservation->update(['status' => $request->status]);
    //     return response()->json([
    //         'message'     => 'Reservation status updated successfully.',
    //         'reservation' => $reservation
    //     ]);
    // }
    public function updateStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected,canceled'
        ]);

        // Ensure the user is the host of the apartment
        if ($request->user()->id !== $reservation->apartment->host_id) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        // Accept canceled status only when the reservation status is accepted
        if ($request->status === 'canceled' && $reservation->status !== 'accepted') {
            return response()->json(['error' => 'You cannot cancel a reservation that is not accepted.'], 400);
        }

        // Update the reservation status
        $reservation->update(['status' => $request->status]);

        if ($request->status === 'accepted') {
            // Update the apartment's status to "reserved"
            $reservation->apartment->update(['status' => 'reserved']);

            // Reject all other reservations for the same apartment
            Reservation::where('apartment_id', $reservation->apartment->id)
                ->where('id', '!=', $reservation->id) // Exclude the accepted reservation
                ->where('status', 'pending')
                ->update(['status' => 'rejected']);
        } elseif ($request->status === 'canceled') {
            // Update the apartment's status to "available"
            $reservation->apartment->update(['status' => 'available']);
        }

        return response()->json([
            'message'     => 'Reservation status updated successfully.',
            'reservation' => $reservation
        ]);
    }
}


