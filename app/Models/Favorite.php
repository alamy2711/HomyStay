<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Favorite extends Model
{
    use HasFactory;

    // Specify the table name (optional if it matches the naming convention)
    protected $table = 'favorites';

    // Define fillable attributes for mass assignment
    protected $fillable = [
        'client_id',
        'apartment_id',
    ];

    // Relationships

    // A favorite belongs to a client
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    // A favorite belongs to an apartment
    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }
}