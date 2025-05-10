<?php

namespace Database\Seeders;

use App\Models\AccountType;
use App\Models\Client;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        if (!User::where('role', 'admin')->exists()) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'role' => 'admin',
                'password' => Hash::make('password')
            ]);
        }

        $accountTypes = collect([
            AccountType::factory()->create([
                'name' => 'Fixed Deposit Account',
                'description' => 'A high-interest savings account with a fixed term',
                'minimum_balance' => 1000,
                'interest_rate' => 4.5
            ]),
            AccountType::factory()->create([
                'name' => 'Checking Account',
                'description' => 'A transactional account for daily banking needs',
                'minimum_balance' => 100,
                'interest_rate' => 0.5
            ]),
            AccountType::factory()->create([
                'name' => 'Business Account',
                'description' => 'An account designed for business transactions and management',
                'minimum_balance' => 5000,
                'interest_rate' => 2.0
            ]),
            AccountType::factory()->create([
                'name' => 'Savings Account',
                'description' => 'A basic savings account with competitive interest rates',
                'minimum_balance' => 500,
                'interest_rate' => 3.0
            ])
        ]);


        User::factory(10)
            ->create(['role' => 'user'])
            ->each(function ($user) use ($accountTypes) {
                $client = Client::factory()->create([
                    'user_id' => $user->id
                ]);

                $selectedTypes = $accountTypes->random(rand(2, 3));
                foreach ($selectedTypes as $accountType) {
                    $client->accounts()->create([
                        'account_number' => Client::generateAccountNumber(),
                        'account_type_id' => $accountType->id,
                        'balance' => rand(1000, 10000)
                    ]);
                }
            });


        Client::all()->each(function ($client) {
            $client->accounts->each(function ($account) {
                Transaction::factory(rand(5, 10))->create([
                    'client_id' => $account->client_id,
                    'account_id' => $account->id
                ]);
            });
        });
    }
}
