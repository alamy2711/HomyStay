<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;


class Chat extends Model
{
    use HasFactory;

    protected $table = 'chats';

    protected $fillable = [
        'client_id',
        'host_id',
    ];

    /**
     * Relationship with Client model
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Relationship with Host model
     */
    public function host()
    {
        return $this->belongsTo(Host::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'message_id');
    }
}
