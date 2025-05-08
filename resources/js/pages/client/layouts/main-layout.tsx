import { MainLayoutProps } from '@/types/layout';
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
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`${
                    isMobileView ? 'fixed' : 'relative'
                } inset-y-0 left-0 z-50 bg-gray-800 text-white transition-all duration-300 ease-in-out ${
                    isMobileView ? (isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full') : isSidebarOpen || isHovered ? 'w-64' : 'w-16'
                }`}
            >
                <div className="flex items-center border-b border-gray-700 p-5">
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gray-600" />
                        <span
                            className={`text-lg font-semibold transition-opacity duration-300 ${
                                isSidebarOpen || isHovered ? 'opacity-100' : 'hidden opacity-0'
                            }`}
                        >
                            Bank Name
                        </span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2 p-4">
                    <a href="#" className="flex items-center space-x-3 rounded-lg bg-gray-700 p-3">
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
                    </a>
                </nav>
            </aside>

            <div ref={mainContentRef} className={`flex flex-1 flex-col overflow-hidden ${isMobileView && isSidebarOpen ? 'opacity-50' : ''}`}>
                {/* Header */}
                <header className="border-b border-gray-700 bg-white shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="button"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center space-x-4">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600" />
                            <span className="text-gray-800 dark:text-white">User Name</span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
