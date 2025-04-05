<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    use HasFactory;

    protected $table = 'amenities';

    // Specify the fillable fields
    protected $fillable = [
        'apartement_id', 
        'amenity_type'
    ];

    /**
     * Define the relationship with the Apartment model.
     */
    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartement_id');
    }
}

