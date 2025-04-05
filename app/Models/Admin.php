<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'user_name',
        'password',
        'type',
    ];

    /**
     * The attributes that should be hidden for arrays or JSON responses.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'admin_id');
    }
}