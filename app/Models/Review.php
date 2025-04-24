<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;


class Review extends Model
{
    use HasFactory;

    // Specify the table name, though it's optional if it matches the model name in plural form
    protected $table = 'reviews';

    // Define the fillable attributes to enable mass assignment
    protected $fillable = [
        'client_id',
        'apartment_id',
        'rating',
        'comment',
        'review_date',
    ];

    // Relationships

    // A review belongs to a client
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    // A review belongs to an apartment
    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }
}