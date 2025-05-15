<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Client\AccountController;
use App\Http\Controllers\Client\ClientController as UserClientController;
use App\Http\Controllers\Client\TransactionController as UserTransactionController;
use App\Http\Controllers\Client\TransferController as UserTransferController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::prefix('admin/clients')->group(function () {
        Route::get('/', [ClientController::class, 'index'])->name('admin.clients.index');
        Route::get('/{client}', [ClientController::class, 'show'])->name('admin.clients.show');
        Route::put('/{client}', [ClientController::class, 'update'])->name('admin.clients.update');
        Route::post('/{client}/transactions', [ClientController::class, 'createTransaction'])->name('admin.clients.transactions.store');
        Route::post('/{client}/balance', [ClientController::class, 'updateBalance'])->name('admin.clients.balance.update');
    });

    Route::get('admin/transactions', [TransactionController::class, 'index'])->name('admin.transactions.index');
    Route::post('admin/transactions', [TransactionController::class, 'store'])->name('admin.transactions.store');

});

// Client Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('client/login', function () {
        return Inertia::render('client/auth/login');
    })->name('client.login');

    Route::get('client/register', function () {
        return Inertia::render('client/auth/register');
    })->name('client.register');
});

// Protected Client Routes
Route::middleware(['client', 'verified'])->prefix('client')->group(function () {
    Route::get('/dashboard', [UserClientController::class, 'index'])->name('client.dashboard');

    Route::get('/account', function () {
        return Inertia::render('client/pages/account');
    })->name('client.account');

    Route::get('/accounts/search', [AccountController::class, 'search'])->name('client.accounts.search');
    Route::get('/accounts/user', [AccountController::class, 'getUserAccounts'])->name('client.accounts.user');

    Route::get('/bank-accounts',[AccountController::class, 'getBankAccounts'])->name('client.accounts.bank-accounts');

    // Transfers
    Route::prefix('transfer')->group(function () {
        Route::get('/', [UserTransferController::class, 'index'])->name('client.transfer');

        Route::get('/money', function () {
            return Inertia::render('client/pages/transfer-money');
        })->name('client.transfer.money');

        Route::get('/same-bank', function () {
            return Inertia::render('client/pages/transfer/same-bank-transfer');
        })->name('client.transfer.same-bank');
        Route::post('/same-bank', [UserTransferController::class, 'sameBankTransfer'])->name('client.transfer.same-bank.process');

        Route::get('/local-bank', function () {
            return Inertia::render('client/pages/transfer/local-bank-transfer');
        })->name('client.transfer.local-bank');
        Route::post('/local-bank', [UserTransferController::class, 'localBankTransfer'])->name('client.transfer.local-bank.process');

        Route::get('/international', function () {
            return Inertia::render('client/pages/transfer/international-transfer');
        })->name('client.transfer.international');
        Route::post('/international', [UserTransferController::class, 'internationalTransfer'])->name('client.transfer.international.process');
    });

    // Transactions
    Route::get('/transactions', [UserTransactionController::class, 'index'])->name('client.transactions');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
