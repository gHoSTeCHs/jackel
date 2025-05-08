<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::query()->with(['user', 'accountType'])->get();
        return Inertia::render('admin/clients', [
            'clients' => $clients
        ]);
    }

    public function show(Client $client): Response
    {
        $client->load(['user', 'accountType', 'transactions']);
        return Inertia::render('admin/client-details', [
            'client' => $client
        ]);
    }

    public function update(Client $client)
    {
        $validated = request()->validate([
            'status' => 'required|boolean',
            'account_type_id' => 'required|exists:account_types,id'
        ]);

        $client->update($validated);

        return back()->with('success', 'Client updated successfully');
    }

    public function createTransaction(Client $client)
    {
        $validated = request()->validate([
            'amount' => 'required|numeric',
            'type' => 'required|in:deposit,withdrawal,transfer',
            'description' => 'required|string'
        ]);

        $client->transactions()->create($validated);

        if ($validated['type'] === 'deposit') {
            $client->increment('balance', $validated['amount']);
        } else if ($validated['type'] === 'withdrawal') {
            $client->decrement('balance', $validated['amount']);
        }

        return back()->with('success', 'Transaction created successfully');
    }

    public function updateBalance(Client $client)
    {
        $validated = request()->validate([
            'amount' => 'required|numeric',
            'operation' => 'required|in:add,subtract'
        ]);

        if ($validated['operation'] === 'add') {
            $client->increment('balance', $validated['amount']);
        } else {
            $client->decrement('balance', $validated['amount']);
        }

        return back()->with('success', 'Balance updated successfully');
    }
}
