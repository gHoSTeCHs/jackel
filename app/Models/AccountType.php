<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'minimum_balance',
        'interest_rate'
    ];

    protected $casts = [
        'minimum_balance' => 'decimal:2',
        'interest_rate' => 'decimal:2'
    ];

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }
}
