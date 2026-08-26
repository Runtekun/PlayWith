<?php

use App\Models\Game;
use App\Models\Rank;

it('lists games with their ranks', function () {
    $game = Game::create(['name' => 'テストゲーム']);
    Rank::create(['game_id' => $game->id, 'name' => 'ゴールド', 'sort_order' => 1]);
    Rank::create(['game_id' => $game->id, 'name' => 'シルバー', 'sort_order' => 2]);

    $response = $this->getJson('/api/games');

    $response->assertOk();
    $response->assertJsonCount(1, 'games');
    $response->assertJsonCount(2, 'games.0.ranks');
    // sort_order順に並んでいることを確認
    $response->assertJsonPath('games.0.ranks.0.name', 'ゴールド');
});
