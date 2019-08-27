<?php

namespace App\Services\Rooms;

use App\Models\Hotel;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use App\Facades\Table;
use Exception;
use Illuminate\Support\Facades\Storage;

class RoomService
{
    /**
     * Get rooms for data table.
     *
     * @return mixed
     */
    public function getRoomsForDataTable()
    {
        $searchColumns = ['rooms.name', 'hotels.name', 'room_types.name'];

        $builder = DB::table('rooms')->select([
            'rooms.id', 'rooms.name', 'hotels.name as hotelName', 'room_types.name as roomType', 'rooms.created_at'
        ])
            ->join('hotels', 'hotels.id', '=', 'rooms.hotel_id')
            ->join('room_types', 'room_types.id', '=', 'rooms.room_type_id');

        return Table::generate($builder, $searchColumns);
    }

    /**
     * Get rooms list for selector.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getRoomsList()
    {
        return Room::all()->pluck('name', 'id');
    }

    /**
     * Get single room.
     *
     * @param $id
     * @return Room
     */
    public function getRoom($id)
    {
        $room = Room::find($id);
        if(!$room) {
            abort(404, 'Room not found');
        }

        return $room;
    }

    /**
     * Save room data.
     *
     * @param $data
     * @param UploadedFile $file
     * @param int $id
     * @return Room
     */
    public function saveRoom($data, $file = null, $id = null)
    {
        $room = $id ? Room::find($id) : new Room();

        if($id && !$room) {
            abort(404, 'Room not found');
        }

        $hotel = Hotel::find($data['hotel_id']);
        $roomType = RoomType::find($data['room_type_id']);

        $room->name = $data['name'];
        $room->hotel()->associate($hotel);
        $room->type()->associate($roomType);

        // store uploaded file if exists
        if($file) {
            $imagePath = $file->store('images/rooms');

            // delete previous file if exists
            if($hotel->image) {
                Storage::delete(str_replace('uploads/', '', $hotel->image));
            }

            $room->image = 'uploads/'.$imagePath;
        }

        $room->save();
        return $room;
    }

    /**
     * Delete single room.
     *
     * @param $id
     * @return mixed
     */
    public function deleteRoom($id)
    {
        $room = Room::find($id);

        if(!$room) {
            abort(404, 'Room not found');
        }

        return $room->delete();
    }
}