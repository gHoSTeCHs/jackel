<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Transaction;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(): Response
    {
        $transactions = Transaction::query()
            ->with(['client', 'client.user'])
            ->get();

        $clients = Client::query()
            ->with(['user'])
            ->get();

        return Inertia::render('admin/transactions', [
            'transactions' => $transactions,
            'clients' => $clients,
        ]);
    }
}
