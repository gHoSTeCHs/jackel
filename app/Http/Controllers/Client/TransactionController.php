<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(Request $request): Response
    {
        $transactions = Transaction::with(['client.user'])
            ->where('client_id', Auth::user()->client->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('client/pages/transactions', [
            'transactions' => $transactions
        ]);
    }
}
