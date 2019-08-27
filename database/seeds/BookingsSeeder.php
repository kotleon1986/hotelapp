<?php

use Illuminate\Database\Seeder;
use App\Models\Booking;

class BookingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!Booking::count()) {
            factory(Booking::class, 10)->create();
        }
    }
}
