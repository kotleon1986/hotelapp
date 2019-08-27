<?php


namespace App\Services\Hotel;

use App\Models\Hotel;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class HotelService
{
    /**
     * Get hotel details.
     *
     * @return mixed
     */
    public function getHotelDetails()
    {
        return Hotel::first();
    }

    /**
     * Update hotel details.
     *
     * @param int $id
     * @param array $data
     * @param UploadedFile|null $file
     * @return mixed
     */
    public function updateHotel($id, $data, $file)
    {
        $hotel = Hotel::find($id);

        if(!$hotel) {
            abort(404, 'Hotel not found');
        }

        $hotel->fill($data);

        // store uploaded file if exists
        if($file) {
            $imagePath = $file->store('images/hotels');

            // delete previous file if exists
            if($hotel->image) {
                Storage::delete(str_replace('uploads/', '', $hotel->image));
            }

            $hotel->image = 'uploads/'.$imagePath;
        }

        $hotel->save();

        return $hotel;
    }

    /**
     * Get list of all hotels for dropdown selector.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getHotelsList()
    {
        return Hotel::all()->pluck('name', 'id');
    }
}