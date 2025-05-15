<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Transaction;
use App\Models\Account;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(): Response
    {
        $transactions = Transaction::query()
            ->with(['account', 'account.client', 'account.client.user'])
            ->get();

        $accounts = Account::query()
            ->with(['client', 'client.user'])
            ->get();

        return Inertia::render('admin/transactions', [
            'transactions' => $transactions,
            'accounts' => $accounts,
        ]);
    }

    public function store(): RedirectResponse
    {
        $data = request()->validate([
            'client_id' => ['required', 'exists:accounts,id'],
            'type' => ['required', 'in:deposit,withdrawal,same-bank-transfer,local-bank-transfer,international-transfer'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'currency' => ['nullable', 'string'],
            'recipient_account' => ['required_if:type,same-bank-transfer,local-bank-transfer,international-transfer'],
            'recipient_name' => ['required_if:type,same-bank-transfer,local-bank-transfer,international-transfer'],
            'bank_name' => ['required_if:type,local-bank-transfer,international-transfer'],
            'bank_address' => ['required_if:type,international-transfer'],
            'swift_code' => ['required_if:type,international-transfer'],
            'beneficiary_address' => ['required_if:type,international-transfer'],
            'reference' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        try {
            DB::beginTransaction();

            $account = Account::findOrFail($data['client_id']);

            if ($data['type'] === 'withdrawal' && $account->balance < $data['amount']) {
                throw ValidationException::withMessages([
                    'amount' => ['Insufficient balance for withdrawal'],
                ]);
            }

            $transaction = new Transaction([
                'transaction_code' => 'TXN-' . strtoupper(Str::random(10)),
                'type' => $data['type'],
                'amount' => $data['amount'],
                'currency' => $data['currency'] ?? 'USD',
                'recipient_account' => $data['recipient_account'] ?? null,
                'recipient_name' => $data['recipient_name'] ?? null,
                'bank_name' => $data['bank_name'] ?? null,
                'bank_address' => $data['bank_address'] ?? null,
                'swift_code' => $data['swift_code'] ?? null,
                'beneficiary_address' => $data['beneficiary_address'] ?? null,
                'reference' => $data['reference'] ?? null,
                'description' => $data['description'] ?? null,
                'status' => 'completed',
            ]);

            $account->transactions()->save($transaction);

            // Update account balance
            if ($data['type'] === 'deposit') {
                $account->balance += $data['amount'];
            } elseif ($data['type'] === 'withdrawal') {
                $account->balance -= $data['amount'];
            } elseif (in_array($data['type'], ['same-bank-transfer', 'local-bank-transfer', 'international-transfer'])) {
                $account->balance -= $data['amount'];
            }

            $account->save();

            DB::commit();

            return redirect()->back()->with('success', 'Transaction created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
