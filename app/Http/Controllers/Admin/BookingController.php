<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Bookings\BookingRequest;
use App\Services\Bookings\BookingService;
use App\Http\Controllers\Controller;

class BookingController extends Controller
{
    /**
     * BookingController constructor.
     *
     * @param BookingService $bookingService
     */
    public function __construct(BookingService $bookingService)
    {
        $this->service = $bookingService;
    }

    /**
     * Get the bookings list request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json($this->service->getBookingsForDataTable());
    }

    /**
     * Get single booking request.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function single($id)
    {
        return $this->json($this->service->getSingleBookingRecord($id));
    }

    /**
     * Create booking request.
     *
     * @param BookingRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(BookingRequest $request)
    {
        $booking = $this->service->saveBooking($request->all());
        return $this->json($booking, 'Booking record saved successfully');
    }

    /**
     * Update booking request.
     *
     * @param $id
     * @param BookingRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, BookingRequest $request)
    {
        $booking = $this->service->saveBooking($request->all(), $id);
        return $this->json($booking, 'Booking record updated successfully');
    }

    /**
     * Delete booking request.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $this->service->deleteBooking($id);
        return $this->json('Booking record deleted successfully');
    }
}
