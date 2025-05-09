import { TransactionDetailsDialog } from '@/components/transaction-details-dialog';
import MainLayout from '@/pages/client/layouts/main-layout';
import { Transaction } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

type DashboardProps = {
    transactions: Transaction[];
    stats: {
        deposits: number;
        withdrawals: number;
        transfers: number;
    };
    balance: number;
};

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const Dashboard = ({ transactions, stats, balance }: DashboardProps) => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const EmptyState = () => {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-6">
                    <i className="fas fa-receipt text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No Transactions Yet</h3>
                <p className="mt-1 text-sm text-gray-500">Start making transactions to see your financial activity here.</p>
                <div className="mt-6">
                    <Link
                        href={route('client.transfer')}
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Make a Transaction
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <MainLayout>
            <div className="p-4">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 flex flex-wrap items-center justify-between">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-800">Client Dashboard</h1>
                        </div>

                        <div className="mt-2 w-full sm:mt-0 sm:w-1/2">
                            <ol className="flex justify-end space-x-2 text-sm">
                                <li className="text-blue-600 hover:text-blue-800">
                                    <Link href="#">Home</Link>
                                </li>
                                <li className="text-gray-500 before:mx-2 before:content-['/']">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="px-4">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <div className="flex items-center">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                                    <i className="fas fa-upload text-lg"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">Deposits</p>
                                    <p className="text-lg font-semibold text-gray-800">{formatCurrency(stats.deposits)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <div className="flex items-center">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                                    <i className="fas fa-download text-lg"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">Withdrawals</p>
                                    <p className="text-lg font-semibold text-gray-800">{formatCurrency(stats.withdrawals)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <div className="flex items-center">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                                    <i className="fas fa-random text-lg"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">Transfers</p>
                                    <p className="text-lg font-semibold text-gray-800">{formatCurrency(stats.transfers)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <div className="flex items-center">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-white">
                                    <i className="fas fa-money-bill-alt text-lg"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">Wallet Balance</p>
                                    <p className="text-lg font-semibold text-gray-800">{formatCurrency(balance)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="w-full">
                            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Latest Transactions</h3>

                                    <div className="flex space-x-2">
                                        <button type="button" className="text-gray-400 hover:text-gray-500" title="collapse-button">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <button type="button" className="text-gray-400 hover:text-gray-500" title="remove-button">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Transaction Code
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Account No.
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Type
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Amount
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Timestamp
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {transactions.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="px-6 py-4 text-center">
                                                        <EmptyState />
                                                    </td>
                                                </tr>
                                            ) : (
                                                transactions.map((transaction) => (
                                                    <tr
                                                        key={transaction.transaction_code}
                                                        className="cursor-pointer hover:bg-gray-50"
                                                        onClick={() => {
                                                            setSelectedTransaction(transaction);
                                                            setIsDetailsOpen(true);
                                                        }}
                                                    >
                                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                            {transaction.transaction_code}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                            {transaction.recipient_name || 'N/A'}
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
                                                            {formatCurrency(transaction.amount)}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                            <span
                                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                                    transaction.status === 'completed'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : transaction.status === 'pending'
                                                                          ? 'bg-yellow-100 text-yellow-800'
                                                                          : 'bg-red-100 text-red-800'
                                                                }`}
                                                            >
                                                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                            {new Date(transaction.created_at).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="border-t border-gray-200 px-6 py-4">
                                    <Link
                                        href="#"
                                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        View All
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {selectedTransaction && (
                <TransactionDetailsDialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} transaction={selectedTransaction} />
            )}
        </MainLayout>
    );
};

export default Dashboard;
