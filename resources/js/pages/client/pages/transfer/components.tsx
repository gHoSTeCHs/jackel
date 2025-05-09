import { AlertCircle, CheckCircle, ChevronRight, Clock } from 'lucide-react';
import { ChangeEvent, ReactNode } from 'react';

// Form Components
export interface FormInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
    required?: boolean;
    error?: string | null;
}

export interface FormSelectProps {
    label: string;
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    icon?: ReactNode;
    required?: boolean;
    error?: string | null;
}

export const FormInput = ({ label, type = 'text', placeholder, value, onChange, icon, required = false, error = null }: FormInputProps) => {
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
                    className={`block w-full rounded-md shadow-sm pl-${icon ? '10' : '3'} border py-2 pr-3 ${error ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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

export const FormSelect = ({ label, options, value, onChange, icon, required = false, error = null }: FormSelectProps) => {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
                <select
                    value={value}
                    name="name"
                    title="name"
                    onChange={onChange}
                    className={`block w-full rounded-md shadow-sm pl-${icon ? '10' : '3'} border py-2 pr-3 ${error ? 'border-red-500' : 'border-gray-300'} appearance-none text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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
export interface TransferSummaryProps {
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
    data?: { label: string; value: string }[];
}

export const TransferSummary = ({ transferType, transferData, fee, total, estimatedDelivery }: TransferSummaryProps) => {
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
export interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
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
