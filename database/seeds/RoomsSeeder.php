<?php

use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!Room::count()) {
            return factory(Room::class, 10)->create();
        }
    }
}
