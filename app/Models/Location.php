<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Location extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'locations';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'apartment_id',
        'country',
        'city',
        'code_postal',
        'street',
        'floor',
        'apartement_nmbr',
        'latitude',
        'longitude',
    ];

    // Define relationships (e.g., with the Apartment model)
    public function apartment()
    {
        return $this->belongsTo(Appartement::class);
    }
}