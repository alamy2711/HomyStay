<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = ['apartment_id', 'name'];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    
}
