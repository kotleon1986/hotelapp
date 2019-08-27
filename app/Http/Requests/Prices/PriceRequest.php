<?php

namespace App\Http\Requests\Prices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PriceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'room_type_id'      => 'required|exists:room_types,id',
            'price'             => 'required|numeric|min:0'
        ];
    }

    /**
     * Get the validation error messages.
     *
     * @return array|void
     */
    public function messages()
    {
        return [
            'room_type_id.required'     =>  'Please select room type',
            'room_type_id.exists'       =>  'Invalid room type',
            'price.required'            =>  'Please enter price',
            'price.numeric'             =>  'Price must be valid number',
            'price.min'                 =>  'Price cannot be negative number'
        ];
    }
}
