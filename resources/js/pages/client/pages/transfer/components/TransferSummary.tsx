import { Clock } from 'lucide-react';

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

export const TransferSummary = ({ transferType, transferData, fee, total, estimatedDelivery }: TransferSummaryProps) => {
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
