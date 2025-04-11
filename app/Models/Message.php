<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = [
        'chat_id',
        'sender_id',
        'content',
        'is_readen',
    ];

    /**
     * Relationship with Chat model
     */
    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    /**
     * Relationship with User model (sender)
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

}
