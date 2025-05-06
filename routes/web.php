<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/client', function () {
    return Inertia::render('client/pages/dashboard');
});
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
    return Inertia::render('client/pages/transfer-money');
});
Route::get('/transfer-money/local-bank', function () {
    return Inertia::render('client/pages/transfer-money');
});
Route::get('/transfer-money/international', function () {
    return Inertia::render('client/pages/transfer-money');
});

// Transactions
Route::get('/transactions', function () {
    return Inertia::render('client/pages/transactions');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
