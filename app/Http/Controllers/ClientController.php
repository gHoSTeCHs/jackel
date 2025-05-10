<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::query()
            ->with(['user', 'accounts.accountType'])
            ->get()
            ->map(function ($client) {
                $client->total_balance = $client->accounts->sum('balance');
                return $client;
            });

        return Inertia::render('admin/clients', [
            'clients' => $clients
        ]);
    }

    public function createClient(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'account_type_id' => 'required|exists:account_types,id',
            'initial_deposit' => 'required|numeric|min:0'
        ]);

        $user = User::query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make(Str::random(10)), // Generate a random password
            'role' => 'user',
        ]);

        $client = Client::create([
            'user_id' => $user->id,
        ]);

        $account = Account::create([
            'client_id' => $client->id,
            'account_type_id' => $request->account_type_id,
            'account_number' => $this->generateAccountNumber(),
            'balance' => $request->initial_deposit,
            'status' => true
        ]);

        if ($request->initial_deposit > 0) {
            $account->transactions()->create([
                'type' => 'deposit',
                'amount' => $request->initial_deposit,
                'description' => 'Initial deposit',
                'status' => 'completed'
            ]);
        }

        return back()->with('success', 'Client created successfully');
    }

    public function show(Client $client): Response
    {
        $client->load(['user', 'accounts.accountType', 'accounts.transactions']);
        return Inertia::render('admin/client-details', [
            'client' => $client
        ]);
    }

    public function update(Client $client): RedirectResponse
    {
        $validated = request()->validate([
            'status' => 'required|boolean'
        ]);

        $client->accounts()->update(['status' => $validated['status']]);

        return back()->with('success', 'Client updated successfully');
    }

    public function createTransaction(Request $request, Client $client, Account $account): RedirectResponse
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:deposit,withdrawal,transfer',
            'description' => 'required|string'
        ]);

        if ($validated['type'] === 'withdrawal' && $account->balance < $validated['amount']) {
            return back()->with('error', 'Insufficient balance');
        }

        $transaction = $account->transactions()->create([
            'type' => $validated['type'],
            'amount' => $validated['amount'],
            'description' => $validated['description'],
            'status' => 'completed'
        ]);

        if ($validated['type'] === 'deposit') {
            $account->increment('balance', $validated['amount']);
        } else if ($validated['type'] === 'withdrawal') {
            $account->decrement('balance', $validated['amount']);
        }

        return back()->with('success', 'Transaction created successfully');
    }

    public function updateBalance(Request $request, Client $client, Account $account): RedirectResponse
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'operation' => 'required|in:add,subtract'
        ]);

        if ($validated['operation'] === 'subtract' && $account->balance < $validated['amount']) {
            return back()->with('error', 'Insufficient balance');
        }

        if ($validated['operation'] === 'add') {
            $account->increment('balance', $validated['amount']);
            $account->transactions()->create([
                'type' => 'deposit',
                'amount' => $validated['amount'],
                'description' => 'Manual balance adjustment (addition)',
                'status' => 'completed'
            ]);
        } else {
            $account->decrement('balance', $validated['amount']);
            $account->transactions()->create([
                'type' => 'withdrawal',
                'amount' => $validated['amount'],
                'description' => 'Manual balance adjustment (subtraction)',
                'status' => 'completed'
            ]);
        }

        return back()->with('success', 'Balance updated successfully');
    }

    private function generateAccountNumber(): string
    {
        do {
            $number = mt_rand(1000000000, 9999999999);
        } while (Account::where('account_number', $number)->exists());

        return (string) $number;
    }
}
