import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const Transfer = () => {
    return (
        <MainLayout>
            <div className="p-4">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 flex flex-wrap items-center justify-between">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-800">Funds Transfers</h1>
                        </div>
                        <div className="mt-2 w-full sm:mt-0 sm:w-1/2">
                            <ol className="flex justify-end space-x-2 text-sm">
                                <li className="text-blue-600 hover:text-blue-800">
                                    <Link href="/client">Dashboard</Link>
                                </li>
                                <li className="text-gray-500 before:mx-2 before:content-['/']">
                                    <Link href="#" className="text-blue-600 hover:text-blue-800">
                                        iBank Finances
                                    </Link>
                                </li>
                                <li className="text-gray-500 before:mx-2 before:content-['/']">Transfers</li>
                            </ol>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-800">Select an account to transfer funds from</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Acc Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Rate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Acc Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Acc Owner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">1</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">Account Name</td>
                                        <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-900">Account Number</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">Account Rates</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                                                AccountType
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">Client Name</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            <Link
                                                href="/transfer-money"
                                                className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                <i className="fas fa-money-bill-alt mr-2"></i>
                                                Transfer Money
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
export default Transfer;
