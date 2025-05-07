<?php

namespace Database\Factories;

use App\Models\AccountType;
use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => Client::generateClientId(),
            'account_number' => Client::generateAccountNumber(),
            'user_id' => User::factory(),
            'account_type_id' => AccountType::factory(),
            'status' => $this->faker->boolean(80), // 80% chance of being active
            'balance' => $this->faker->randomFloat(2, 100, 50000)
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterMaking(function (Client $client) {
            //
        })->afterCreating(function (Client $client) {
            //
        });
    }
}