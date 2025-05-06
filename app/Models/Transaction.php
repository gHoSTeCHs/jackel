<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'transaction_code',
        'client_id',
        'type',
        'amount',
        'description',
        'status'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'status' => 'boolean'
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public static function generateTransactionCode(): string
    {
        return strtoupper(uniqid('TXN'));
    }
}
