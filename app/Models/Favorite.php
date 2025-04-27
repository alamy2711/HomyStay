<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = ['client_id', 'apartment_id'];


    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
