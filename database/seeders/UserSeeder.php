<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hardcoded SuperAdmin
        User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'superadmin@email.com',
            'password' => Hash::make('123456789'),
            'phone' => '0100000000',
            'birthday' => '1990-01-01',
            'role' => 'super_admin',
        ]);

        // Hardcoded Admin
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@email.com',
            'password' => Hash::make('123456789'),
            'phone' => '0100000001',
            'birthday' => '1991-02-02',
            'role' => 'admin',
        ]);

        // Hardcoded Client
        User::create([
            'first_name' => 'Client',
            'last_name' => 'User',
            'email' => 'client@email.com',
            'password' => Hash::make('123456789'),
            'phone' => '0100000002',
            'birthday' => '1992-03-03',
            'role' => 'client',
        ]);

        // Hardcoded Host
        User::create([
            'first_name' => 'Host',
            'last_name' => 'User',
            'email' => 'host@email.com',
            'password' => Hash::make('123456789'),
            'phone' => '0100000003',
            'birthday' => '1993-04-04',
            'role' => 'host',
        ]);

        // Generate Random Users (no superadmin)
        User::factory(10)->create();
    }
}
