<?php

namespace App\Http\Controllers;

use App\Models\Rank;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PlayerCardController extends Controller
{
    public function show(Request $request)
    {
        $playerCard = $request->user()
            ->playerCard()
            ->with(['playerCardGames.game', 'playerCardGames.rank'])
            ->first();

        if (! $playerCard) {
            return response()->json(['message' => 'プレイヤーカードが見つかりません。'], 404);
        }

        return response()->json(['player_card' => $playerCard]);
    }

    public function store(Request $request)
    {
        if ($request->user()->playerCard()->exists()) {
            return response()->json(['message' => 'プレイヤーカードは既に作成されています。'], 422);
        }

        $validated = $request->validate([
            'bio' => ['nullable', 'string', 'max:1000'],
            'games' => ['required', 'array', 'min:1'],
            'games.*.game_id' => ['required', 'integer', 'exists:games,id'],
            'games.*.rank_id' => ['required', 'integer', 'exists:ranks,id'],
            'games.*.play_style' => ['required', 'string', 'max:50'],
            'games.*.play_time_slot' => ['required', 'string', 'max:50'],
            'games.*.voice_chat' => ['required', 'boolean'],
        ]);

        $this->validateRanksBelongToGames($request);

        $playerCard = $request->user()->playerCard()->create([
            'bio' => $validated['bio'] ?? null,
        ]);

        foreach ($validated['games'] as $gameData) {
            $playerCard->playerCardGames()->create($gameData);
        }

        $playerCard->load(['playerCardGames.game', 'playerCardGames.rank']);

        return response()->json(['player_card' => $playerCard], 201);
    }

    private function validateRanksBelongToGames(Request $request): void
    {
        $games = $request->input('games', []);

        $rankIds = collect($games)->pluck('rank_id')->unique();
        $ranksByGameId = Rank::whereIn('id', $rankIds)->get()->keyBy('id');

        foreach ($games as $index => $gameData) {
            $rank = $ranksByGameId->get($gameData['rank_id']);

            if ($rank && $rank->game_id !== (int) $gameData['game_id']) {
                throw ValidationException::withMessages([
                    "games.{$index}.rank_id" => '選択したランクが対象のゲームと一致しません。',
                ]);
            }
        }
    }
}
