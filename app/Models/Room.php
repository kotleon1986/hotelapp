<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Room
 *
 * @property int $id
 * @property string $name
 * @property int $hotel_id
 * @property int $room_type_id
 * @property string $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Hotel $hotel
 * @property-read \App\Models\RoomType $type
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereHotelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereRoomCapacityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereRoomTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Room whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Room extends Model
{
    protected $fillable = ['name', 'image'];
    
    protected $dates = ['created_at', 'updated_at'];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotel_id');
    }

    public function type()
    {
        return $this->belongsTo(RoomType::class, 'room_type_id');
    }

}
