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
        Schema::create('player_card_games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_card_id')->constrained()->cascadeOnDelete();
            $table->foreignId('game_id')->constrained()->cascadeOnDelete();
            $table->foreignId('rank_id')->constrained()->cascadeOnDelete();
            $table->string('play_style');
            $table->string('play_time_slot');
            $table->boolean('voice_chat')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_card_games');
    }
};
