<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Random\RandomException;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'account_number',
        'user_id',
        'account_type_id',
        'status',
        'balance'
    ];

    protected $casts = [
        'balance' => 'decimal:2',
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
        return str_pad((string)random_int(1000000000, 9999999999), 10, '0', STR_PAD_LEFT);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function accountType(): BelongsTo
    {
        return $this->belongsTo(AccountType::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
