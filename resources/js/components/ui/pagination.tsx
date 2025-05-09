import { Link } from '@inertiajs/react';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export const Pagination = ({ currentPage, lastPage, links }: PaginationProps) => {
    if (lastPage <= 1) return null;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={links.find((link) => link.label === 'Previous')?.url || ''}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    preserveScroll
                >
                    Previous
                </Link>
                <Link
                    href={links.find((link) => link.label === 'Next')?.url || ''}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    preserveScroll
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{lastPage}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {links
                            .filter((link) => link.url !== null)
                            .map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ''}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${index === 0 ? 'rounded-l-md' : ''} ${index === links.length - 1 ? 'rounded-r-md' : ''} ${link.active ? 'z-10 bg-purple-600 text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-purple-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};
