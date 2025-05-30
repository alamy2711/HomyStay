<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    protected $fillable = ['apartment_id', 'path'];
    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function getPathAttribute($value)
    {
        return asset($value);
    }
}
