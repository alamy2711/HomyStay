<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            // 'email_verified_at' => now(),
            'password' => Hash::make('password'), // default password
            // 'remember_token' => Str::random(10),
            'role' => 'client',
            'phone' => $this->faker->phoneNumber(),
            'birthday' => $this->faker->date(),
        ];
    }

    /**
     * State for the specific super admin user
     */
    public function superAdmin()
    {
        return $this->state(function (array $attributes) {
            return [
                'first_name' => 'Carle',
                'last_name' => 'James',
                'email' => 'superadmin@email.com',
                'password' => Hash::make('123456789'),
                'role' => 'super_admin',
                'phone' => null,
                'birthday' => null,
            ];
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
