<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * The output depends on the user role. For clients, we include favorites and reservations.
     * For hosts, we include apartments and reservations. For admins, only basic attributes are sent.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Basic user attributes common to every role.
        $data = [
            'id'         => $this->id,
            'first_name' => $this->first_name,
            'last_name'  => $this->last_name,
            'email'      => $this->email,
            'phone'      => $this->phone,
            'birthday'   => $this->birthday,
            'gender'     => $this->gender,
            'profile_picture' => $this->profile_picture,
            'created_at'    => $this->created_at,
            'role'       => $this->role,
        ];

        // Conditional logic based on the user's role.
        if ($this->role === 'client') {
            // For Clients, include favorites and reservations.
            $data['reports'] = ReportResource::collection($this->whenLoaded('reports'));
            // $data['favorites']    = FavoriteResource::collection($this->whenLoaded('favorites'));
            // $data['reservations'] = ReservationResource::collection($this->whenLoaded('reservations'));
        } elseif ($this->role === 'host') {
            // For Hosts, include apartments and reservations.
            $data['apartments']   = ApartmentResource::collection($this->whenLoaded('apartments'));
            $data['reports'] = ReportResource::collection($this->whenLoaded('reports'));
            // $data['reservations'] = ReservationResource::collection($this->whenLoaded('reservations'));
        }
        // For Admin users, we return only the default attributes.

        return $data;
    }
}
