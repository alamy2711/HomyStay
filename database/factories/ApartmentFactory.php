<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Apartment>
 */
class ApartmentFactory extends Factory
{
    protected $model = Apartment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'host_id' => null, // We'll set it manually in seeder
            'title' => $this->faker->sentence(5),
            'description' => $this->faker->paragraph(8),
            // 'price' => $this->faker->randomFloat(2, 50, 500),
            'price' => $this->faker->numberBetween(50, 500),
            'rating' => $this->faker->randomFloat(1, 0, 5),
            'status' => $this->faker->randomElement(['available']),
            // 'status' => $this->faker->randomElement(['available', 'reserved', 'expired']),
            'type' => $this->faker->randomElement(['apartment', 'house', 'mansion', 'hotel']),
            'rooms' => $this->faker->numberBetween(1, 10),
            'bathrooms' => $this->faker->numberBetween(0, 5),
            'beds' => $this->faker->numberBetween(0, 10),
            'guests' => $this->faker->numberBetween(1, 15),
            'area' => $this->faker->numberBetween(20, 500),
            'country' => $this->faker->country,
            'city' => $this->faker->city,
            'address' => $this->faker->address,
            'check_in' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'check_out' => $this->faker->dateTimeBetween('+2 months', '+6 months')->format('Y-m-d'),
        ];
    }
}
