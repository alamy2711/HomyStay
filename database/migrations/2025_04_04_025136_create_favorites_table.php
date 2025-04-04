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
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id'); // Clé étrangère vers la table des clients
            $table->unsignedBigInteger('apartement_id'); // Clé étrangère vers la table des apartements
            $table->timestamps();

            // Ajout des relations de clé étrangère
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('apartement_id')->references('id')->on('apartements')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
