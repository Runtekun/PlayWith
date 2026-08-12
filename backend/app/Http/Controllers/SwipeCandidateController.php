<?php

namespace App\Http\Controllers;

use App\Models\PlayerCard;
use Illuminate\Http\Request;

class SwipeCandidateController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $swipedUserIds = $user->sentSwipeActions()->pluck('to_user_id');

        $candidates = PlayerCard::with(['user', 'playerCardGames.game', 'playerCardGames.rank'])
            ->where('user_id', '!=', $user->id)
            ->whereNotIn('user_id', $swipedUserIds)
            ->get();

        return response()->json(['player_cards' => $candidates]);
    }
}
