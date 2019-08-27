<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Hotel;
use Faker\Generator as Faker;

$factory->define(Hotel::class, function (Faker $faker) {
    return [
        'name' => $faker->text(20),
        'address' => $faker->streetAddress,
        'city' => $faker->city,
        'country' => $faker->country,
        'phone' => $faker->phoneNumber,
        'email' => $faker->email,
        'image' => $faker->image('public/uploads/images/hotels', 300, 300)
    ];
});
