<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'apartment_id',
        'client_id',
        'status',
        'check_in',
        'check_out',
        'total_price'
    ];

    /**
     * Each reservation is linked to an apartment.
     */
    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    /**
     * Each reservation belongs to the client who made it.
     */
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
