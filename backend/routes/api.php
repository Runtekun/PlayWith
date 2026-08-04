<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerCardController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterController::class, 'store']);
Route::post('/login', [LoginController::class, 'store']);

Route::get('/games', [GameController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LogoutController::class, 'destroy']);

    Route::get('/player-card', [PlayerCardController::class, 'show']);
    Route::post('/player-card', [PlayerCardController::class, 'store']);
});
