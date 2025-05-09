import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Building, Globe2, Landmark } from 'lucide-react';
import { useState } from 'react';

const TransferMoney = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const transferOptions = [
        {
            id: 'same-bank',
            title: 'Same Bank Transfer',
            description: 'Transfer money between accounts within our bank',
            icon: <Building className="h-8 w-8 text-white" />,
            link: 'client.transfer.same-bank',
            color: 'from-emerald-500 to-emerald-600',
            hoverColor: 'from-emerald-600 to-emerald-700',
            deliveryTime: 'Instant Transfer',
        },
        {
            id: 'local-bank',
            title: 'Local Bank Transfer',
            description: 'Send money to other local bank accounts',
            icon: <Landmark className="h-8 w-8 text-white" />,
            link: 'client.transfer.local-bank',
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'from-blue-600 to-blue-700',
            deliveryTime: '1-2 Business Days',
        },
        {
            id: 'international',
            title: 'International Wire',
            description: 'Send money internationally to any bank worldwide',
            icon: <Globe2 className="h-8 w-8 text-white" />,
            link: 'client.transfer.international',
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'from-purple-600 to-purple-700',
            deliveryTime: '2-4 Business Days',
        },
    ];

    return (
        <MainLayout>
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
                                        href={route(option.link)}
                                        className="group block"
                                        onMouseEnter={() => setHoveredCard(option.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div
                                            className={`relative h-full overflow-hidden rounded-lg shadow transition-all duration-300 ${hoveredCard === option.id ? '-translate-y-1 transform shadow-lg' : ''}`}
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
