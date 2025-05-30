<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'birthday',
        'gender',
        'profile_picture',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Delete the user's profile picture when the user is deleted.
     */
    protected static function booted()
    {
        static::deleting(function ($user) {
            $rawPath = $user->getRawOriginal('profile_picture');

            if ($rawPath && Storage::disk('public')->exists($rawPath)) {
                Storage::disk('public')->delete($rawPath);
            }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    // protected function casts(): array
    // {
    //     return [
    //         'email_verified_at' => 'datetime',
    //         'password' => 'hashed',
    //     ];
    // }

    public function getProfilePictureAttribute($value)
    {
        // if ($value) {
        //     return asset('storage/' . $value); // If user uploaded one
        // }
        if ($value) {
            // If it's a full URL (e.g., starts with http or https), return as is
            if (filter_var($value, FILTER_VALIDATE_URL)) {
                return $value;
            }

            // Otherwise, assume it's a local file in storage
            // return asset('storage/' . $value);
            return asset($value);
        }

        return env('FRONTEND_URL') . '/images/defaultPFP.png';
    }

    /**
     * Relationship: For host users – one host can have many apartments.
     */
    public function apartments()
    {
        return $this->hasMany(Apartment::class, 'host_id')
            ->select(['id', 'host_id', 'title', ]);
    }

    /**
     * Relationship: For client users – a client can make many reservations.
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'client_id');
    }

    /**
     * Relationship: For client users – a client has many favorites.
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'client_id');
    }


    public function reviews()
    {
        return $this->hasMany(Review::class, 'client_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'user_id');
    }
}
