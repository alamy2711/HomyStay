<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AmenityResource extends JsonResource
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
            'status' => $this->status,
            'rating' => $this->rating,

            'pictures' => PictureResource::collection($this->whenLoaded('pictures')),
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
        ];
    }
}
