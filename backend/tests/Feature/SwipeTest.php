<?php

use App\Models\Game;
use App\Models\PlayerCard;
use App\Models\SwipeAction;
use App\Models\User;

function createUserWithCard(string $email): User
{
    $user = User::factory()->create(['email' => $email]);
    PlayerCard::create(['user_id' => $user->id]);

    return $user;
}

it('excludes self and already-swiped users from candidates', function () {
    $me = createUserWithCard('me@gmail.com');
    $stranger = createUserWithCard('stranger@gmail.com');
    $alreadySwiped = createUserWithCard('swiped@gmail.com');

    SwipeAction::create([
        'from_user_id' => $me->id,
        'to_user_id' => $alreadySwiped->id,
        'action' => 'skip',
    ]);

    $response = $this->actingAs($me)->getJson('/api/swipe-candidates');

    $response->assertOk();
    $ids = collect($response->json('player_cards'))->pluck('user_id');
    expect($ids)->toContain($stranger->id);
    expect($ids)->not->toContain($me->id);
    expect($ids)->not->toContain($alreadySwiped->id);
});

it('does not create a match on a one-sided like', function () {
    $me = createUserWithCard('me2@gmail.com');
    $other = createUserWithCard('other2@gmail.com');

    $response = $this->actingAs($me)->postJson('/api/swipe-actions', [
        'to_user_id' => $other->id,
        'action' => 'like',
    ]);

    $response->assertCreated();
    $response->assertJsonPath('match', null);
});

it('creates a match on a mutual like', function () {
    $me = createUserWithCard('me3@gmail.com');
    $other = createUserWithCard('other3@gmail.com');

    SwipeAction::create([
        'from_user_id' => $other->id,
        'to_user_id' => $me->id,
        'action' => 'like',
    ]);

    $response = $this->actingAs($me)->postJson('/api/swipe-actions', [
        'to_user_id' => $other->id,
        'action' => 'like',
    ]);

    $response->assertCreated();
    $response->assertJsonPath('match.id', fn ($id) => $id !== null);
    expect($me->fresh()->matches()->count())->toBe(1);
    expect($other->fresh()->matches()->count())->toBe(1);
});

it('rejects swiping on the same user twice', function () {
    $me = createUserWithCard('me4@gmail.com');
    $other = createUserWithCard('other4@gmail.com');

    SwipeAction::create([
        'from_user_id' => $me->id,
        'to_user_id' => $other->id,
        'action' => 'skip',
    ]);

    $response = $this->actingAs($me)->postJson('/api/swipe-actions', [
        'to_user_id' => $other->id,
        'action' => 'like',
    ]);

    $response->assertUnprocessable();
});
