<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransferController extends Controller
{
    public function index()
    {
        return Inertia::render('client/pages/transfer');
    }

    private function validateTransferRequest(Request $request)
    {
        return $request->validate([
            'fromAccount' => 'required|string',
            'amount' => 'required|numeric|min:0.01',
            'reference' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);
    }

    private function validateRecipientDetails(Request $request, string $transferType)
    {
        $rules = [
            'accountNumber' => 'required|string',
            'accountName' => 'required|string|max:255',
        ];

        if ($transferType === 'local-bank' || $transferType === 'international') {
            $rules['bankName'] = 'required|string|max:255';
        }

        if ($transferType === 'international') {
            $rules = array_merge($rules, [
                'swiftCode' => 'required|string|max:11',
                'bankAddress' => 'required|string|max:1000',
                'beneficiaryAddress' => 'required|string|max:1000',
                'currency' => 'required|string|size:3',
            ]);
        }

        return $request->validate($rules);
    }

    private function checkSufficientBalance(Client $client, float $amount): bool
    {
        return $client->balance >= $amount;
    }

    private function processTransfer(array $data, string $transferType): JsonResponse
    {
        $client = Auth::user()->client;

        if (!$this->checkSufficientBalance($client, $data['amount'])) {
            return response()->json(['message' => 'Insufficient balance'], 422);
        }

        try {
            DB::beginTransaction();


            $transaction = new Transaction([
                'transaction_code' => 'TRX' . Str::random(10),
                'type' => $transferType,
                'amount' => $data['amount'],
                'currency' => $data['currency'] ?? 'USD',
                'status' => 'completed',
                'client_id' => $client->id,
                'recipient_account' => $data['accountNumber'],
                'recipient_name' => $data['accountName'],
                'bank_name' => $data['bankName'] ?? null,
                'bank_address' => $data['bankAddress'] ?? null,
                'swift_code' => $data['swiftCode'] ?? null,
                'beneficiary_address' => $data['beneficiaryAddress'] ?? null,
                'reference' => $data['reference'],
                'description' => $data['description'],
            ]);

            $transaction->save();

            // Update client balance
            $client->balance -= $data['amount'];
            $client->save();

            DB::commit();

            return response()->json([
                'message' => 'Transfer completed successfully',
                'transaction' => $transaction,
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Transfer failed. Please try again.'], 500);
        }
    }

    public function sameBankTransfer(Request $request): JsonResponse
    {
        $data = array_merge(
            $this->validateTransferRequest($request),
            $this->validateRecipientDetails($request, 'same-bank')
        );

        return $this->processTransfer($data, 'same-bank-transfer');
    }

    public function localBankTransfer(Request $request): JsonResponse
    {
        $data = array_merge(
            $this->validateTransferRequest($request),
            $this->validateRecipientDetails($request, 'local-bank')
        );

        return $this->processTransfer($data, 'local-bank-transfer');
    }

    public function internationalTransfer(Request $request): JsonResponse
    {
        $data = array_merge(
            $this->validateTransferRequest($request),
            $this->validateRecipientDetails($request, 'international')
        );

        return $this->processTransfer($data, 'international-transfer');
    }
}
