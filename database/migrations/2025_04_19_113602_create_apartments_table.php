<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Each apartment is linked to a host user.
     */
    public function up(): void
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('host_id'); // Foreign key referencing the host (user)
            $table->string('title');
            $table->text('description');
            // $table->decimal('price', 8, 2);
            $table->integer('price');
            $table->decimal('rating', 2, 1)->default(0);
            $table->enum('status', ['available', 'reserved', 'expired'])->default('available');

            // Apartment Structure
            $table->enum('type', ['apartment', 'house', 'mansion', 'hotel']);
            $table->integer('rooms');
            $table->integer('bathrooms');
            $table->integer('beds');
            $table->integer('guests');
            $table->integer('area');

            // Location
            $table->string('country');
            $table->string('city');
            $table->string('address');

            // Availability Calendar
            $table->date('check_in');
            $table->date('check_out');

            $table->timestamps();

            // Foreign key constraint with cascading on delete
            $table->foreign('host_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};
