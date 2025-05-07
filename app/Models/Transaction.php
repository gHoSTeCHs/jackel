<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;


    public const TYPE_DEPOSIT = 'deposit';
    public const TYPE_WITHDRAWAL = 'withdrawal';
    public const TYPE_SAME_BANK = 'same-bank-transfer';
    public const TYPE_LOCAL_BANK = 'local-bank-transfer';
    public const TYPE_INTERNATIONAL = 'international-transfer';

    // Transaction Statuses
    public const STATUS_PENDING = 'pending';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_FAILED = 'failed';
    public const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'transaction_code',
        'client_id',
        'type',
        'amount',
        'currency',
        'recipient_account',
        'recipient_name',
        'bank_name',
        'bank_address',
        'swift_code',
        'beneficiary_address',
        'reference',
        'description',
        'status'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'status' => 'string'
    ];

    public function isTransfer(): bool
    {
        return in_array($this->type, [
            self::TYPE_SAME_BANK,
            self::TYPE_LOCAL_BANK,
            self::TYPE_INTERNATIONAL
        ]);
    }

    public function isInternational(): bool
    {
        return $this->type === self::TYPE_INTERNATIONAL;
    }

    public function requiresBankDetails(): bool
    {
        return in_array($this->type, [
            self::TYPE_LOCAL_BANK,
            self::TYPE_INTERNATIONAL
        ]);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public static function generateTransactionCode(): string
    {
        return strtoupper(uniqid('TXN'));
    }
}
