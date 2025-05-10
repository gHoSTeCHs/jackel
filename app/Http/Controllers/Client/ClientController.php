<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Transaction;
use App\Models\Account;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $client = Client::where('user_id', $user->id)->first();
        $accounts = Account::where('client_id', $client->id)->get();

        $accountIds = $accounts->pluck('id');

        $transactions = Transaction::whereIn('account_id', $accountIds)
            ->with(['account', 'client.user'])
            ->latest()
            ->take(10)
            ->get();

        $stats = [
            'deposits' => Transaction::whereIn('account_id', $accountIds)
                ->where('type', Transaction::TYPE_DEPOSIT)
                ->where('status', Transaction::STATUS_COMPLETED)
                ->sum('amount'),
            'withdrawals' => Transaction::whereIn('account_id', $accountIds)
                ->where('type', Transaction::TYPE_WITHDRAWAL)
                ->where('status', Transaction::STATUS_COMPLETED)
                ->sum('amount'),
            'transfers' => Transaction::whereIn('account_id', $accountIds)
                ->whereIn('type', [
                    Transaction::TYPE_SAME_BANK,
                    Transaction::TYPE_LOCAL_BANK,
                    Transaction::TYPE_INTERNATIONAL
                ])
                ->where('status', Transaction::STATUS_COMPLETED)
                ->sum('amount')
        ];

        $totalBalance = $accounts->sum('balance');

        return Inertia::render('client/pages/dashboard', [
            'transactions' => $transactions,
            'stats' => $stats,
            'balance' => $totalBalance,
            'accounts' => $accounts
        ]);
    }

    public function getAccounts(): Response
    {
        $user = Auth::user();
        $client = Client::where('user_id', $user->id)->first();
        $accounts = Account::where('client_id', $client->id)
            ->get()
            ->map(function ($account) {
                return [
                    'id' => $account->id,
                    'name' => $account->name,
                    'accountNumber' => $account->account_number,
                    'type' => $account->type,
                    'balance' => $account->balance,
                    'rate' => $account->interest_rate,
                    'dateOpened' => $account->created_at->format('Y-m-d'),
                    'owner' => $account->client->user->name
                ];
            });

        return Inertia::render('client/pages/bank-accounts', [
            'accounts' => $accounts
        ]);
    }
}
