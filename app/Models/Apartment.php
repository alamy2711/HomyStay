<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Apartment extends Model
{
    use HasFactory;
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
        return $this->belongsTo(User::class, 'host_id')
            ->select(['id', 'first_name', 'last_name', 'profile_picture']);
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
        return $this->hasMany(Favorite::class)
            ->select(['id', 'client_id', 'apartment_id']);
    }

    public function amenities()
    {
        return $this->hasMany(Amenity::class)
            ->select(['id', 'apartment_id', 'name']);
    }

    public function pictures()
    {
        return $this->hasMany(Picture::class)
            ->select(['id', 'apartment_id', 'path']);
    }

    public function reviews() {
        return $this->hasMany(Review::class)
            ->select(['id', 'apartment_id', 'client_id', 'rating', 'comment']);
    }

    /**
     * Delete the apartment's images when the apartment is deleted.
     */
    protected static function booted()
    {
        static::deleted(function ($apartment) {
            // Delete the images from the storage
            $apartment->pictures->each(function ($picture) {
                // Delete the image file from storage
                $relativePath = Str::after($picture->path, 'storage/');
                Storage::disk('public')->delete($relativePath);
                // Delete the image record from the database
                $picture->delete();
            });
        });
    }
}
