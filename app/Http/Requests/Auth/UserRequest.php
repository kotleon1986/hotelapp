<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $routeName = request()->route()->getName();
        if ($routeName == 'login' || $routeName == 'register') {
            return auth()->guest();
        } else {
            return !!auth()->user();
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $routeName = request()->route()->getName();

        if ($routeName == 'register') {
            $rules = [
                'email'     => 'required|email|unique:users',
                'password'  => 'required|min:6'
            ];
        } else {
            $rules = [
                'email' => 'required|email|unique:users,email,'.auth()->user()->id
            ];
        }

        return $rules;
    }

    /**
     * Get the validation error messages.
     *
     * @return array|void
     */
    public function messages()
    {
        return [
            'first_name.required'   => 'Please enter first name',
            'last_name.required'    => 'Please enter last name',
            'email.required'        => 'Please enter email',
            'email.email'           => 'Invalid Email',
            'email.unique'          => 'Email already taken',
            'password.required'     => 'Please enter password',
            'password.min'          => 'Password must be at least 6 characters long'
        ];

    }
}
