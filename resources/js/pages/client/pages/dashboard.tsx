import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const Dashboard = () => {
    const mockTransactions = [
        {
            code: 'TXN12345',
            accountNumber: 'ACC98765',
            type: 'Deposit',
            amount: '$500.00',
            owner: 'John Doe',
            timestamp: '2023-10-27 10:00 AM',
        },
        {
            code: 'TXN67890',
            accountNumber: 'ACC54321',
            type: 'Withdrawal',
            amount: '$200.00',
            owner: 'Jane Smith',
            timestamp: '2023-10-27 11:30 AM',
        },
        {
            code: 'TXN11223',
            accountNumber: 'ACC12345',
            type: 'Transfer',
            amount: '$150.00',
            owner: 'Alice Brown',
            timestamp: '2023-10-26 02:15 PM',
        },
    ];
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
                                    <p className="text-lg font-semibold">Deposits</p>
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
                                    <p className="text-lg font-semibold">$ Withdrawals</p>
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
                                    <p className="text-lg font-semibold">$ Transfers</p>
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
                                    <p className="text-lg font-semibold">$ Account balance</p>
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
                                                    Acc. Owner
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Timestamp
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {mockTransactions.map((transaction) => (
                                                <tr key={transaction.code} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{transaction.code}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{transaction.accountNumber}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${transaction.type === 'Deposit' ? 'bg-green-100 text-green-800' : transaction.type === 'Transfer' ? 'bg-yellow-100 text-yellow-800' : transaction.type === 'Withdrawal' ? 'bg-red-100 text-red-800' : ''}`}
                                                        >
                                                            {transaction.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{transaction.amount}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{transaction.owner}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{transaction.timestamp}</td>
                                                </tr>
                                            ))}
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
        </MainLayout>
    );
};

export default Dashboard;
