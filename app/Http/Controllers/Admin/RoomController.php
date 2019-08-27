<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Rooms\RoomRequest;
use App\Services\Rooms\RoomService;
use App\Http\Controllers\Controller;

class RoomController extends Controller
{
    /**
     * RoomController constructor.
     *
     * @param RoomService $roomService
     */
    public function __construct(RoomService $roomService)
    {
        $this->service = $roomService;
    }

    /**
     * Get data for rooms manager page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json($this->service->getRoomsForDataTable());
    }

    /**
     * Single room request.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function single($id)
    {
        return $this->json($this->service->getRoom($id));
    }

    /**
     * Get rooms list request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        return $this->json($this->service->getRoomsList());
    }

    /**
     * Create room request.
     *
     * @param RoomRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(RoomRequest $request)
    {
        $room = $this->service->saveRoom($request->all(), $request->file('file'));
        return $this->json($room, 'Room created successfully');
    }

    /**
     * Update room request.
     *
     * @param $id
     * @param RoomRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, RoomRequest $request)
    {
        $room = $this->service->saveRoom($request->all(), $request->file('file'), $id);
        return $this->json($room, 'Room updated successfully');
    }

    /**
     * Delete room request.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $this->service->deleteRoom($id);
        return $this->json('Room deleted successfully');
    }
}
