<?php

namespace App\Services\Rooms;

use App\Facades\Table;
use App\Models\RoomType;
use Illuminate\Support\Facades\DB;

class RoomTypeService
{
    /**
     * Get room types for data table
     *
     * @return mixed
     */
    public function getRoomTypesForDataTable()
    {
        $builder = DB::table('room_types');
        return Table::generate($builder, ['name']);
    }

    /**
     * Get single room type.
     *
     * @param $id
     * @return RoomType
     */
    public function getSingleRoomType($id)
    {
        $type = RoomType::find($id);
        if(!$type) {
            abort(404, 'Room type not found');
        }

        return $type;
    }

    /**
     * Get list of room types for selector.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getRoomTypesList()
    {
        return RoomType::all()->pluck('name', 'id');
    }

    /**
     * Save room type.
     *
     * @param $data
     * @param null $id
     * @return RoomType
     */
    public function saveRoomType($data, $id = null)
    {
        $type = $id ? RoomType::find($id) : new RoomType();

        if($id && !$type) {
            abort(404, 'Room type not found');
        }

        $type->name = $data['name'];

        $type->save();
        return $type;
    }

    public function deleteRoomType($id)
    {
        $type = RoomType::find($id);

        if(!$type) {
            abort(404, 'Room type not found');
        }

        return $type->delete();
    }

}