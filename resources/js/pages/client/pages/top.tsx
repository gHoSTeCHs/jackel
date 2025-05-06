import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Building, CheckCircle, ChevronRight, Clock, CreditCard, DollarSign, Globe, Home, Repeat, User } from 'lucide-react';
import { ChangeEvent, ReactNode, SetStateAction, useState } from 'react';

// Types and Interfaces
interface FormInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
    required?: boolean;
    error?: string | null;
}

interface FormSelectProps {
    label: string;
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    icon?: ReactNode;
    required?: boolean;
    error?: string | null;
}

interface TransferSummaryProps {
    transferType: 'same-bank' | 'local-bank' | 'international';
    transferData: {
        fromAccount?: string;
        toAccount?: string;
        beneficiaryName?: string;
        bank?: string;
        amount?: string | number;
        currency?: string;
        reference?: string;
    };
    fee: string;
    total: string;
    estimatedDelivery: string;
}

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

// Base Form Components
const FormInput = ({ label, type = 'text', placeholder, value, onChange, icon, required = false, error = null }: FormInputProps) => {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`block w-full rounded-md shadow-sm pl-${icon ? '10' : '3'} border py-2 pr-3 ${error ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
            {error && (
                <p className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {error}
                </p>
            )}
        </div>
    );
};

const FormSelect = ({ label, options, value, onChange, icon, required = false, error = null }: FormSelectProps) => {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
                <select
                    value={value}
                    onChange={onChange}
                    className={`block w-full rounded-md shadow-sm pl-${icon ? '10' : '3'} border py-2 pr-3 ${error ? 'border-red-500' : 'border-gray-300'} appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    required={required}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronRight className="h-4 w-4 rotate-90 text-gray-400" />
                </div>
            </div>
            {error && (
                <p className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {error}
                </p>
            )}
        </div>
    );
};

// Transfer Summary Component
const TransferSummary = ({ transferType, transferData, fee, total, estimatedDelivery }: TransferSummaryProps) => {
    // Color coding based on transfer type
    const colorMap = {
        'same-bank': 'bg-emerald-50 border-emerald-200 text-emerald-700',
        'local-bank': 'bg-blue-50 border-blue-200 text-blue-700',
        international: 'bg-gray-50 border-gray-200 text-gray-700',
    };

    const titleMap = {
        'same-bank': 'Same Bank Transfer',
        'local-bank': 'Local Bank Transfer',
        international: 'International Wire Transfer',
    };

    return (
        <div className={`rounded-lg border p-4 ${colorMap[transferType]}`}>
            <h3 className="mb-3 font-medium">Transfer Summary</h3>

            <div className="mb-4 space-y-2 text-sm">
                {transferData.fromAccount && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">From Account</span>
                        <span className="font-medium">{transferData.fromAccount}</span>
                    </div>
                )}

                {transferData.toAccount && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">To Account</span>
                        <span className="font-medium">{transferData.toAccount}</span>
                    </div>
                )}

                {transferData.beneficiaryName && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Beneficiary</span>
                        <span className="font-medium">{transferData.beneficiaryName}</span>
                    </div>
                )}

                {transferData.bank && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Bank</span>
                        <span className="font-medium">{transferData.bank}</span>
                    </div>
                )}

                {transferData.amount && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-medium">
                            {transferData.currency || '$'}
                            {transferData.amount}
                        </span>
                    </div>
                )}

                {transferData.reference && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Reference</span>
                        <span className="font-medium">{transferData.reference}</span>
                    </div>
                )}
            </div>

            <div className="space-y-2 border-t border-dashed pt-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transfer Fee</span>
                    <span className="font-medium">{fee}</span>
                </div>

                <div className="flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>{total}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{estimatedDelivery}</span>
                    </div>
                    <span className="bg-opacity-50 rounded-full bg-white px-2 py-1 text-xs">{titleMap[transferType]}</span>
                </div>
            </div>
        </div>
    );
};

