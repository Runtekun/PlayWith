<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

it('logs out an authenticated user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/logout');

    $response->assertNoContent();
    expect(Auth::guard('web')->user())->toBeNull();
});

it('rejects logout when not authenticated', function () {
    $response = $this->postJson('/api/logout');

    $response->assertUnauthorized();
});
