<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    /// Allow mass assignment for these fields
    protected $fillable = [
        'host_id',
        'title',
        'description',
        'price',
        'rating',
        'status',

        'type',
        'rooms',
        'bathrooms',
        'beds',
        'guests',
        'area',

        'country',
        'city',
        'address',

        'check_in',
        'check_out',
    ];

    /**
     * Each apartment belongs to a host.
     */
    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    /**
     * An apartment can be reserved many times.
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * An apartment can be favorited by many clients.
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
