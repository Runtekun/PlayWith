<?php

use App\Models\User;

it('registers a new user and logs them in', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'テストユーザー',
        'email' => 'newuser@gmail.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertCreated();
    $response->assertJsonMissingPath('user.password');
    expect(User::where('email', 'newuser@gmail.com')->exists())->toBeTrue();
    $this->assertAuthenticated();
});

it('rejects registration with a duplicate email', function () {
    User::factory()->create(['email' => 'existing@gmail.com']);

    $response = $this->postJson('/api/register', [
        'name' => 'テストユーザー',
        'email' => 'existing@gmail.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors('email');
});

it('rejects registration when passwords do not match', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'テストユーザー',
        'email' => 'newuser2@gmail.com',
        'password' => 'password123',
        'password_confirmation' => 'different123',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors('password');
});

it('rejects a password containing symbols', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'テストユーザー',
        'email' => 'newuser3@gmail.com',
        'password' => 'pass@word123',
        'password_confirmation' => 'pass@word123',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors('password');
});
