<?php

namespace App\Http\Requests\Bookings;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id'       =>  'nullable|exists:users,id',
            'room_id'       =>  'required|exists:rooms,id',
            'full_name'     =>  'nullable|required_if:user_id,==,0',
            'email'         =>  'nullable|required_if:user_id,==,0|email',
            'start_date'    =>  'required|date|after:today',
            'end_date'      =>  'required|date|after:start_date'
        ];
    }

    /**
     * Get the validation error messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.exists'        =>  'User not found',
            'room_id.required'      =>  'Please select room',
            'room_id.exists'        =>  'Room not found',
            'full_name.required_if' =>  'Please enter customer name',
            'email.required_if'     =>  'Please enter customer email',
            'email.email'           =>  'Invalid email',
            'start_date.required'   =>  'Please choose start date',
            'start_date.date'       =>  'Invalid date',
            'start_date.after'      =>  'The date must be tomorrow at least',
            'end_date.required'     =>  'Please choose end date',
            'end_date.date'         =>  'Invalid date',
            'end_date.after'        =>  'The end date must be after start date'
        ];
    }
}
