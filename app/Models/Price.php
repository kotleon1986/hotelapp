<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Price
 *
 * @property int $id
 * @property string|null $weekday
 * @property string|null $dynamic_start_date
 * @property string|null $dynamic_end_date
 * @property float $price
 * @property int|null $room_type_id
 * @property int|null $room_capacity_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereDynamicEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereDynamicStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereRoomCapacityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereRoomTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Price whereWeekday($value)
 * @mixin \Eloquent
 * @property-read \App\Models\RoomType|null $room_type
 */
class Price extends Model
{
    protected $fillable = ['weekday', 'price'];

    protected $dates = ['created_at', 'updated_at'];

    public function room_type()
    {
        return $this->belongsTo(RoomType::class, 'room_type_id');
    }
}
