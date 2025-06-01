<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'apartment_id',
        'client_id',
        'rating',
        'comment',
    ];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id')->select(['id', 'first_name', 'last_name', 'profile_picture']);
    }
}
