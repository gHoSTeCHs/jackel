<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('query');

        if (empty($query) || strlen($query) < 3) {
            return response()->json(['accounts' => []]);
        }

        $accounts = Account::query()
            ->with(['client.user'])
            ->where('account_number', 'like', "%{$query}%")
            ->where('status', true)
            ->where('client_id', '!=', Auth::user()->client->id)
            ->limit(5)
            ->get()
            ->map(function ($account) {
                return [
                    'account_number' => $account->account_number,
                    'account_holder' => $account->client->user->name,
                    'display_text' => $account->account_number . ' - ' . $account->client->user->name
                ];
            });

        return response()->json(['accounts' => $accounts]);
    }

    public function getUserAccounts(): JsonResponse
    {
        $accounts = Auth::user()->client->accounts()
            ->with(['accountType'])
            ->where('status', true)
            ->get()
            ->map(function ($account) {
                return [
                    'value' => $account->account_number,
                    'label' => sprintf(
                        '%s - %s ($%s)',
                        $account->accountType->name,
                        $account->account_number,
                        number_format($account->balance, 2)
                    )
                ];
            });

        return response()->json(['accounts' => $accounts]);
    }

    public function getBankAccounts(): Response
    {
        $accounts = Auth::user()->client->accounts()
            ->with(['accountType', 'client.user'])
            ->get()
            ->map(function ($account) {
                return [
                    'id' => $account->id,
                    'name' => $account->accountType->name,
                    'accountNumber' => $account->account_number,
                    'rate' => $account->interest_rate . '%',
                    'type' => $account->accountType->name,
                    'owner' => $account->client->user->name,
                    'dateOpened' => $account->created_at->format('Y-m-d'),
                    'balance' => $account->balance
                ];
            });

        return Inertia::render('client/pages/bank-accounts', [
            'accounts' => $accounts
        ]);
    }
}
