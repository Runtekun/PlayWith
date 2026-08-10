<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function playerCard(): HasOne
    {
        return $this->hasOne(PlayerCard::class);
    }

    public function sentSwipeActions(): HasMany
    {
        return $this->hasMany(SwipeAction::class, 'from_user_id');
    }

    public function receivedSwipeActions(): HasMany
    {
        return $this->hasMany(SwipeAction::class, 'to_user_id');
    }

    public function matches(): BelongsToMany
    {
        return $this->belongsToMany(MatchRecord::class, 'match_users', 'user_id', 'match_id');
    }
}
