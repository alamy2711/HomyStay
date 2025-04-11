<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Booking extends Model
{
    use HasFactory;

    // Specify the table name (optional if it follows naming conventions)
    protected $table = 'bookings';

    // Define fillable attributes for mass assignment
    protected $fillable = [
        'client_id',
        'apartement_id',
        'check_in_date',
        'check_out_date',
        'price',
        'booking_status',
    ];

    // Relationships

    // A booking belongs to a client
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    // A booking belongs to an apartment
    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartement_id');
    }
}
