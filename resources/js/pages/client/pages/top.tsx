import { Link } from '@inertiajs/react';
import { ArrowLeft, Building, CheckCircle, CreditCard, DollarSign, Globe, User } from 'lucide-react';
import { useState } from 'react';

import { FormInput, FormSelect, StepIndicator, TransferSummary } from './transfer/components';
import { InternationalFormData } from './transfer/types';

const InternationalTransferForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<InternationalFormData>({
        fromAccount: '',
        bankName: '',
        bankAddress: '',
        swiftCode: '',
        accountNumber: '',
        beneficiaryName: '',
        beneficiaryAddress: '',
        amount: '',
        currency: 'USD',
        reference: '',
        description: '',
        purpose: '',
    });

    const [accounts] = useState([
        { value: '1234567890', label: 'Checking Account - 1234567890 ($3,245.70)' },
        { value: '9876543210', label: 'Savings Account - 9876543210 ($12,500.00)' },
    ]);

    const currencies = [
        { value: 'USD', label: 'USD - US Dollar' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - British Pound' },
        { value: 'JPY', label: 'JPY - Japanese Yen' },
        { value: 'AUD', label: 'AUD - Australian Dollar' },
    ];

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
        <div className="mx-auto max-w-3xl p-4">
            <div className="mb-4">
                <Link href="/transfer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Back to Transfer Options</span>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="bg-gray-800 px-6 py-4">
                    <h2 className="flex items-center text-xl font-semibold text-white">
                        <Globe className="mr-2 h-5 w-5" />
                        International Wire Transfer
                    </h2>
                    <p className="text-sm text-gray-300">Send money internationally</p>
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
                                        icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Bank Name"
                                        placeholder="Enter bank name"
                                        value={formData.bankName}
                                        onChange={(e) => handleChange('bankName', e.target.value)}
                                        icon={<Building className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="SWIFT/BIC Code"
                                        placeholder="Enter SWIFT code"
                                        value={formData.swiftCode}
                                        onChange={(e) => handleChange('swiftCode', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Account Number/IBAN"
                                        placeholder="Enter account number"
                                        value={formData.accountNumber}
                                        onChange={(e) => handleChange('accountNumber', e.target.value)}
                                        icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Beneficiary Name"
                                        placeholder="Enter beneficiary name"
                                        value={formData.beneficiaryName}
                                        onChange={(e) => handleChange('beneficiaryName', e.target.value)}
                                        icon={<User className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <div className="mb-4">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Beneficiary Address <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={formData.beneficiaryAddress}
                                            onChange={(e) => handleChange('beneficiaryAddress', e.target.value)}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            rows={3}
                                            placeholder="Enter beneficiary's full address"
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={(e) => handleChange('amount', e.target.value)}
                                        icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormSelect
                                        label="Currency"
                                        options={currencies}
                                        value={formData.currency}
                                        onChange={(e) => handleChange('currency', e.target.value)}
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
                                    className="rounded-md bg-gray-800 px-6 py-2 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 1 && (
                        <div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-1">
                                    <TransferSummary
                                        transferType="international"
                                        transferData={{
                                            fromAccount: formData.fromAccount,
                                            bank: formData.bankName,
                                            beneficiaryName: formData.beneficiaryName,
                                            amount: formData.amount,
                                            currency: formData.currency,
                                            reference: formData.reference,
                                        }}
                                        fee="$25.00"
                                        total={`$${Number(formData.amount) + 25}`}
                                        estimatedDelivery="2-3 business days"
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <h4 className="mb-2 font-medium">Important Information</h4>
                                        <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                                            <li>International transfers typically take 2-3 business days</li>
                                            <li>A transfer fee of $25.00 will be charged</li>
                                            <li>Exchange rates are subject to change</li>
                                            <li>Please verify all details before confirming</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={handleBack}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleContinue}
                                    className="rounded-md bg-gray-800 px-6 py-2 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Confirm Transfer
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-10 w-10 text-green-500" />
                            </div>

                            <h3 className="mb-2 text-xl font-semibold">Transfer Initiated Successfully!</h3>
                            <p className="mb-6 text-gray-500">
                                Your international wire transfer has been initiated. You will receive a confirmation email shortly.
                            </p>

                            <div className="mx-auto mb-8 max-w-md">
                                <TransferSummary
                                    transferType="international"
                                    transferData={{
                                        fromAccount: formData.fromAccount,
                                        bank: formData.bankName,
                                        beneficiaryName: formData.beneficiaryName,
                                        amount: formData.amount,
                                        currency: formData.currency,
                                        reference: formData.reference,
                                    }}
                                    fee="$25.00"
                                    total={`$${Number(formData.amount) + 25}`}
                                    estimatedDelivery="2-3 business days"
                                />
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
        </div>
    );
};

export default InternationalTransferForm;
