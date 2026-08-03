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
        Schema::table('player_card_games', function (Blueprint $table) {
            $table->dropForeign(['rank_id']);
        });

        Schema::table('player_card_games', function (Blueprint $table) {
            $table->foreignId('rank_id')->nullable()->change();
        });

        Schema::table('player_card_games', function (Blueprint $table) {
            $table->foreign('rank_id')->references('id')->on('ranks')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('player_card_games', function (Blueprint $table) {
            $table->dropForeign(['rank_id']);
        });

        Schema::table('player_card_games', function (Blueprint $table) {
            $table->foreignId('rank_id')->nullable(false)->change();
        });

        Schema::table('player_card_games', function (Blueprint $table) {
            $table->foreign('rank_id')->references('id')->on('ranks')->cascadeOnDelete();
        });
    }
};
