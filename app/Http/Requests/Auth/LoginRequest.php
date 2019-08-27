<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->guest();
    }

    public function rules()
    {
        return [
            'email'     => 'required|email',
            'password'  => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.required'    => 'Please enter email',
            'email.email'       => 'Invalid email',
            'password.required' => 'Please enter password'
        ];
    }
}
