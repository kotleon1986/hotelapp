<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = collect([
            [
                'name' => Role::ADMIN,
                'display_name' => 'Admin'
            ],
            [
                'name' => Role::USER,
                'display_name' => 'User'
            ]
        ]);

        $roles->each(function ($role) {
            Role::updateOrCreate(['name' => $role['name']], $role);
        });
    }
}
