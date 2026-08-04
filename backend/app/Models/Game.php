<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name'])]
class Game extends Model
{
    public function ranks(): HasMany
    {
        return $this->hasMany(Rank::class)->orderBy('sort_order');
    }
}
