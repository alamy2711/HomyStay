<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Apartment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\NotificationController;

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
        // Check if the apartment is expired
        if ($apartment->status === 'expired') {
            return response()->json([
                'error' => 'Apartment is expired.'
            ]);
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

        $notificationController = new NotificationController();
        $content = "You have a new reservation request from \"" . $request->user()->first_name . " " . $request->user()->last_name . "\" for your apartment: \"" . $apartment->title . "\" from " . $data['check_in'] . " to " . $data['check_out'];
        $notificationController->sendNotification('request', 'New request', $content, $apartment->host_id, $request->user()->id);

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

        // Can only cancel reservations that are still pending
        if ($reservation->status !== 'pending') {
            return response()->json(['error' => 'You can only cancel a reservation that is still pending.'], 400);
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
            })->where('visible_to_host', true)
                ->with('apartment.pictures', 'client')
                ->get();
        } elseif ($user->role == 'client') {
            $reservations = Reservation::where('client_id', $user->id)
                ->where('visible_to_client', true)
                ->with('apartment.pictures', 'apartment.host')
                ->get();
        } else {
            $reservations = Reservation::with('apartment.pictures')->get();
        }

        // return response()->json($reservations);
        return ReservationResource::collection($reservations);
    }

    /**
     * For a host to update the reservation status (accept or reject a reservation).
     */
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

        // Accept and Reject only when the reservation status is pending
        if ($request->status === 'accepted' && $reservation->status !== 'pending') {
            return response()->json(['error' => 'You cannot accept a reservation that is not pending.'], 400);
        }

        if ($request->status === 'rejected' && $reservation->status !== 'pending') {
            return response()->json(['error' => 'You cannot reject a reservation that is not pending.'], 400);
        }

        // Update the reservation status
        $reservation->update(['status' => $request->status]);
        $notificationController = new NotificationController();

        if ($request->status === 'accepted') {
            // Update the apartment's status to "reserved"
            $reservation->apartment->update(['status' => 'reserved']);

            // Send notification to client
            $content = "Your reservation for \"" . $reservation->apartment->title . "\" from " . $reservation->check_in . " to " . $reservation->check_out . " has been accepted.";
            $notificationController->sendNotification('reservation', 'Reservation accepted', $content, $reservation->client_id, $reservation->apartment->host_id);

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


    public function destroy(Request $request, Reservation $reservation)
    {
        $user = $request->user();

        if ($user->role == 'host') {
            // Hide reservation for host
            $reservation->update(['visible_to_host' => false]);
        } elseif ($user->role == 'client') {
            // Hide reservation for client
            $reservation->update(['visible_to_client' => false]);
        } else {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        // After hiding, check if both host and client hid it
        if (!$reservation->visible_to_host && !$reservation->visible_to_client) {
            $reservation->delete();
            return response()->json(['message' => 'Reservation deleted successfully.']);
        }

        return response()->json(['message' => 'Reservation hidden successfully.']);
    }
}
