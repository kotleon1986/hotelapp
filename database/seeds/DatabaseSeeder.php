<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(HotelSeeder::class);
        $this->call(RoomTypesSeeder::class);
        $this->call(RoomsSeeder::class);
        $this->call(BookingsSeeder::class);
    }
}
