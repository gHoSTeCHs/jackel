import { MainLayoutProps } from '@/types/layout';
import { Link } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const MainLayout = ({ children }: MainLayoutProps) => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
    const [isHovered, setIsHovered] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const [isMobileView, setIsMobileView] = useState(isMobile);

    const handleMouseEnter = useCallback(() => {
        if (!isSidebarOpen) setIsHovered(true);
    }, [isSidebarOpen]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    useEffect(() => {
        const sidebar = sidebarRef.current;
        if (!sidebar) return;

        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isMobileView && isSidebarOpen && mainContentRef.current?.contains(event.target as Node)) {
                setIsSidebarOpen(false);
            }
        };

        sidebar.addEventListener('mouseenter', handleMouseEnter);
        sidebar.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            sidebar.removeEventListener('mouseenter', handleMouseEnter);
            sidebar.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleMouseEnter, handleMouseLeave, isMobileView, isSidebarOpen]);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`${
                    isMobileView ? 'fixed' : 'relative'
                } inset-y-0 left-0 z-50 border-r border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out ${
                    isMobileView ? (isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full') : isSidebarOpen || isHovered ? 'w-64' : 'w-16'
                }`}
            >
                <div className="flex items-center border-b border-gray-200 bg-blue-50 p-5">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">iB</div>
                        <span
                            className={`text-lg font-semibold text-blue-900 transition-opacity duration-300 ${
                                isSidebarOpen || isHovered ? 'opacity-100' : 'hidden opacity-0'
                            }`}
                        >
                            iBank
                        </span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1 p-4">
                    <Link
                        href={route('client.dashboard')}
                        className="flex items-center space-x-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className={`transition-opacity duration-300 ${isSidebarOpen || isHovered ? 'opacity-100' : 'hidden opacity-0'}`}>
                            Dashboard
                        </span>
                    </Link>

                    <Link
                        href={route('client.bank-accounts')}
                        className="flex items-center space-x-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                        <span className={`transition-opacity duration-300 ${isSidebarOpen || isHovered ? 'opacity-100' : 'hidden opacity-0'}`}>
                            Bank Accounts
                        </span>
                    </Link>

                    <Link
                        href={route('client.transactions')}
                        className="flex items-center space-x-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                        </svg>
                        <span className={`transition-opacity duration-300 ${isSidebarOpen || isHovered ? 'opacity-100' : 'hidden opacity-0'}`}>
                            Transactions
                        </span>
                    </Link>

                    <Link
                        href={route('client.transfer.money')}
                        className="flex items-center space-x-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span className={`transition-opacity duration-300 ${isSidebarOpen || isHovered ? 'opacity-100' : 'hidden opacity-0'}`}>
                            Transfer Money
                        </span>
                    </Link>

                    <Link
                        href="/account"
                        className="flex items-center space-x-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <span className={`transition-opacity duration-300 ${isSidebarOpen || isHovered ? 'opacity-100' : 'hidden opacity-0'}`}>
                            Account
                        </span>
                    </Link>
                </nav>
            </aside>

            <div ref={mainContentRef} className={`flex flex-1 flex-col overflow-hidden ${isMobileView && isSidebarOpen ? 'opacity-50' : ''}`}>
                {/* Header */}
                <header className="border-b border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            title="Toggle Sidebar"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                        JD
                                    </div>
                                    <span className="hidden sm:inline-block">John Doe</span>
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
