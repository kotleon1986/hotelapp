<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Booking
 *
 * @property int $id
 * @property int|null $user_id
 * @property int $room_id
 * @property string|null $full_name
 * @property string|null $email
 * @property string|null $phone
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property int $total_nights
 * @property float $total_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Room $room
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereTotalNights($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Booking whereUserId($value)
 * @mixin \Eloquent
 */
class Booking extends Model
{
    protected $fillable = ['full_name', 'email', 'start_date', 'end_date', 'total_nights', 'total_price'];

    protected $dates = ['start_date', 'end_date', 'created_at', 'updated_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
