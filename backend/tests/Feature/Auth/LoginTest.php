<?php

use App\Models\User;

it('logs in with correct credentials', function () {
    $user = User::factory()->create([
        'email' => 'login@gmail.com',
        'password' => 'password123',
    ]);

    $response = $this->postJson('/api/login', [
        'email' => 'login@gmail.com',
        'password' => 'password123',
    ]);

    $response->assertOk();
    $this->assertAuthenticatedAs($user);
});

it('rejects login with an incorrect password', function () {
    User::factory()->create([
        'email' => 'login2@gmail.com',
        'password' => 'password123',
    ]);

    $response = $this->postJson('/api/login', [
        'email' => 'login2@gmail.com',
        'password' => 'wrongpassword',
    ]);

    $response->assertUnprocessable();
    $this->assertGuest();
});
