import { TransactionDetailsDialog } from '@/components/transaction-details-dialog';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import MainLayout from '@/pages/client/layouts/main-layout';
import { Transaction } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface TransactionsProps {
    transactions: {
        data: Transaction[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

const Transactions = ({ transactions }: TransactionsProps) => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const paginatedTransactions = transactions.data;

    /*const mockTransactions: Transaction[] = [
        {
            id: 1,
            transaction_code: 'TXN001',
            type: 'deposit' as TransactionType,
            amount: 500.0,
            currency: 'USD',
            client: {
                client_id: 'CLT001',
                account_number: 'ACC12345',
                user: {
                    name: 'John Doe',
                },
            },
            status: 'completed',
            created_at: '2023-10-27 10:00:00',
        },
        {
            id: 2,
            transaction_code: 'TXN002',
            type: 'withdrawal' as TransactionType,
            amount: 150.0,
            currency: 'USD',
            client: {
                client_id: 'CLT002',
                account_number: 'ACC67890',
                user: {
                    name: 'Jane Smith',
                },
            },
            status: 'completed',
            created_at: '2023-10-27 11:30:00',
        },
        {
            id: 3,
            transaction_code: 'TXN003',
            type: 'same-bank-transfer' as TransactionType,
            amount: 200.0,
            currency: 'USD',
            recipient_account: 'ACC98765',
            recipient_name: 'Alice Brown',
            client: {
                client_id: 'CLT001',
                account_number: 'ACC12345',
                user: {
                    name: 'John Doe',
                },
            },
            status: 'completed',
            created_at: '2023-10-28 09:15:00',
        },
        {
            id: 4,
            transaction_code: 'TXN004',
            type: 'international-transfer' as TransactionType,
            amount: 1000.0,
            currency: 'USD',
            recipient_account: 'GB29WIBKE60161331926819',
            recipient_name: 'Robert Wilson',
            bank_name: 'Barclays Bank',
            bank_address: '1 Churchill Place, London E14 5HP, United Kingdom',
            swift_code: 'BARCA22',
            beneficiary_address: '15 Oxford Street, London W1D 2HS, United Kingdom',
            reference: 'INV-2023-001',
            description: 'International business payment',
            client: {
                client_id: 'CLT003',
                account_number: 'ACC54321',
                user: {
                    name: 'Alice Brown',
                },
            },
            status: 'completed',
            created_at: '2023-10-28 14:00:00',
        },
    ];*/

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <MainLayout>
            <div className="p-4">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 flex flex-wrap items-center justify-between">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
                        </div>
                        <div className="mt-2 w-full sm:mt-0 sm:w-1/2">
                            <ol className="flex justify-end space-x-2 text-sm">
                                <li className="text-blue-600 hover:text-blue-800">
                                    <Link href={route('client.dashboard')}>Dashboard</Link>
                                </li>
                                <li className="text-gray-500 before:mx-2 before:content-['/']">Transaction History</li>
                            </ol>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-800">Your Recent Transactions</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Transaction Code
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Account No.
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Acc. Owner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {paginatedTransactions.map((transaction, index) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900">
                                                {transaction.transaction_code}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900">
                                                {transaction.client.account_number}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        transaction.type === 'deposit'
                                                            ? 'bg-green-100 text-green-800'
                                                            : transaction.type.includes('transfer')
                                                              ? 'bg-yellow-100 text-yellow-800'
                                                              : transaction.type === 'withdrawal'
                                                                ? 'bg-red-100 text-red-800'
                                                                : ''
                                                    }`}
                                                >
                                                    {transaction.type
                                                        .split('-')
                                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                {transaction.currency} {transaction.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{transaction.client.user.name}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                {formatDate(transaction.created_at)}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedTransaction(transaction);
                                                        setIsDetailsOpen(true);
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-gray-200 px-6 py-4">
                            <Pagination currentPage={transactions.current_page} lastPage={transactions.last_page} links={transactions.links} />
                        </div>
                    </div>
                </div>
            </div>

            {selectedTransaction && (
                <TransactionDetailsDialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} transaction={selectedTransaction} />
            )}
        </MainLayout>
    );
};

export default Transactions;
