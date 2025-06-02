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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['reservation', 'request', 'message', 'system']);
            $table->string('subject'); // Brief title of the notification
            $table->text('content'); // Detailed message
            $table->unsignedBigInteger('sender_id')->nullable(); // Who sent the notification
            $table->unsignedBigInteger('receiver_id'); // Who should receive it
            $table->boolean('is_seen')->default(false); // Seen/unseen status
            $table->timestamps();

            // Foreign keys for sender and receiver (users)
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
