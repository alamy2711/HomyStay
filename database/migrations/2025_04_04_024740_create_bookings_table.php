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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id'); // Clé étrangère vers la table des clients
            $table->unsignedBigInteger('apartment_id'); // Clé étrangère vers la table des apartements
            $table->unsignedBigInteger('host_id');
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->decimal('price');
            $table->enum('status', ['waiting', 'accepted', 'rejected']);
            $table->timestamps();

            // Ajout des relations de clé étrangère
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
            $table->foreign('host_id')->references('id')->on('hosts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
