<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['player_card_id', 'game_id', 'rank_id', 'play_style', 'play_time_slot', 'voice_chat'])]
class PlayerCardGame extends Model
{
    protected function casts(): array
    {
        return [
            'voice_chat' => 'boolean',
        ];
    }

    public function playerCard(): BelongsTo
    {
        return $this->belongsTo(PlayerCard::class);
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function rank(): BelongsTo
    {
        return $this->belongsTo(Rank::class);
    }
}
