<?php

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class AdminSeeder extends Seeder
{
    public function run()
    {
        if ($user = User::whereEmail('test@admin.com')->first()) {
            return false;
        }

        $role = Role::admin()->first();

        $user = new User([
            'first_name' => 'Test',
            'last_name' => 'Admin',
            'email' => 'test@admin.com',
            'password' => Hash::make('test1234'),
            'phone' => Faker::create()->phoneNumber
        ]);

        $user->role()->associate($role);

        $user->save();
    }
}
