<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ApartmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'host_id' => $this->host_id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'status' => $this->status,
            'rating' => $this->rating,

            'type' => $this->type,
            'rooms' => $this->rooms,
            'bathrooms' => $this->bathrooms,
            'beds' => $this->beds,
            'guests' => $this->guests,
            'area' => $this->area,

            'country' => $this->country,
            'city' => $this->city,
            'address' => $this->address,

            'check_in' => $this->check_in,
            'check_out' => $this->check_out,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'pictures' => PictureResource::collection($this->whenLoaded('pictures')),
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
            'host' => $this->host,
            // 'host' => new UserResource($this->whenLoaded('host')),

            // Add isFavorite field based on whether the apartment is favorited by the user
            'isFavorite' => $request->user()
                ? $this->favorites->contains('client_id', $request->user()->id)
                : false,


        ];
    }
}
