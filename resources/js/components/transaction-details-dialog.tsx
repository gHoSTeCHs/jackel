import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TransactionDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: {
        id: number;
        transaction_code: string;
        type: 'deposit' | 'withdrawal' | 'same-bank-transfer' | 'local-bank-transfer' | 'international-transfer';
        amount: number;
        currency?: string;
        recipient_account?: string;
        recipient_name?: string;
        bank_name?: string;
        bank_address?: string;
        swift_code?: string;
        beneficiary_address?: string;
        reference?: string;
        description?: string;
        client: {
            client_id: string;
            account_number: string;
            user: {
                name: string;
            };
        };
        status: 'pending' | 'completed' | 'failed' | 'cancelled';
        created_at: string;
    };
}

const getTransactionBadgeVariant = (
    type: TransactionDetailsDialogProps['transaction']['type'],
): 'destructive' | 'default' | 'secondary' | 'outline' => {
    switch (type) {
        case 'deposit':
            return 'default';
        case 'withdrawal':
            return 'destructive';
        case 'same-bank-transfer':
            return 'secondary';
        case 'local-bank-transfer':
            return 'secondary';
        case 'international-transfer':
            return 'secondary';
        default:
            return 'outline';
    }
};

const getTransactionTypeLabel = (type: TransactionDetailsDialogProps['transaction']['type']): string => {
    switch (type) {
        case 'deposit':
            return 'Deposit';
        case 'withdrawal':
            return 'Withdrawal';
        case 'same-bank-transfer':
            return 'Same Bank Transfer';
        case 'local-bank-transfer':
            return 'Local Bank Transfer';
        case 'international-transfer':
            return 'International Transfer';
        default:
            return type;
    }
};

export function TransactionDetailsDialog({ open, onOpenChange, transaction }: TransactionDetailsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
                    <div className="space-y-6 p-6">
                        {/* Transaction Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Transaction Code</p>
                                <p className="font-mono text-lg font-semibold">{transaction.transaction_code}</p>
                            </div>
                            <Badge variant={getTransactionBadgeVariant(transaction.type)}>{getTransactionTypeLabel(transaction.type)}</Badge>
                        </div>

                        {/* Transaction Status */}
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <Badge
                                variant={
                                    transaction.status === 'completed'
                                        ? 'default'
                                        : transaction.status === 'failed'
                                          ? 'destructive'
                                          : transaction.status === 'cancelled'
                                            ? 'outline'
                                            : 'secondary'
                                }
                            >
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                        </div>

                        {/* Amount Details */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-semibold">Amount Details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Amount</span>
                                        <span className="font-semibold">
                                            {transaction.currency ? `${transaction.currency} ` : '$'}
                                            {transaction.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Date</span>
                                        <span>{new Date(transaction.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sender Details */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-semibold">Sender Details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Name</span>
                                        <span>{transaction.client.user.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Account Number</span>
                                        <span className="font-mono">{transaction.client.account_number}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recipient Details for Transfers */}
                        {(transaction.type === 'same-bank-transfer' ||
                            transaction.type === 'local-bank-transfer' ||
                            transaction.type === 'international-transfer') && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-semibold">Recipient Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Name</span>
                                            <span>{transaction.recipient_name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Account Number</span>
                                            <span className="font-mono">{transaction.recipient_account}</span>
                                        </div>
                                        {transaction.bank_name && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Bank Name</span>
                                                <span>{transaction.bank_name}</span>
                                            </div>
                                        )}
                                        {transaction.bank_address && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Bank Address</span>
                                                <span>{transaction.bank_address}</span>
                                            </div>
                                        )}
                                        {transaction.swift_code && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">SWIFT Code</span>
                                                <span className="font-mono">{transaction.swift_code}</span>
                                            </div>
                                        )}
                                        {transaction.beneficiary_address && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Beneficiary Address</span>
                                                <span>{transaction.beneficiary_address}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Additional Information */}
                        {(transaction.reference || transaction.description) && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-semibold">Additional Information</h3>
                                    <div className="space-y-2">
                                        {transaction.reference && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Reference</span>
                                                <span>{transaction.reference}</span>
                                            </div>
                                        )}
                                        {transaction.description && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Description</span>
                                                <span>{transaction.description}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
