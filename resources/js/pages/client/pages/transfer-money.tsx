import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Building, ChevronRight, CreditCard, Globe, Home, Repeat } from 'lucide-react';
import { useState } from 'react';

const TransferMoney = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const transferOptions = [
        {
            id: 'same-bank',
            title: 'Same Bank Transfer',
            description: 'Account to Account Transfer',
            icon: <Building className="h-8 w-8" />,
            deliveryTime: 'maximum 24hrs delivery',
            color: 'from-emerald-500 to-emerald-700',
            hoverColor: 'from-emerald-600 to-emerald-800',
            link: '/transfer/same-bank',
        },
        {
            id: 'local-bank',
            title: 'Local Bank Transfer',
            description: 'Interbank Transfer within the country',
            icon: <Repeat className="h-8 w-8" />,
            deliveryTime: 'maximum 48hrs delivery',
            color: 'from-blue-500 to-blue-700',
            hoverColor: 'from-blue-600 to-blue-800',
            link: '/transfer/local-bank',
        },
        {
            id: 'international',
            title: 'Wire/INTL Transfer',
            description: 'From one country to another',
            icon: <Globe className="h-8 w-8" />,
            deliveryTime: 'Maximum 5 Working Days',
            color: 'from-gray-700 to-gray-900',
            hoverColor: 'from-gray-800 to-black',
            link: '/transfer/international',
        },
    ];

    return (
        <MainLayout>
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                        <div className="mb-3 md:mb-0">
                            <h1 className="text-2xl font-bold text-gray-800">Transfer Money</h1>
                            <p className="mt-1 text-sm text-gray-500">Send funds to accounts locally or internationally</p>
                        </div>
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                <li className="inline-flex items-center">
                                    <Link href="#" className="inline-flex items-center text-gray-500 hover:text-blue-600">
                                        <Home className="mr-1 h-4 w-4" />
                                        <span className="text-sm">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                        <Link href="#" className="ml-1 text-sm text-gray-500 hover:text-blue-600">
                                            <span className="flex items-center">
                                                <CreditCard className="mr-1 h-4 w-4" />
                                                Finances
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                        <span className="ml-1 text-sm font-medium text-gray-700">Transfer Money</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="py-6">
                <div className="container mx-auto px-4">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">Choose Fund Transfer</h2>
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">Select Method</span>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {transferOptions.map((option) => (
                                    <Link
                                        key={option.id}
                                        href={option.link}
                                        className="group block"
                                        onMouseEnter={() => setHoveredCard(option.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div
                                            className={`relative h-full overflow-hidden rounded-lg shadow transition-all duration-300 ${hoveredCard === option.id ? '-translate-y-1 transform shadow-lg' : ''} `}
                                        >
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${hoveredCard === option.id ? option.hoverColor : option.color} transition-all duration-300`}
                                            ></div>

                                            <div className="relative flex h-full flex-col p-6">
                                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 p-3">
                                                    {option.icon}
                                                </div>

                                                <h3 className="mb-2 text-xl font-semibold text-white">{option.title}</h3>
                                                <p className="mb-4 text-white/90">{option.description}</p>

                                                <div className="mt-auto mb-3 flex items-center text-xs text-white/80">
                                                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-white/80"></span>
                                                    <span>{option.deliveryTime}</span>
                                                </div>

                                                <div
                                                    className={`mt-2 flex items-center justify-between rounded-md bg-white/10 px-4 py-3 transition-all duration-300 group-hover:bg-white/20`}
                                                >
                                                    <span className="font-medium text-white">Select Method</span>
                                                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default TransferMoney;
