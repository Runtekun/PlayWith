<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MatchRecord extends Model
{
    protected $table = 'matches';

    const UPDATED_AT = null;

    public function matchUsers(): HasMany
    {
        return $this->hasMany(MatchUser::class, 'match_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'match_users', 'match_id', 'user_id');
    }
}
