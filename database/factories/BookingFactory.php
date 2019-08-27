<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Booking;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(Booking::class, function (Faker $faker) {
    $startDate = $faker->dateTimeBetween('+5 days', '+15 days');
    $endDate = $faker->dateTimeBetween('+20 days', '+1 month');

    $totalNights = Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate));

    return [
        'room_id' => $faker->numberBetween(1, 10),
        'full_name' => $faker->name,
        'email' => $faker->email,
        'phone' => $faker->phoneNumber,
        'start_date' => $startDate,
        'end_date' => $endDate,
        'total_nights' => $totalNights,
        'total_price' => $faker->numberBetween(10, 1000)
    ];
});
