<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;


class Room extends Model
{
    use HasFactory;

    // Specify the fillable fields
    protected $fillable = [
        'apartement_id', 
        'room_type', 
        'room_size'
    ];

    /**
     * Define the relationship with the Apartment model.
     */
    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartement_id');
    }
}

