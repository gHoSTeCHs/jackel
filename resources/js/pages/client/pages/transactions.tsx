import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const Transactions = () => {
    // Mock transaction data
    const mockTransactions = [
        {
            id: 1,
            code: 'TXN001',
            accountNumber: 'ACC12345',
            type: 'Deposit',
            amount: 500.0,
            owner: 'John Doe',
            timestamp: '2023-10-27 10:00:00',
        },
        {
            id: 2,
            code: 'TXN002',
            accountNumber: 'ACC67890',
            type: 'Withdrawal',
            amount: 150.0,
            owner: 'Jane Smith',
            timestamp: '2023-10-27 11:30:00',
        },
        {
            id: 3,
            code: 'TXN003',
            accountNumber: 'ACC12345',
            type: 'Transfer',
            amount: 200.0,
            owner: 'John Doe',
            timestamp: '2023-10-28 09:15:00',
        },
        {
            id: 4,
            code: 'TXN004',
            accountNumber: 'ACC54321',
            type: 'Deposit',
            amount: 1000.0,
            owner: 'Alice Brown',
            timestamp: '2023-10-28 14:00:00',
        },
    ];

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
                                    <Link href="/client">Dashboard</Link>
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
                                    {mockTransactions.map((transaction, index) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900">{transaction.code}</td>
                                            <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900">
                                                {transaction.accountNumber}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        transaction.type === 'Deposit'
                                                            ? 'bg-green-100 text-green-800'
                                                            : transaction.type === 'Transfer'
                                                              ? 'bg-yellow-100 text-yellow-800'
                                                              : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">$ {transaction.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{transaction.owner}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{formatDate(transaction.timestamp)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Transactions;