// Step Indicator Component
const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
    return (
        <div className="mb-8 flex items-center justify-center">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            index < currentStep
                                ? 'bg-green-500 text-white'
                                : index === currentStep
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 text-gray-500'
                        } `}
                    >
                        {index < currentStep ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
                    </div>

                    {index < steps.length - 1 && <div className={`mx-1 h-1 w-12 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'} `} />}
                </div>
            ))}
        </div>
    );
};

// Same Bank Transfer Form
interface SameBankFormData {
    fromAccount: string;
    toAccount: string;
    amount: string;
    reference: string;
    description: string;
}

const SameBankTransfer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<SameBankFormData>({
        fromAccount: '',
        toAccount: '',
        amount: '',
        reference: '',
        description: '',
    });
    const [accounts, setAccounts] = useState([
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

    const handleSubmit = (e) => {
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
                <div className="bg-emerald-500 px-6 py-4">
                    <h2 className="flex items-center text-xl font-semibold text-white">
                        <Building className="mr-2 h-5 w-5" />
                        Same Bank Transfer
                    </h2>
                    <p className="text-sm text-emerald-50">Transfer between accounts within the same bank</p>
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
                                        label="To Account Number"
                                        placeholder="Enter account number"
                                        value={formData.toAccount}
                                        onChange={(e) => handleChange('toAccount', e.target.value)}
                                        icon={<CreditCard className="h-5 w-5 text-gray-400" />}
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
                                        icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
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
                                    className="rounded-md bg-emerald-500 px-6 py-2 text-white hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
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
                                    <h3 className="mb-4 text-lg font-medium">Confirm Details</h3>
                                    <p className="mb-6 text-sm text-gray-600">
                                        Please verify all the information below before confirming the transfer.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="text-sm text-gray-500">From Account</span>
                                                <span className="text-sm font-medium">Checking Account - 1234567890</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Available Balance</span>
                                                <span className="text-sm font-medium">$3,245.70</span>
                                            </div>
                                        </div>

                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="text-sm text-gray-500">To Account</span>
                                                <span className="text-sm font-medium">{formData.toAccount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Account Holder</span>
                                                <span className="text-sm font-medium">John Doe</span>
                                            </div>
                                        </div>

                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="text-sm text-gray-500">Reference</span>
                                                <span className="text-sm font-medium">{formData.reference || 'N/A'}</span>
                                            </div>
                                            {formData.description && (
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Description</span>
                                                    <span className="text-sm font-medium">{formData.description}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <TransferSummary
                                        transferType="same-bank"
                                        transferData={{
                                            fromAccount: 'Checking Account - 1234567890',
                                            toAccount: formData.toAccount,
                                            amount: formData.amount,
                                            reference: formData.reference || 'N/A',
                                        }}
                                        fee="$0.00"
                                        total={`$${parseFloat(formData.amount).toFixed(2)}`}
                                        estimatedDelivery="Instant to 24 hours"
                                    />
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
                            <p className="mb-6 text-gray-500">
                                Your transfer of ${parseFloat(formData.amount).toFixed(2)} to account {formData.toAccount} has been processed.
                            </p>

                            <div className="mx-auto mb-6 max-w-md rounded-lg bg-gray-50 p-4">
                                <div className="mb-2 flex justify-between">
                                    <span className="text-sm text-gray-500">Transaction ID</span>
                                    <span className="text-sm font-medium">TXN-{Math.floor(Math.random() * 1000000)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Date & Time</span>
                                    <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
                                </div>
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

// Local Bank Transfer Form
interface LocalBankFormData {
    fromAccount: string;
    toAccount: string;
    bank: string;
    routingNumber: string;
    beneficiaryName: string;
    amount: string;
    purpose: string;
    reference: string;
}

interface InternationalFormData {
    fromAccount: string;
    beneficiaryName: string;
    beneficiaryAddress: string;
    bankName: string;
    bankAddress: string;
    swiftCode: string;
    accountNumber: string;
    amount: string;
    currency: string;
    purpose: string;
    reference: string;
}

const InternationalTransfer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<InternationalFormData>({
        fromAccount: '',
        beneficiaryName: '',
        beneficiaryAddress: '',
        bankName: '',
        bankAddress: '',
        swiftCode: '',
        accountNumber: '',
        amount: '',
        currency: 'USD',
        purpose: '',
        reference: '',
    });

    const [accounts] = useState([
        { value: '1234567890', label: 'Checking Account - 1234567890 ($3,245.70)' },
        { value: '9876543210', label: 'Savings Account - 9876543210 ($12,500.00)' },
    ]);

    const currencies = [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
        { value: 'JPY', label: 'Japanese Yen (JPY)' },
        { value: 'AUD', label: 'Australian Dollar (AUD)' },
    ];

    const purposes = [
        { value: '', label: 'Select purpose of payment' },
        { value: 'family', label: 'Family Support' },
        { value: 'business', label: 'Business Payment' },
        { value: 'investment', label: 'Investment' },
        { value: 'education', label: 'Education' },
        { value: 'other', label: 'Other' },
    ];

    const steps = ['Recipient Details', 'Bank Information', 'Transfer Details', 'Confirm Transfer', 'Transfer Complete'];

    const handleChange = (field: keyof InternationalFormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleContinue = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (e) e.preventDefault();
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
                <div className="bg-gray-500 px-6 py-4">
                    <h2 className="flex items-center text-xl font-semibold text-white">
                        <Globe className="mr-2 h-5 w-5" />
                        International Wire Transfer
                    </h2>
                    <p className="text-sm text-gray-50">Send money to bank accounts worldwide</p>
                </div>

                <div className="p-6">
                    <StepIndicator steps={steps} currentStep={currentStep} />

                    {currentStep === 0 && (
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4 text-lg font-medium">Recipient Information</h3>
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
                                        label="Beneficiary Name"
                                        placeholder="Full name of the recipient"
                                        value={formData.beneficiaryName}
                                        onChange={(e) => handleChange('beneficiaryName', e.target.value)}
                                        icon={<User className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                        // error={errors.beneficiaryName}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Beneficiary Address"
                                        placeholder="Complete address of the recipient"
                                        value={formData.beneficiaryAddress}
                                        onChange={(e) => handleChange('beneficiaryAddress', e.target.value)}
                                        icon={<Home className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 1 && (
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4 text-lg font-medium">Bank Information</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                    <FormInput
                                        label="Bank Address"
                                        placeholder="Complete address of the bank"
                                        value={formData.bankAddress}
                                        onChange={(e) => handleChange('bankAddress', e.target.value)}
                                        icon={<Home className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="SWIFT/BIC Code"
                                        placeholder="Bank SWIFT code"
                                        value={formData.swiftCode}
                                        onChange={(e) => handleChange('swiftCode', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Account Number/IBAN"
                                        placeholder="Recipient's account number"
                                        value={formData.accountNumber}
                                        onChange={(e) => handleChange('accountNumber', e.target.value)}
                                        icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 2 && (
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4 text-lg font-medium">Transfer Details</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                    <FormSelect
                                        label="Purpose of Payment"
                                        options={purposes}
                                        value={formData.purpose}
                                        onChange={(e) => handleChange('purpose', e.target.value)}
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
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-1">
                                    <h3 className="mb-4 text-lg font-medium">Confirm Details</h3>
                                    <p className="mb-6 text-sm text-gray-600">
                                        Please verify all the information below before confirming the transfer.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="text-sm text-gray-500">From Account</span>
                                                <span className="text-sm font-medium">
                                                    {accounts.find((acc) => acc.value === formData.fromAccount)?.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="text-sm text-gray-500">Beneficiary</span>
                                                <span className="text-sm font-medium">{formData.beneficiaryName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Bank</span>
                                                <span className="text-sm font-medium">{formData.bankName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">SWIFT Code</span>
                                                <span className="text-sm font-medium">{formData.swiftCode}</span>
                                            </div>
                                        </div>

                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="text-sm text-gray-500">Amount</span>
                                                <span className="text-sm font-medium">
                                                    {formData.currency} {formData.amount}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Purpose</span>
                                                <span className="text-sm font-medium">
                                                    {purposes.find((p) => p.value === formData.purpose)?.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <TransferSummary
                                        transferType="international"
                                        transferData={{
                                            fromAccount: accounts.find((acc) => acc.value === formData.fromAccount)?.label,
                                            beneficiaryName: formData.beneficiaryName,
                                            bank: formData.bankName,
                                            amount: formData.amount,
                                            currency: formData.currency,
                                            reference: formData.reference || 'N/A',
                                        }}
                                        fee="$25.00"
                                        total={`${formData.currency} ${(parseFloat(formData.amount || '0') + 25).toFixed(2)}`}
                                        estimatedDelivery="2-4 business days"
                                    />
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
                                    className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Confirm Transfer
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="py-6 text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                <CheckCircle className="h-10 w-10 text-gray-500" />
                            </div>

                            <h3 className="mb-2 text-xl font-semibold">Transfer Initiated!</h3>
                            <p className="mb-6 text-gray-500">
                                Your international transfer of {formData.currency} {formData.amount} to {formData.beneficiaryName} has been initiated.
                            </p>

                            <div className="mx-auto mb-6 max-w-md rounded-lg bg-gray-50 p-4">
                                <div className="mb-2 flex justify-between">
                                    <span className="text-sm text-gray-500">Transaction ID</span>
                                    <span className="text-sm font-medium">TXN-{Math.floor(Math.random() * 1000000)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Date & Time</span>
                                    <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
                                </div>
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

const LocalBankTransfer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [errors, setErrors] = useState<Partial<Record<keyof LocalBankFormData, string>>>({});
    const [formData, setFormData] = useState<LocalBankFormData>({
        fromAccount: '',
        toAccount: '',
        bank: '',
        routingNumber: '',
        beneficiaryName: '',
        amount: '',
        purpose: '',
        reference: '',
    });

    const [accounts, setAccounts] = useState([
        { value: '1234567890', label: 'Checking Account - 1234567890 ($3,245.70)' },
        { value: '9876543210', label: 'Savings Account - 9876543210 ($12,500.00)' },
    ]);

    const banks = [
        { value: '', label: 'Select a bank' },
        { value: 'chase', label: 'Chase Bank' },
        { value: 'bofa', label: 'Bank of America' },
        { value: 'wells', label: 'Wells Fargo' },
        { value: 'citi', label: 'Citibank' },
        { value: 'other', label: 'Other Bank' },
    ];

    const purposes = [
        { value: '', label: 'Select purpose of payment' },
        { value: 'family', label: 'Family Support' },
        { value: 'business', label: 'Business Payment' },
        { value: 'investment', label: 'Investment' },
        { value: 'bill', label: 'Bill Payment' },
        { value: 'other', label: 'Other' },
    ];

    const steps = ['Recipient Details', 'Transfer Details', 'Confirm Transfer', 'Transfer Complete'];

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleContinue = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const validateForm = () => {
        const newErrors: Partial<Record<keyof LocalBankFormData, string>> = {};

        if (!formData.beneficiaryName) {
            newErrors.beneficiaryName = 'Beneficiary name is required';
        }

        if (!formData.bank) {
            newErrors.bank = 'Bank selection is required';
        }

        if (!formData.routingNumber) {
            newErrors.routingNumber = 'Routing number is required';
        } else if (!/^\d{9}$/.test(formData.routingNumber)) {
            newErrors.routingNumber = 'Routing number must be 9 digits';
        }

        if (!formData.toAccount) {
            newErrors.toAccount = 'Account number is required';
        }

        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (!formData.purpose) {
            newErrors.purpose = 'Purpose of payment is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (e) e.preventDefault();
        if (validateForm()) {
            setCurrentStep(currentStep + 1);
        }
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
                <div className="bg-blue-500 px-6 py-4">
                    <h2 className="flex items-center text-xl font-semibold text-white">
                        <Repeat className="mr-2 h-5 w-5" />
                        Local Bank Transfer
                    </h2>
                    <p className="text-sm text-blue-50">Transfer money to other banks within the country</p>
                </div>

                <div className="p-6">
                    <StepIndicator steps={steps} currentStep={currentStep} />

                    {currentStep === 0 && (
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4 text-lg font-medium">Recipient Information</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Beneficiary Name"
                                        placeholder="Full name of the recipient"
                                        value={formData.beneficiaryName}
                                        onChange={(e) => handleChange('beneficiaryName', e.target.value)}
                                        icon={<User className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                        error={errors.beneficiaryName}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormSelect
                                        label="Recipient Bank"
                                        options={banks}
                                        value={formData.bank}
                                        onChange={(e) => handleChange('bank', e.target.value)}
                                        icon={<Building className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                        error={errors.bank}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <FormInput
                                        label="Routing Number"
                                        placeholder="9-digit routing number"
                                        value={formData.routingNumber}
                                        onChange={(e) => handleChange('routingNumber', e.target.value)}
                                        required={true}
                                        error={errors.routingNumber}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Account Number"
                                        placeholder="Recipient's account number"
                                        value={formData.toAccount}
                                        onChange={(e) => handleChange('toAccount', e.target.value)}
                                        icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                                        required={true}
                                        error={errors.toAccount}
                                    />
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
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4 text-lg font-medium">Transfer Details</h3>

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
                                        label="Purpose of Payment"
                                        options={purposes}
                                        value={formData.purpose}
                                        onChange={(e) => handleChange('purpose', e.target.value)}
                                        required={true}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Reference/Description"
                                        placeholder="e.g., Invoice #12345"
                                        value={formData.reference}
                                        onChange={(e) => handleChange('reference', e.target.value)}
                                        required={false}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-1">
                                    <h3 className="mb-4 text-lg font-medium">Review Transfer Details</h3>
                                    <p className="mb-6 text-sm text-gray-600">
                                        Please verify all the information below before confirming the transfer.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 text-sm font-medium">From</div>
                                            <div className="mb-1 flex justify-between">
                                                <span className="text-sm text-gray-500">Account</span>
                                                <span className="text-sm font-medium">Checking Account - 1234567890</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Available Balance</span>
                                                <span className="text-sm font-medium">$3,245.70</span>
                                            </div>
                                        </div>

                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 text-sm font-medium">To</div>
                                            <div className="mb-1 flex justify-between">
                                                <span className="text-sm text-gray-500">Beneficiary</span>
                                                <span className="text-sm font-medium">{formData.beneficiaryName}</span>
                                            </div>
                                            <div className="mb-1 flex justify-between">
                                                <span className="text-sm text-gray-500">Bank</span>
                                                <span className="text-sm font-medium">{banks.find((b) => b.value === formData.bank)?.label}</span>
                                            </div>
                                            <div className="mb-1 flex justify-between">
                                                <span className="text-sm text-gray-500">Routing Number</span>
                                                <span className="text-sm font-medium">{formData.routingNumber}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Account Number</span>
                                                <span className="text-sm font-medium">{formData.toAccount}</span>
                                            </div>
                                        </div>

                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="mb-2 text-sm font-medium">Details</div>
                                            <div className="mb-1 flex justify-between">
                                                <span className="text-sm text-gray-500">Purpose</span>
                                                <span className="text-sm font-medium">
                                                    {purposes.find((p) => p.value === formData.purpose)?.label}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Reference</span>
                                                <span className="text-sm font-medium">{formData.reference || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
                                        <div className="flex items-center">
                                            <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                                            <p>This transfer may take up to 48 hours to process depending on the receiving bank.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <TransferSummary
                                        transferType="local-bank"
                                        transferData={{
                                            fromAccount: 'Checking Account - 1234567890',
                                            beneficiaryName: formData.beneficiaryName,
                                            bank: banks.find((b) => b.value === formData.bank)?.label,
                                            toAccount: formData.toAccount,
                                            amount: formData.amount,
                                            reference: formData.reference || 'N/A',
                                        }}
                                        fee="$2.50"
                                        total={`${(parseFloat(formData.amount) + 2.5).toFixed(2)}`}
                                        estimatedDelivery="1-2 business days"
                                    />
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
                                    className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Confirm Transfer
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="py-6 text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                                <CheckCircle className="h-10 w-10 text-blue-500" />
                            </div>

                            <h3 className="mb-2 text-xl font-semibold">Transfer Initiated Successfully!</h3>
                            <p className="mb-6 text-gray-500">
                                Your transfer of ${parseFloat(formData.amount).toFixed(2)} to {formData.beneficiaryName} has been initiated.
                            </p>

                            <div className="mx-auto mb-6 max-w-md rounded-lg bg-gray-50 p-4">
                                <div className="mb-2 flex justify-between">
                                    <span className="text-sm text-gray-500">Transaction ID</span>
                                    <span className="text-sm font-medium">TXN-{Math.floor(Math.random() * 1000000)}</span>
                                </div>
                                <div className="mb-2 flex justify-between">
                                    <span className="text-sm text-gray-500">Date & Time</span>
                                    <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Expected Completion</span>
                                    <span className="text-sm font-medium">Within 1-2 business days</span>
                                </div>
                            </div>

                            <div className="mx-auto mb-6 max-w-md rounded-md border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
                                <div className="flex items-center">
                                    <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <p>You will receive an email notification when the transfer is completed.</p>
                                </div>
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

// International Wire Transfer Form

// Main Transfer Money Component with Option Selection
const TransferMoney = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedTransfer, setSelectedTransfer] = useState<string | null>(null);
    // |>
    const transferOptions = [
        {
            id: 'same-bank',
            title: 'Same Bank Transfer',
            description: 'Account to Account Transfer',
            icon: <Building className="h-8 w-8" />,
            deliveryTime: 'maximum 24hrs delivery',
            color: 'from-emerald-500 to-emerald-700',
            hoverColor: 'from-emerald-600 to-emerald-800',
            link: '/transfer/same-bank',
        },
        {
            id: 'local-bank',
            title: 'Local Bank Transfer',
            description: 'Interbank Transfer within the country',
            icon: <Repeat className="h-8 w-8" />,
            deliveryTime: 'maximum 48hrs delivery',
            color: 'from-blue-500 to-blue-700',
            hoverColor: 'from-blue-600 to-blue-800',
            link: '/transfer/local-bank',
        },
        {
            id: 'international',
            title: 'Wire/INTL Transfer',
            description: 'From one country to another',
            icon: <Globe className="h-8 w-8" />,
            deliveryTime: 'Maximum 5 Working Days',
            color: 'from-gray-700 to-gray-900',
            hoverColor: 'from-gray-800 to-black',
            link: '/transfer/international',
        },
    ];

    // Handle transfer option selection
    const handleSelectTransfer = (transferId: SetStateAction<string | null>) => {
        setSelectedTransfer(transferId);
    };

    // Render the appropriate transfer form based on selection
    const renderTransferForm = () => {
        switch (selectedTransfer) {
            case 'same-bank':
                return <SameBankTransfer />;
            case 'local-bank':
                return <LocalBankTransfer />;
            case 'international':
                return <InternationalTransfer />;
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            {selectedTransfer ? (
                renderTransferForm()
            ) : (
                <>
                    {/* Header Section with Breadcrumbs */}
                    <section className="border-b border-gray-200 bg-gray-50">
                        <div className="container mx-auto px-4"></div>
                    </section>
                </>
            )}
        </MainLayout>
    );
};
