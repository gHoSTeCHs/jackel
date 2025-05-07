<?php

namespace Database\Factories;

use App\Models\AccountType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccountType>
 */
class AccountTypeFactory extends Factory
{
    protected $model = AccountType::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Savings Account',
                'Checking Account',
                'Business Account',
                'Student Account',
                'Fixed Deposit Account'
            ]),
            'description' => $this->faker->sentence(),
            'minimum_balance' => $this->faker->randomFloat(2, 0, 1000),
            'interest_rate' => $this->faker->randomFloat(2, 0.5, 5.0)
        ];
    }
}