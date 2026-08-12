<?php

namespace App\Http\Controllers;

use App\Models\MatchRecord;
use App\Models\SwipeAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SwipeActionController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'to_user_id' => [
                'required',
                'integer',
                'exists:users,id',
                Rule::notIn([$user->id]),
            ],
            'action' => ['required', 'string', 'in:like,skip'],
        ]);

        if ($user->sentSwipeActions()->where('to_user_id', $validated['to_user_id'])->exists()) {
            return response()->json(['message' => 'このユーザーには既にスワイプ済みです。'], 422);
        }

        $swipeAction = $user->sentSwipeActions()->create($validated);

        $match = null;

        if ($validated['action'] === 'like') {
            $isMutualLike = SwipeAction::where('from_user_id', $validated['to_user_id'])
                ->where('to_user_id', $user->id)
                ->where('action', 'like')
                ->exists();

            if ($isMutualLike) {
                $match = DB::transaction(function () use ($user, $validated) {
                    $matchRecord = MatchRecord::create();
                    $matchRecord->matchUsers()->create(['user_id' => $user->id]);
                    $matchRecord->matchUsers()->create(['user_id' => $validated['to_user_id']]);

                    return $matchRecord;
                });
            }
        }

        return response()->json([
            'swipe_action' => $swipeAction,
            'match' => $match,
        ], 201);
    }
}
