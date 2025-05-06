import { Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Landmark } from 'lucide-react';
import { useState } from 'react';

import { FormInput, FormSelect, StepIndicator, TransferSummary } from './components';

interface LocalBankFormData {
    fromAccount: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    amount: string;
    reference: string;
    description: string;
}

export const LocalBankTransfer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<LocalBankFormData>({
        fromAccount: '',
        bankName: '',
        accountNumber: '',
        accountName: '',
        amount: '',
        reference: '',
        description: '',
    });

    const [accounts] = useState([
        { value: '1234567890', label: 'Checking Account - 1234567890 ($3,245.70)' },
        { value: '9876543210', label: 'Savings Account - 9876543210 ($12,500.00)' },
    ]);

    const steps = ['Account Details', 'Confirm Transfer', 'Transfer Complete'];

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleContinue = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep(currentStep + 1);
    };

    return (
        <section>
            <div className="mb-4">
                <Link href="/transfer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Back to Transfer Options</span>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="bg-blue-500 px-6 py-4">
                    <h2 className="flex items-center text-xl font-semibold text-white">
                        <Landmark className="mr-2 h-5 w-5" />
                        Local Bank Transfer
                    </h2>
                    <p className="text-sm text-blue-50">Send money to other local bank accounts</p>
                </div>

                <div className="p-6">
                    <StepIndicator steps={steps} currentStep={currentStep} />

                    {currentStep === 0 && (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <FormSelect
                                        label="From Account"
                                        options={accounts}
                                        value={formData.fromAccount}
                                        onChange={(e) => handleChange('fromAccount', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <FormSelect
                                        label="Bank Name"
                                        options={[
                                            { value: 'bank1', label: 'First National Bank' },
                                            { value: 'bank2', label: 'City Trust Bank' },
                                            { value: 'bank3', label: 'Metro Bank' },
                                        ]}
                                        value={formData.bankName}
                                        onChange={(e) => handleChange('bankName', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Account Number"
                                        placeholder="Enter account number"
                                        value={formData.accountNumber}
                                        onChange={(e) => handleChange('accountNumber', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Account Name"
                                        placeholder="Enter account name"
                                        value={formData.accountName}
                                        onChange={(e) => handleChange('accountName', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={(e) => handleChange('amount', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Reference"
                                        placeholder="e.g., Invoice payment"
                                        value={formData.reference}
                                        onChange={(e) => handleChange('reference', e.target.value)}
                                        required={false}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <div className="mb-4">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            rows={3}
                                            placeholder="Additional details about this transfer"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 1 && (
                        <div>
                            <TransferSummary
                                data={[
                                    { label: 'From Account', value: formData.fromAccount },
                                    { label: 'Bank Name', value: formData.bankName },
                                    { label: 'Account Number', value: formData.accountNumber },
                                    { label: 'Account Name', value: formData.accountName },
                                    { label: 'Amount', value: `$${formData.amount}` },
                                    { label: 'Reference', value: formData.reference || 'N/A' },
                                    { label: 'Description', value: formData.description || 'N/A' },
                                ]}
                                transferType={'same-bank'}
                                transferData={{
                                    fromAccount: undefined,
                                    toAccount: undefined,
                                    beneficiaryName: undefined,
                                    bank: undefined,
                                    amount: undefined,
                                    currency: undefined,
                                    reference: undefined,
                                }}
                                fee={''}
                                total={''}
                                estimatedDelivery={''}
                            />

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={handleBack}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleContinue}
                                    className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Confirm Transfer
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="py-6 text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                                <CheckCircle className="h-10 w-10 text-blue-500" />
                            </div>

                            <h3 className="mb-2 text-xl font-semibold">Transfer Successful!</h3>
                            <p className="mb-6 text-gray-500">Your transfer has been processed successfully.</p>

                            <div className="mx-auto mb-6 max-w-md rounded-lg bg-gray-50 p-4">
                                <p className="text-sm text-gray-600">
                                    Transaction Reference: <span className="font-medium">TRX{Math.random().toString(36).substr(2, 9)}</span>
                                </p>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Link
                                    href="/transfer"
                                    className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Make Another Transfer
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Back to Dashboard
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LocalBankTransfer;
