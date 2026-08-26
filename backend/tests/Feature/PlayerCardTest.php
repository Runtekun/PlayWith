<?php

use App\Models\Game;
use App\Models\PlayerCard;
use App\Models\Rank;
use App\Models\User;

function createGameWithRank(): array
{
    $game = Game::create(['name' => 'テストゲーム']);
    $rank = Rank::create(['game_id' => $game->id, 'name' => 'ゴールド', 'sort_order' => 1]);

    return [$game, $rank];
}

it('rejects unauthenticated access', function () {
    $this->getJson('/api/player-card')->assertUnauthorized();
    $this->postJson('/api/player-card', [])->assertUnauthorized();
});

it('returns 404 when the player card does not exist', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->getJson('/api/player-card')
        ->assertNotFound();
});

it('creates a player card with games', function () {
    [$game, $rank] = createGameWithRank();
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/player-card', [
        'bio' => 'よろしくお願いします',
        'games' => [[
            'game_id' => $game->id,
            'rank_id' => $rank->id,
            'play_style' => 'エンジョイ勢',
            'play_time_slot' => '平日夜',
            'voice_chat' => true,
        ]],
    ]);

    $response->assertCreated();
    $response->assertJsonPath('player_card.player_card_games.0.game.name', 'テストゲーム');
});

it('allows a game without a rank', function () {
    $game = Game::create(['name' => 'ランクなしゲーム']);
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/player-card', [
        'bio' => null,
        'games' => [[
            'game_id' => $game->id,
            'rank_id' => null,
            'play_style' => 'エンジョイ勢',
            'play_time_slot' => '平日夜',
            'voice_chat' => false,
        ]],
    ]);

    $response->assertCreated();
});

it('rejects a rank that does not belong to the selected game', function () {
    [$game, $rank] = createGameWithRank();
    $otherGame = Game::create(['name' => '別のゲーム']);
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/player-card', [
        'games' => [[
            'game_id' => $otherGame->id,
            'rank_id' => $rank->id,
            'play_style' => 'エンジョイ勢',
            'play_time_slot' => '平日夜',
            'voice_chat' => false,
        ]],
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors('games.0.rank_id');
});

it('rejects creating a second player card for the same user', function () {
    [$game, $rank] = createGameWithRank();
    $user = User::factory()->create();
    PlayerCard::create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->postJson('/api/player-card', [
        'games' => [[
            'game_id' => $game->id,
            'rank_id' => $rank->id,
            'play_style' => 'エンジョイ勢',
            'play_time_slot' => '平日夜',
            'voice_chat' => false,
        ]],
    ]);

    $response->assertUnprocessable();
});

it('replaces existing games when updating a player card', function () {
    [$game, $rank] = createGameWithRank();
    $newGame = Game::create(['name' => '新しいゲーム']);
    $user = User::factory()->create();

    $playerCard = PlayerCard::create(['user_id' => $user->id, 'bio' => '初期']);
    $playerCard->playerCardGames()->create([
        'game_id' => $game->id,
        'rank_id' => $rank->id,
        'play_style' => 'ガチ勢',
        'play_time_slot' => '深夜',
        'voice_chat' => false,
    ]);

    $response = $this->actingAs($user)->putJson('/api/player-card', [
        'bio' => '更新後',
        'games' => [[
            'game_id' => $newGame->id,
            'rank_id' => null,
            'play_style' => 'エンジョイ勢',
            'play_time_slot' => '週末昼',
            'voice_chat' => true,
        ]],
    ]);

    $response->assertOk();
    $response->assertJsonPath('player_card.bio', '更新後');
    $response->assertJsonCount(1, 'player_card.player_card_games');
    $response->assertJsonPath('player_card.player_card_games.0.game.name', '新しいゲーム');
});
