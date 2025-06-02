<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'type',
        'subject',
        'content',
        'sender_id',
        'receiver_id',
        'is_seen'
    ];

    /**
     * The sender of the notification (nullable for system-generated alerts).
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * The receiver of the notification.
     */
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
