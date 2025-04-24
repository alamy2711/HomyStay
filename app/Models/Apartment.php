<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Apartment extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'apartments';

    // Define the fillable properties to allow mass assignment
    protected $fillable = [
        'host_id',
        'title',
        'type',
        'description',
        'price',
        'address',
        'nbr_room',
        'nbr_bed',
        'nbr_bathroom',
        'nbr_guest',
        'check-in',
        'check-out',
        'status',
        'rating',
    ];

    // Relationships (for example, with the Host model)
    public function host()
    {
        return $this->belongsTo(Host::class, 'host_id');
    }

    public function amenities()
    {
        return $this->hasMany(Amenity::class, 'apartment_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'apartment_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'apartment_id');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'apartment_id');
    }

    public function photos()
    {
        return $this->hasMany(Photo::class, 'apartment_id');
    }

}