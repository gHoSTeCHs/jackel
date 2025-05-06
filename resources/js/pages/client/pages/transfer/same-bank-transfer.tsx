import { Link } from '@inertiajs/react';
import { ArrowLeft, Building, CheckCircle } from 'lucide-react';
import { useState } from 'react';

// interface SameBankFormData {
//     fromAccount: string;
//     toAccount: string;
//     amount: string;
//     reference: string;
//     description: string;
// }

export const SameBankTransfer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    // const [formData, setFormData] = useState<SameBankFormData>({
    //     fromAccount: '',
    //     toAccount: '',
    //     amount: '',
    //     reference: '',
    //     description: '',
    // });

    // const [accounts] = useState([
    //     { value: '1234567890', label: 'Checking Account - 1234567890 ($3,245.70)' },
    //     { value: '9876543210', label: 'Savings Account - 9876543210 ($12,500.00)' },
    // ]);

    // const steps = ['Account Details', 'Confirm Transfer', 'Transfer Complete'];

    // const handleChange = (field: string, value: string) => {
    //     setFormData({ ...formData, [field]: value });
    // };

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
                <div className="bg-emerald-500 px-6 py-4">
                    <h2 className="flex items-center text-xl font-semibold text-white">
                        <Building className="mr-2 h-5 w-5" />
                        Same Bank Transfer
                    </h2>
                    <p className="text-sm text-emerald-50">Transfer between accounts within the same bank</p>
                </div>

                <div className="p-6">
                    {/* Step indicator will be added here */}

                    {currentStep === 0 && (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">{/* Form fields will be added here */}</div>
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
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{/* Confirmation details will be added here */}</div>

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

                            <div className="mx-auto mb-6 max-w-md rounded-lg bg-gray-50 p-4">{/* Transaction details will be added here */}</div>

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
