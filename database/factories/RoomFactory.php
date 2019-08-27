<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use Faker\Generator as Faker;
use App\Models\Room;

$factory->define(Room::class, function (Faker $faker) {
    return [
        'name' => $faker->toUpper($faker->randomLetter).$faker->randomDigitNotNull,
        'hotel_id' => 1,
        'room_type_id' => $faker->numberBetween(1, 2),
        'image' => $faker->image('public/uploads/images/rooms', 300, 300)
    ];
});
