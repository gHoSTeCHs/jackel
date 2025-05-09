import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;
    return (
        <div className="flex min-h-svh">
            {/* Left side - Image */}
            <div className="relative hidden w-1/2 lg:block">
                <div className="absolute inset-0 flex flex-col">
                    <div className="relative flex-1 bg-[#E6DFD7]">
                        <img src="/images/auth-bg.jpg" alt="Authentication background" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
                            <h2 className="text-3xl font-bold">Lorem Ipsum is simply</h2>
                            <p className="mt-2">Lorem Ipsum is simply</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="bg-background flex w-full flex-col items-center justify-center px-6 py-8 lg:w-1/2 lg:px-8">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                    <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                                </div>
                                <span className="sr-only">{name}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-muted-foreground text-center text-sm">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
