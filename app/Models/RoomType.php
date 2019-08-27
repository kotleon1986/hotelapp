<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\RoomType
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\RoomType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\RoomType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\RoomType query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\RoomType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\RoomType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\RoomType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\RoomType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RoomType extends Model
{
    protected $fillable = ['name'];

    protected $dates = ['created_at', 'updated_at'];

    public function rooms()
    {
        return $this->hasMany(Room::class, 'room_type_id');
    }

    public function price()
    {
        return $this->hasOne(Price::class, 'room_type_id');
    }
}
