<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Client;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement([
            'deposit',
            'withdrawal',
            'same-bank-transfer',
            'local-bank-transfer',
            'international-transfer'
        ]);

        $baseData = [
            'transaction_code' => Transaction::generateTransactionCode(),
            'client_id' => Client::factory(),
            'account_id' => Account::factory(),
            'type' => $type,
            'amount' => $this->faker->randomFloat(2, 10, 5000),
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed', 'cancelled']),
            'currency' => 'USD',
        ];

        if (in_array($type, ['same-bank-transfer', 'local-bank-transfer', 'international-transfer'])) {
            $baseData = array_merge($baseData, [
                'recipient_account' => $this->faker->numerify('##########'),
                'recipient_name' => $this->faker->name(),
                'reference' => $this->faker->word(),
            ]);

            if (in_array($type, ['local-bank-transfer', 'international-transfer'])) {
                $baseData['bank_name'] = $this->faker->company();
            }

            if ($type === 'international-transfer') {
                $baseData = array_merge($baseData, [
                    'currency' => $this->faker->randomElement(['USD', 'EUR', 'GBP', 'JPY', 'AUD']),
                    'bank_address' => $this->faker->address(),
                    'swift_code' => $this->faker->regexify('[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?'),
                    'beneficiary_address' => $this->faker->address(),
                ]);
            }
        }

        return $baseData;
    }

    public function deposit(): self
    {
        return $this->state(function (array $attributes) {
            return ['type' => 'deposit'];
        });
    }

    public function withdrawal(): self
    {
        return $this->state(function (array $attributes) {
            return ['type' => 'withdrawal'];
        });
    }

    public function sameBankTransfer(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'same-bank-transfer',
                'recipient_account' => $this->faker->numerify('##########'),
                'recipient_name' => $this->faker->name(),
                'reference' => $this->faker->word(),
            ];
        });
    }

    public function localBankTransfer(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'local-bank-transfer',
                'recipient_account' => $this->faker->numerify('##########'),
                'recipient_name' => $this->faker->name(),
                'bank_name' => $this->faker->company(),
                'reference' => $this->faker->word(),
            ];
        });
    }

    public function internationalTransfer(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'international-transfer',
                'currency' => $this->faker->randomElement(['EUR', 'GBP', 'JPY', 'AUD']),
                'recipient_account' => $this->faker->numerify('##########'),
                'recipient_name' => $this->faker->name(),
                'bank_name' => $this->faker->company(),
                'bank_address' => $this->faker->address(),
                'swift_code' => $this->faker->regexify('[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?'),
                'beneficiary_address' => $this->faker->address(),
                'reference' => $this->faker->word(),
            ];
        });
    }
}
