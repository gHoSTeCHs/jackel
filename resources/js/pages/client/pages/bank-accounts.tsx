import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const BankAccounts = () => {
    const mockAccounts = [
        {
            id: 1,
            name: 'Savings Account',
            accountNumber: 'ACC123456789',
            rate: '1.5%',
            type: 'Savings',
            owner: 'John Doe',
            dateOpened: '2023-01-15',
        },
        {
            id: 2,
            name: 'Checking Account',
            accountNumber: 'ACC987654321',
            rate: '0.5%',
            type: 'Checking',
            owner: 'John Doe',
            dateOpened: '2022-11-20',
        },
        {
            id: 3,
            name: 'Investment Account',
            accountNumber: 'ACC555555555',
            rate: 'Variable',
            type: 'Investment',
            owner: 'John Doe',
            dateOpened: '2024-03-10',
        },
    ];

    return (
        <MainLayout>
            <div className="p-4">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 flex flex-wrap items-center justify-between">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-800">My Accounts</h1>
                        </div>
                        <div className="mt-2 w-full sm:mt-0 sm:w-1/2">
                            <ol className="flex justify-end space-x-2 text-sm">
                                <li className="text-blue-600 hover:text-blue-800">
                                    <Link href="/client">Dashboard</Link>
                                </li>
                                <li className="text-gray-500 before:mx-2 before:content-['/']">
                                    <Link href="#" className="text-blue-600 hover:text-blue-800">
                                        iBank Accounts
                                    </Link>
                                </li>
                                <li className="text-gray-500 before:mx-2 before:content-['/']">My Accounts</li>
                            </ol>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-800">iBanking Accounts</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Account No.
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Rate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Acc. Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Acc. Owner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Date Opened
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {mockAccounts.map((account, index) => (
                                        <tr key={account.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{account.name}</td>
                                            <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900">{account.accountNumber}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{account.rate}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        account.type === 'Savings'
                                                            ? 'bg-green-100 text-green-800'
                                                            : account.type === 'Checking'
                                                              ? 'bg-blue-100 text-blue-800'
                                                              : 'bg-purple-100 text-purple-800'
                                                    }`}
                                                >
                                                    {account.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{account.owner}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{account.dateOpened}</td>
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

export default BankAccounts;
