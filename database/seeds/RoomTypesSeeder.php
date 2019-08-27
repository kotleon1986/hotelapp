<?php

use Illuminate\Database\Seeder;
use App\Models\RoomType;

class RoomTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roomTypes = collect([
            ['name' => 'Standard'],
            ['name' => 'Deluxe'],
        ]);

        $roomTypes->each(function($roomTypeData) {
             $roomType = RoomType::updateOrCreate(['name' => $roomTypeData['name']], $roomTypeData);
             $roomType->price()->updateOrCreate(['room_type_id' => $roomType->id], ['price' => rand(10, 100)]);
        });
    }
}
