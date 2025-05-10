<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\AccountType;
use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_number' => Account::generateAccountNumber(),
            'client_id' => Client::factory(),
            'account_type_id' => AccountType::factory(),
            'status' => $this->faker->boolean(80),
            'balance' => $this->faker->randomFloat(2, 100, 50000)
        ];
    }
}
