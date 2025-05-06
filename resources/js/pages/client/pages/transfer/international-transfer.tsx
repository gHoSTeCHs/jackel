import { Link } from '@inertiajs/react';
import { ArrowLeft, Building, CheckCircle, CreditCard, DollarSign, Globe2, User } from 'lucide-react';
import { useState } from 'react';

import MainLayout from '../../layouts/main-layout';
import { FormInput, FormSelect, StepIndicator, TransferSummary } from './components';

interface InternationalFormData {
    fromAccount: string;
    bankName: string;
    bankAddress: string;
    swiftCode: string;
    accountNumber: string;
    beneficiaryName: string;
    beneficiaryAddress: string;
    amount: string;
    currency: string;
    reference: string;
    description: string;
}

export const InternationalTransfer = () => {
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
        <MainLayout>
            <div className="mx-auto max-w-3xl p-4">
                <div className="mb-4">
                    <Link href="/transfer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        <span>Back to Transfer Options</span>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="bg-purple-500 px-6 py-4">
                        <h2 className="flex items-center text-xl font-semibold text-white">
                            <Globe2 className="mr-2 h-5 w-5" />
                            International Wire Transfer
                        </h2>
                        <p className="text-sm text-purple-50">Send money internationally to any bank worldwide</p>
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

                                    <div className="md:col-span-2">
                                        <div className="mb-4">
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Bank Address <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                value={formData.bankAddress}
                                                onChange={(e) => handleChange('bankAddress', e.target.value)}
                                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                rows={3}
                                                placeholder="Enter bank's full address"
                                                required
                                            ></textarea>
                                        </div>
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
                                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
                                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                rows={3}
                                                placeholder="Additional details about this transfer"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-purple-500 px-6 py-2 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
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
                                        { label: 'Bank Address', value: formData.bankAddress },
                                        { label: 'SWIFT/BIC Code', value: formData.swiftCode },
                                        { label: 'Account Number/IBAN', value: formData.accountNumber },
                                        { label: 'Beneficiary Name', value: formData.beneficiaryName },
                                        { label: 'Beneficiary Address', value: formData.beneficiaryAddress },
                                        { label: 'Amount', value: `${formData.amount} ${formData.currency}` },
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
                                        className="rounded-md bg-purple-500 px-6 py-2 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        Confirm Transfer
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="py-6 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                                    <CheckCircle className="h-10 w-10 text-purple-500" />
                                </div>

                                <h3 className="mb-2 text-xl font-semibold">Transfer Successful!</h3>
                                <p className="mb-6 text-gray-500">Your international wire transfer has been initiated successfully.</p>

                                <div className="mx-auto mb-6 max-w-md rounded-lg bg-gray-50 p-4">
                                    <p className="text-sm text-gray-600">
                                        Transaction Reference: <span className="font-medium">INTL{Math.random().toString(36).substr(2, 9)}</span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Please note that international transfers may take 2-4 business days to complete.
                                    </p>
                                </div>

                                <div className="flex justify-center space-x-4">
                                    <Link
                                        href="/transfer"
                                        className="rounded-md bg-purple-500 px-6 py-2 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
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
        </MainLayout>
    );
};

export default InternationalTransfer;
