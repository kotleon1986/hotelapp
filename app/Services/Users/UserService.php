<?php

namespace App\Services\Users;


use App\Models\Role;
use App\Models\User;

class UserService
{
    /**
     * Get list of users for selector.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getUsersList()
    {
        $userRole = Role::whereName(Role::USER)->first();
        return User::whereRoleId($userRole->id)->get()->pluck('name_and_email', 'id');
    }

}