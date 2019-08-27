<?php

namespace App\Services\Bookings;


use App\Facades\Table;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BookingService
{
    /**
     * Get bookings list for data table.
     *
     * @return mixed
     */
    public function getBookingsForDataTable()
    {
        $builder = DB::table('bookings')
            ->select([
                'bookings.id', 'bookings.start_date', 'bookings.end_date',
                'bookings.total_nights', 'bookings.total_price', 'bookings.created_at', 'rooms.name',
                DB::raw('IFNULL(bookings.email, users.email) AS `customer_email`'),
                DB::raw('IFNULL(bookings.full_name, CONCAT(users.first_name, " ", users.last_name)) AS `customer_fullname`'),
                DB::raw('IFNULL(bookings.phone, users.phone) AS `customer_phone`')
            ])
            ->join('users', 'users.id', '=', 'bookings.user_id', 'left')
            ->join('rooms', 'rooms.id', '=', 'bookings.room_id');

        return Table::generate($builder, ['name', 'customer_fullname', 'customer_email']);
    }

    /**
     * Get single booking record.
     *
     * @param $id
     * @return Booking
     */
    public function getSingleBookingRecord($id)
    {
        $booking = Booking::with('user', 'room')->find($id);
        if(!$booking) {
            abort(404, 'Booking record not found');
        }

        return $booking;
    }

    /**
     * Save booking record.
     *
     * @param $data
     * @param $id
     * @return Booking
     */
    public function saveBooking($data, $id = null)
    {
        $booking = $id ? Booking::find($id) : new Booking();

        if ($id && !$booking) {
            abort(404, 'Booking not found');
        }

        $data['user_id'] = (int) $data['user_id'];
        $data['room_id'] = (int) $data['room_id'];

        if ($data['user_id']) {
            $user = User::find($data['user_id']);
            $booking->user()->associate($user);
        } else {
            $booking->full_name = $data['full_name'];
            $booking->email = $data['email'];
            $booking->phone = $data['phone'];
        }

        $room = Room::find($data['room_id']);
        $booking->room()->associate($room);

        $booking->start_date = Carbon::createFromDate($data['start_date']);
        $booking->end_date = Carbon::createFromDate($data['end_date']);

        $booking->total_nights = $booking->start_date->diffInDays($booking->end_date);
        $booking->total_price = $room->type->price->price * $booking->total_nights;

        $booking->save();
        return $booking;
    }

    /**
     * Delete single booking record.
     *
     * @param $id
     * @return mixed
     */
    public function deleteBooking($id)
    {
        $booking = Booking::find($id);
        if(!$booking) {
            abort(404, 'Booking record not found');
        }

        return $booking->delete();
    }
}