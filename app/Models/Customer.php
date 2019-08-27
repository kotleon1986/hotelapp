<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Customer
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $phone
 * @property string|null $address
 * @property string|null $city
 * @property string|null $country
 * @property string|null $fax
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Booking[] $bookings
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereFax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Customer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Customer extends Model
{
    protected $fillable = ['first_name', 'last_name', 'email', 'address', 'city', 'country', 'phone', 'fax'];

    protected $dates = ['created_at', 'updated_at'];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'customer_id');
    }
}
