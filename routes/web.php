<?php

use App\Http\Controllers\AdminDashboardController;
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
});

Route::get('/client', function () {
    return Inertia::render('client/pages/dashboard');
})->name('client.dashboard');
Route::get('/client-account', function () {
    return Inertia::render('client/pages/account');
});
Route::get('/client-bank-account', function () {
    return Inertia::render('client/pages/bank-accounts');
});

// Transfers
Route::get('/transfer', function () {
    return Inertia::render('client/pages/transfer');
});
Route::get('/transfer-money', function () {
    return Inertia::render('client/pages/transfer-money');
});
Route::get('/transfer-money/same-bank', function () {
    return Inertia::render('client/pages/transfer/same-bank-transfer');
});
Route::get('/transfer-money/local-bank', function () {
    return Inertia::render('client/pages/transfer/local-bank-transfer');
});
Route::get('/transfer-money/international', function () {
    return Inertia::render('client/pages/transfer/international-transfer');
});

// Transactions
Route::get('/transactions', function () {
    return Inertia::render('client/pages/transactions');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
