<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Hotel
 *
 * @property int $id
 * @property string $name
 * @property string $city
 * @property string $state
 * @property string $country
 * @property string $zip
 * @property string $phone
 * @property string $email
 * @property string $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Room[] $rooms
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereZip($value)
 * @mixin \Eloquent
 * @property string $address
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hotel whereAddress($value)
 */
class Hotel extends Model
{
    protected $fillable = ['name', 'address', 'city', 'state', 'country', 'zip', 'phone', 'email', 'image'];

    protected $dates = ['created_at', 'updated_at'];

    public function rooms()
    {
        return $this->hasMany(Room::class, 'hotel_id');
    }

}