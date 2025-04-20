<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    /// Allow mass assignment for these fields
    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];

    /**
     * Each report belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
