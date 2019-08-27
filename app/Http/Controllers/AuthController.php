<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\UserRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    /**
     * AuthController constructor.
     * @param AuthService $authService
     *
     */
    public function __construct(AuthService $authService)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->service = $authService;
    }

    /**
     * Login request.
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $token = $this->service->loginUser($request->only(['email', 'password']));
        return $this->json($token);
    }

    /**
     * Register request.
     *
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRequest $request)
    {
        $user = $this->service->saveUser($request->all());
        $token = $this->service->createTokenForUser($user);
        return $this->json(['token' => $token], 'Register successful');
    }

    public function profile(UserRequest $request)
    {
        $user = $this->service->saveUser($request->all(), auth()->user()->id);
        $token = $this->service->createTokenForUser($user);
        return $this->json(['token' => $token], 'Profile updated successfully');    }

    /**
     * Refresh JWT token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->json($this->service->refreshToken());
    }

}
