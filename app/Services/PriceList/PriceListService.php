<?php

namespace App\Services\PriceList;

use App\Facades\Table;
use App\Models\Price;
use App\Models\RoomType;
use Illuminate\Support\Facades\DB;

class PriceListService
{

    /**
     * Get price list for data table.
     *
     * @return mixed
     */
    public function getPricesForDataTable()
    {
        $builder = DB::table('prices')
            ->select([
                'prices.id', 'room_types.name as roomType', 'price', 'prices.created_at'
            ])
            ->join('room_types', 'room_types.id', '=', 'prices.room_type_id');

        return Table::generate($builder, ['room_types.name', 'price']);
    }

    /**
     * Get single price
     *
     * @param $id
     * @return Price
     */
    public function getSinglePrice($id)
    {
        $price = Price::find($id);
        if(!$price) {
            abort(404, 'Price not found');
        }

        return $price;
    }

    /**
     * Save price.
     *
     * @param $data
     * @param null $id
     * @return Price
     */
    public function savePrice($data, $id = null)
    {
        $price = $id ? Price::find($id) : new Price();

        if($id && !$price) {
            abort(404, 'Price not found');
        }

        $roomType = RoomType::find($data['room_type_id']);

        $price->price = $data['price'];
        $price->room_type()->associate($roomType);
        $price->save();

        return $price;
    }

    /**
     * Delete single price.
     *
     * @param $id
     * @return mixed
     */
    public function deletePrice($id)
    {
        $price = Price::find($id);
        if(!$price) {
            abort(404, 'Price not found');
        }

        return $price->delete();
    }
}