<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            // References to apartment and client (user)
            $table->unsignedBigInteger('apartment_id');
            $table->unsignedBigInteger('client_id');

            // Reservation status: pending by default
            $table->enum('status', ['pending', 'accepted', 'rejected', 'canceled'])->default('pending');
            $table->date('check_in');
            $table->date('check_out');
            $table->decimal('total_price', 8, 2);

            // Visibility
            $table->boolean('visible_to_host')->default(true);
            $table->boolean('visible_to_client')->default(true);

            $table->timestamps();

            // Set up foreign keys
            $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
