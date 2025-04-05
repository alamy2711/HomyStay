<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Photo extends Model
{
    use HasFactory;

    // Specify the table name if it's different from the model name
    protected $table = 'photos';

    // Specify the fields that can be mass-assigned
    protected $fillable = [
        'apartement_id',
        'title',
    ];

    // Define the relationship with the Apartement model
    public function apartement()
    {
        return $this->belongsTo(Apartement::class);
    }
}
