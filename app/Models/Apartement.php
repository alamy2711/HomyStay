<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Apartement extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'apartements';

    // Define the fillable properties to allow mass assignment
    protected $fillable = [
        'host_id',
        'title',
        'type',
        'description',
        'price',
        'room_nbr',
        'nbr_guests',
        'availability_calendar',
        'rating',
    ];

    // Specify that 'availability_calendar' should be cast as a JSON array
    protected $casts = [
        'availability_calendar' => 'array',
    ];

    // Relationships (for example, with the Host model)
    public function host()
    {
        return $this->belongsTo(Host::class, 'host_id');
    }

    public function location()
    {
        return $this->hasOne(Location::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class, 'apartement_id');
    }

    public function amenities()
    {
        return $this->hasMany(Amenity::class, 'apartement_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'apartement_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'apartement_id');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'apartement_id');
    }

    public function photos()
    {
        return $this->hasMany(Photo::class, 'apartement_id');
    }

}