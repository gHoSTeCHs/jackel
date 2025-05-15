import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Building, CheckCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormInput, FormSelect, StepIndicator, TransferSummary } from './components';
import { AccountSearch } from './components/AccountSearch';

interface SameBankFormData {
    fromAccount: string;
    toAccount: string;
    accountName: string;
    amount: string;
    reference: string;
    description: string;
}

const SameBankTransfer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<SameBankFormData>({
        fromAccount: '',
        toAccount: '',
        accountName: '',
        amount: '',
        reference: '',
        description: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch(route('client.accounts.user'));
                const data = await response.json();
                setAccounts(data.accounts);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                toast.error('Failed to load accounts');
            }
        };

        fetchAccounts();
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(route('client.transfer.same-bank.process'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Transfer failed');
                return;
            }

            toast.success(data.message || 'Transfer completed successfully');
            setCurrentStep(currentStep + 1);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            toast.error('Transfer failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-3xl p-4">
                <div className="mb-4">
                    <Link href={route('client.transfer.money')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        <span>Back to Transfer Options</span>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="bg-emerald-500 px-6 py-4">
                        <h2 className="flex items-center text-xl font-semibold text-white">
                            <Building className="mr-2 h-5 w-5" />
                            Same Bank Transfer
                        </h2>
                        <p className="text-sm text-emerald-50">Transfer between accounts within the same bank</p>
                    </div>

                    <div className="p-6">
                        <StepIndicator steps={steps} currentStep={currentStep} />
                        {error && (
                            <div className="mb-4 rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                        <AccountSearch
                                            label="To Account"
                                            value={formData.toAccount}
                                            onChange={(value, displayText) => {
                                                handleChange('toAccount', value);
                                                handleChange('accountName', displayText?.split(' - ')[1] || '');
                                            }}
                                            required={true}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
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
                                            placeholder="e.g., Rent payment"
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
                                                className="block w-full text-gray-900 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                                rows={3}
                                                placeholder="Additional details about this transfer"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`rounded-md px-6 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none ${isSubmitting ? 'cursor-not-allowed bg-emerald-400' : 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                <span className="ml-2">Processing...</span>
                                            </>
                                        ) : (
                                            'Continue'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        {currentStep === 1 && (
                            <div>
                                <TransferSummary
                                    data={[
                                        { label: 'From Account', value: formData.fromAccount },
                                        { label: 'To Account', value: `${formData.toAccount} - ${formData.accountName}` },
                                        { label: 'Amount', value: `$${formData.amount}` },
                                        { label: 'Reference', value: formData.reference || 'N/A' },
                                        { label: 'Description', value: formData.description || 'N/A' },
                                    ]}
                                    transferType="same-bank"
                                    transferData={{
                                        fromAccount: formData.fromAccount,
                                        toAccount: formData.toAccount,
                                        amount: formData.amount,
                                        reference: formData.reference,
                                    }}
                                    fee="$0.00"
                                    total={`$${formData.amount}`}
                                    estimatedDelivery="Instant"
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
                                        className="rounded-md bg-emerald-500 px-6 py-2 text-white hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        Confirm Transfer
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="py-6 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                    <CheckCircle className="h-10 w-10 text-emerald-500" />
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
                                        href={route('client.transfer.money')}
                                        className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        Make Another Transfer
                                    </Link>
                                    <Link
                                        href={route('client.dashboard')}
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

export default SameBankTransfer;
