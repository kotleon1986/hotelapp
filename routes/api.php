<?php

Route::prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('register', 'AuthController@register')->name('register');
    Route::post('profile', 'AuthController@profile')->name('profile');
    Route::get('refresh', 'AuthController@refresh')->name('refresh');
});

// Protected routes
Route::middleware('auth:api')->group(function () {

    // Admin routes
    Route::prefix('admin')->middleware('auth.admin')->group(function () {

        // Hotel
        Route::prefix('hotel')->group(function () {
            Route::get('/', 'Admin\HotelController@index')->name('admin.hotel.all');
            Route::get('/list', 'Admin\HotelController@list')->name('admin.rooms.list');
            Route::post('/{id}', 'Admin\HotelController@update')->name('admin.rooms.create');
        });

        // Rooms
        Route::prefix('rooms')->group(function () {
            Route::get('/', 'Admin\RoomController@index')->name('admin.rooms.all');
            Route::get('/list', 'Admin\RoomController@list')->name('admin.rooms.list');
            Route::get('/{id}', 'Admin\RoomController@single')->name('admin.rooms.single');
            Route::post('/', 'Admin\RoomController@create')->name('admin.rooms.create');
            Route::post('/{id}', 'Admin\RoomController@update')->name('admin.rooms.update');
            Route::delete('/{id}', 'Admin\RoomController@delete')->name('admin.rooms.delete');
        });

        // Room Types
        Route::prefix('room-types')->group(function () {
            Route::get('/', 'Admin\RoomTypeController@index');
            Route::get('/list', 'Admin\RoomTypeController@list');
            Route::get('/{id}', 'Admin\RoomTypeController@single');
            Route::post('/', 'Admin\RoomTypeController@create');
            Route::put('/{id}', 'Admin\RoomTypeController@update');
            Route::delete('/{id}', 'Admin\RoomTypeController@delete');
        });

        // Price List
        Route::prefix('price-list')->group(function () {
            Route::get('/', 'Admin\PriceListController@index');
            Route::get('/{id}', 'Admin\PriceListController@single');
            Route::post('/', 'Admin\PriceListController@create');
            Route::put('/{id}', 'Admin\PriceListController@update');
            Route::delete('/{id}', 'Admin\PriceListController@delete');
        });

        // Bookings
        Route::prefix('bookings')->group(function () {
            Route::get('/', 'Admin\BookingController@index');
            Route::get('/{id}', 'Admin\BookingController@single');
            Route::post('/', 'Admin\BookingController@create');
            Route::put('/{id}', 'Admin\BookingController@update');
            Route::delete('/{id}', 'Admin\BookingController@delete');
        });

        // Users
        Route::prefix('users')->group(function () {
            Route::get('/list', 'Admin\UserController@list');
        });
    });

});


