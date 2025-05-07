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
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => Hash::make('password')
        ]);

        // Create account types
        $accountTypes = AccountType::factory(5)->create();

        // Create regular users with client accounts
        User::factory(10)
            ->create(['role' => 'user'])
            ->each(function ($user) use ($accountTypes) {
                Client::factory()
                    ->create([
                        'user_id' => $user->id,
                        'account_type_id' => $accountTypes->random()->id
                    ]);
            });

        // Create some transactions for each client
        Client::all()->each(function ($client) {
            Transaction::factory(5)->create(['client_id' => $client->id]);
        });
    }
}
