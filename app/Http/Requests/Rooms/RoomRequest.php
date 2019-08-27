<?php

namespace App\Http\Requests\Rooms;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name'          => 'required',
            'hotel_id'      => 'required|exists:hotels,id',
            'room_type_id'  => 'required|exists:rooms,id',
        ];

        if (request()->route()->getName() == 'admin.rooms.create') {
            $rules['file'] = 'required|mimes:jpeg,jpg,png|max:2000';
        }

        return $rules;
    }

    /**
     * Get the validation messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required'         => 'Please enter room name',
            'hotel_id.required'     => 'Please select hotel',
            'hotel_id.exists'       => 'Hotel doesn\'t exist',
            'room_type_id.required' => 'Please select room type',
            'room_type_id.exists'   => 'Room type doesn\'t exist',
            'file.required'         => 'Please upload image',
            'file.mimes'            => 'Invalid image type',
            'file.max'              => 'Please upload image with less than 2MB size'
        ];
    }
}
