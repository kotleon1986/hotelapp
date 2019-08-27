<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property int $role_id
 * @property string|null $address
 * @property string|null $city
 * @property string|null $country
 * @property string $phone
 * @property string|null $fax
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Role $role
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereFax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read mixed $name_and_email
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User wherePassword($value)
 */
class User extends Authenticatable implements JWTSubject
{
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'address', 'city', 'country', 'phone', 'fax'];

    protected $hidden = ['password'];

    protected $dates = ['created_at', 'updated_at'];

    protected $appends = ['name_and_email'];

    /**
     * User has one role.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    /**
     * Get secret key for JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Get custom claims to include in token data.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'role' => $this->role->name,
            'address' => $this->address,
            'city' => $this->city,
            'country' => $this->country,
            'phone' => $this->phone,
            'fax' => $this->fax
        ];
    }

    /**
     * Check if user has admin role.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role->name == Role::ADMIN;
    }

    public function getNameAndEmailAttribute()
    {
        if (!$this->first_name || !$this->last_name) return $this->email;
        return $this->first_name." ".$this->last_name." (".$this->email.")";
    }
}
