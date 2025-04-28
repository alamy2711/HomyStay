<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\Apartment;
use App\Models\Picture;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ApartmentSeeder extends Seeder
{
    const AMENITIES = [
        "wifi",
        "parking",
        "pool",
        "tv",
        "kitchen",
        "ac",
        "breakfast",
        "hot_tub",
        "pets",
        "no_smoking",
        "accessible",
        "laundry",
        "concierge",
        "luggage",
        "airport_shuttle",
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all hosts (users with role = host)
        $hosts = User::where('role', 'host')->get();

        if ($hosts->isEmpty()) {
            $this->command->warn('No hosts found. Skipping apartment seeding.');
            return;
        }

        // Get all image files from /public/images/apartments/
        $images = File::files(public_path('images/apartments'));

        if (empty($images)) {
            $this->command->warn('No images found in /public/images/apartments/. Skipping apartment seeding.');
            return;
        }

        // Create apartments
        for ($i = 0; $i < 50; $i++) {
            // Create one apartment with host_id already set
            $apartment = Apartment::factory()->create([
                'host_id' => $hosts->random()->id,
            ]);

            // Add random pictures (3-10)
            $randomImages = collect($images)->random(rand(3, 10));
            foreach ($randomImages as $image) {
                Picture::create([
                    'apartment_id' => $apartment->id,
                    'path' => 'images/apartments/' . $image->getFilename(),
                ]);
            }

            // Add random amenities (3-8)
            $randomAmenities = collect(self::AMENITIES)->random(rand(3, 8));
            foreach ($randomAmenities as $amenity) {
                Amenity::create([
                    'apartment_id' => $apartment->id,
                    'name' => $amenity,
                ]);
            }
        }

        // Create apartments
        // Apartment::factory(50)->create()->each(function ($apartment) use ($hosts, $images) {
        //     // Assign a random host
        //     $apartment->host_id = $hosts->random()->id;
        //     $apartment->save();

        //     // Add random pictures (between 3 and 10)
        //     $randomImages = collect($images)->random(rand(3, 10));

        //     foreach ($randomImages as $image) {
        //         Picture::create([
        //             'apartment_id' => $apartment->id,
        //             'path' => 'images/apartments/' . $image->getFilename(),
        //         ]);
        //     }

        //     // Add random amenities (between 3 and 8)
        //     $randomAmenities = collect(self::AMENITIES)->random(rand(3, 8));

        //     foreach ($randomAmenities as $amenity) {
        //         Amenity::create([
        //             'apartment_id' => $apartment->id,
        //             'name' => $amenity,
        //         ]);
        //     }
        // });
    }
}
