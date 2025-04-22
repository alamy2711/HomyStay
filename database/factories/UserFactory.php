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
        $gender = fake()->randomElement(['male', 'female']);
        $folder = $gender === 'male' ? 'men' : 'women';
        // $storageFolder = storage_path("app/public/profile_pictures/{$folder}");
        $storageFolder = "public/images/profile_pictures/{$folder}";

        static $usedAvatars = [
            'men' => [],
            'women' => [],
        ];

        // Fetch available avatars if not already cached
        static $allAvatars = [
            'men' => [],
            'women' => [],
        ];

        if (empty($allAvatars[$folder])) {
            $allAvatars[$folder] = glob("{$storageFolder}/*.{jpg,jpeg,png}", GLOB_BRACE);
        }

        // Filter out used avatars
        $availableAvatars = array_diff($allAvatars[$folder], $usedAvatars[$folder]);

        // Pick one and mark it as used
        $chosenAvatar = null;
        if (!empty($availableAvatars)) {
            $chosenAvatar = fake()->randomElement($availableAvatars);
            $usedAvatars[$folder][] = $chosenAvatar;
        }

        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('123456789'), // default password
            'phone' => fake()->phoneNumber(),
            'birthday' => fake()->date(),
            'gender' => $gender,
            'role' => fake()->randomElement(['admin', 'client', 'host']), // no superadmin here
            'profile_picture' => $chosenAvatar ? "images/profile_pictures/{$folder}/" . basename($chosenAvatar) : null,
            // 'email_verified_at' => now(),
            // 'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
