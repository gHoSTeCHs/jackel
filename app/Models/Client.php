<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Random\RandomException;

class Client extends Model implements AuthenticatableContract
{
    use HasFactory, Authenticatable;

    protected $fillable = [
        'client_id',
        'user_id',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    public static function generateClientId(): string
    {
        $randomNumber = str_pad(random_int(1000, 9999), 4, '0', STR_PAD_LEFT);
        return "iBank-CLIENT-{$randomNumber}";
    }

    /**
     * @throws RandomException
     */
    public static function generateAccountNumber(): string
    {
        return str_pad((string) random_int(1000000000, 9999999999), 10, '0', STR_PAD_LEFT);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
