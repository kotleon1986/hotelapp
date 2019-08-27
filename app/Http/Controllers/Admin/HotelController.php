<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Hotels\HotelRequest;
use App\Services\Hotel\HotelService;
use App\Http\Controllers\Controller;

class HotelController extends Controller
{
    /**
     * HotelController constructor.
     *
     * @param HotelService $hotelService
     */
    public function __construct(HotelService $hotelService)
    {
        $this->service = $hotelService;
    }

    /**
     * Get hotel details request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->json($this->service->getHotelDetails());
    }

    /**
     * Update hotel request.
     *
     * @param $id
     * @param HotelRequest $hotelRequest
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, HotelRequest $hotelRequest)
    {
        $hotel = $this->service->updateHotel($id, $hotelRequest->all(), $hotelRequest->file('file'));
        return $this->json($hotel, 'Hotel updated successfully');
    }

    /**
     * Get hotels list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        return $this->json($this->service->getHotelsList());
    }
}
