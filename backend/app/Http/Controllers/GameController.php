<?php

namespace App\Http\Controllers;

use App\Models\Game;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::with('ranks')->orderBy('name')->get();

        return response()->json(['games' => $games]);
    }
}
