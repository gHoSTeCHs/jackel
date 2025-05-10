<?php

namespace App\Http\Controllers;

use App\Models\AccountType;
use App\Models\Account;
use App\Models\Client;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $totalClients = Client::count();
        $totalAccounts = Account::count();
        $totalDeposits = Transaction::where('type', Transaction::TYPE_DEPOSIT)
            ->where('status', Transaction::STATUS_COMPLETED)
            ->sum('amount');
        $totalWithdrawals = Transaction::where('type', Transaction::TYPE_WITHDRAWAL)
            ->where('status', Transaction::STATUS_COMPLETED)
            ->sum('amount');
        $totalTransfers = Transaction::whereIn('type', [
            Transaction::TYPE_SAME_BANK,
            Transaction::TYPE_LOCAL_BANK,
            Transaction::TYPE_INTERNATIONAL
        ])
            ->where('status', Transaction::STATUS_COMPLETED)
            ->sum('amount');
        $totalBalance = Account::sum('balance');

        $accountTypeData = AccountType::select('name')
            ->selectRaw('COUNT(accounts.id) as value')
            ->leftJoin('accounts', 'account_types.id', '=', 'accounts.account_type_id')
            ->groupBy('account_types.id', 'name')
            ->get()
            ->toArray();

        $transactionData = Transaction::select('type as name')
            ->selectRaw('COUNT(*) as value')
            ->where('status', Transaction::STATUS_COMPLETED)
            ->groupBy('type')
            ->get()
            ->toArray();

        return Inertia::render('dashboard', [
            'statistics' => [
                'totalClients' => $totalClients,
                'totalAccounts' => $totalAccounts,
                'totalDeposits' => $totalDeposits,
                'totalWithdrawals' => $totalWithdrawals,
                'totalTransfers' => $totalTransfers,
                'totalBalance' => $totalBalance,
            ],
            'accountTypeData' => $accountTypeData,
            'transactionData' => $transactionData,
        ]);
    }
}
