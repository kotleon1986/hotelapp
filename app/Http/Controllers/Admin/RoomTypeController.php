<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Rooms\RoomTypeRequest;
use App\Services\Rooms\RoomTypeService;
use App\Http\Controllers\Controller;

class RoomTypeController extends Controller
{
    /**
     * RoomTypeController constructor.
     *
     * @param RoomTypeService $roomTypeService
     */
    public function __construct(RoomTypeService $roomTypeService)
    {
        $this->service = $roomTypeService;
    }

    /**
     * Get the list of room types for table.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json($this->service->getRoomTypesForDataTable());
    }

    /**
     * Get single room type request.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function single($id)
    {
        return $this->json($this->service->getSingleRoomType($id));
    }

    /**
     * Get the list of room types request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        return $this->json($this->service->getRoomTypesList());
    }

    /**
     * Create new room type.
     *
     * @param RoomTypeRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(RoomTypeRequest $request)
    {
        $type = $this->service->saveRoomType($request->all());
        return $this->json($type, 'Room type created successfully');
    }

    /**
     * Update existing room type.
     *
     * @param $id
     * @param RoomTypeRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, RoomTypeRequest $request)
    {
        $type = $this->service->saveRoomType($request->all(), $id);
        return $this->json($type, 'Room type updated successfully');
    }

    /**
     * Delete single room type.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $this->service->deleteRoomType($id);
        return $this->json('Room type deleted successfully');
    }
}
