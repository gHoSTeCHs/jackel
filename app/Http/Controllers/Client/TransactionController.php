<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(Request $request): Response
    {
        $client = Auth::user()->client;
        $accountIds = Account::where('client_id', $client->id)->pluck('id');

        $transactions = Transaction::with(['account', 'client.user'])
            ->whereIn('account_id', $accountIds)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('client/pages/transactions', [
            'transactions' => $transactions
        ]);
    }
}
