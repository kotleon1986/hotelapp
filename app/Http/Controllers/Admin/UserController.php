<?php

namespace App\Http\Controllers\Admin;

use App\Services\Users\UserService;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * UserController constructor.
     *
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->service = $userService;
    }

    /**
     * Get users list request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        return $this->json($this->service->getUsersList());
    }
}
