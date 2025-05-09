<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $client = Client::query()->where('user_id', Auth::id())->first();

        $transactions = Transaction::query()->where('client_id', $client->id)
            ->with(['client', 'client.user'])
            ->latest()
            ->take(10)
            ->get();

        $stats = [
            'deposits' => Transaction::query()->where('client_id', $client->id)
                ->where('type', Transaction::TYPE_DEPOSIT)
                ->where('status', Transaction::STATUS_COMPLETED)
                ->sum('amount'),
            'withdrawals' => Transaction::query()->where('client_id', $client->id)
                ->where('type', Transaction::TYPE_WITHDRAWAL)
                ->where('status', Transaction::STATUS_COMPLETED)
                ->sum('amount'),
            'transfers' => Transaction::query()->where('client_id', $client->id)
                ->whereIn('type', [
                    Transaction::TYPE_SAME_BANK,
                    Transaction::TYPE_LOCAL_BANK,
                    Transaction::TYPE_INTERNATIONAL
                ])
                ->where('status', Transaction::STATUS_COMPLETED)
                ->sum('amount')
        ];

        return Inertia::render('client/pages/dashboard', [
            'transactions' => $transactions,
            'stats' => $stats,
            'balance' => $client->balance
        ]);
    }
}
