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
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('host_id')->constrained('hosts')->onDelete('cascade');
            $table->string('title');
            $table->enum('type', ['apartment', 'house', 'mansion', 'hotel']);
            $table->string('description');
            $table->decimal('price');
            $table->string('address');
            $table->integer('nbr_room');
            $table->integer('nbr_bed');
            $table->integer('nbr_bathroom');
            $table->integer('nbr_guest');
            $table->date('check-in');
            $table->date('check-out');
            $table->boolean('status');
            $table->double('rating', 1, 1);
            $table->timestamps();
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
