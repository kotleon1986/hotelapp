<?php

namespace App\Services\Auth;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthService {

    /**
     * Attempt to login user and return JWT token.
     *
     * @param $credentials
     * @return array
     */
    public function loginUser($credentials)
    {
        if (!$token = auth('api')->attempt($credentials)) {
            abort(404, 'Incorrect email/password');
        }

        return ['token' => $token];
    }

    /**
     * Create token for registered user.
     *
     * @param User $user
     * @return mixed
     */
    public function createTokenForUser(User $user)
    {
        return JWTAuth::fromUser($user);
    }

    /**
     * Save user data.
     *
     * @param $data
     * @param null $id
     * @return User
     */
    public function saveUser($data, $id = null)
    {
        $user = $id ? User::find($id) : new User();

        $user->fill($data);

        if (!empty($data['password']) && !$id) {
            $user->password = Hash::make($data['password']);
        }

        $userRole = Role::whereName(Role::USER)->first();
        $user->role()->associate($userRole);

        $user->save();
        return $user;
    }

    /**
     * Refresh JWT token.
     *
     * @return array
     */
    public function refreshToken()
    {
        return ['token' => auth()->refresh()];
    }

}