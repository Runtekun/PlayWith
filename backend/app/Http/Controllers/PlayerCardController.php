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
            ->with(['user', 'playerCardGames.game', 'playerCardGames.rank'])
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

        $validated = $this->validatePlayerCard($request);

        $playerCard = $request->user()->playerCard()->create([
            'bio' => $validated['bio'] ?? null,
        ]);

        foreach ($validated['games'] as $gameData) {
            $playerCard->playerCardGames()->create($gameData);
        }

        $playerCard->load(['user', 'playerCardGames.game', 'playerCardGames.rank']);

        return response()->json(['player_card' => $playerCard], 201);
    }

    public function update(Request $request)
    {
        $playerCard = $request->user()->playerCard;

        if (! $playerCard) {
            return response()->json(['message' => 'プレイヤーカードが見つかりません。'], 404);
        }

        $validated = $this->validatePlayerCard($request);

        $playerCard->update(['bio' => $validated['bio'] ?? null]);

        $playerCard->playerCardGames()->delete();
        foreach ($validated['games'] as $gameData) {
            $playerCard->playerCardGames()->create($gameData);
        }

        $playerCard->load(['user', 'playerCardGames.game', 'playerCardGames.rank']);

        return response()->json(['player_card' => $playerCard]);
    }

    private function validatePlayerCard(Request $request): array
    {
        $validated = $request->validate([
            'bio' => ['nullable', 'string', 'max:1000'],
            'games' => ['required', 'array', 'min:1'],
            'games.*.game_id' => ['required', 'integer', 'exists:games,id'],
            'games.*.rank_id' => ['nullable', 'integer', 'exists:ranks,id'],
            'games.*.play_style' => ['required', 'string', 'max:50'],
            'games.*.play_time_slot' => ['required', 'string', 'max:50'],
            'games.*.voice_chat' => ['required', 'boolean'],
        ]);

        $this->validateRanksBelongToGames($validated['games']);

        return $validated;
    }

    private function validateRanksBelongToGames(array $games): void
    {
        $rankIds = collect($games)->pluck('rank_id')->filter()->unique();
        $ranksByGameId = Rank::whereIn('id', $rankIds)->get()->keyBy('id');

        foreach ($games as $index => $gameData) {
            if (empty($gameData['rank_id'])) {
                continue;
            }

            $rank = $ranksByGameId->get($gameData['rank_id']);

            if ($rank && $rank->game_id !== (int) $gameData['game_id']) {
                throw ValidationException::withMessages([
                    "games.{$index}.rank_id" => '選択したランクが対象のゲームと一致しません。',
                ]);
            }
        }
    }
}
