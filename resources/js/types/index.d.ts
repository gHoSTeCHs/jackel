import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type TransactionType = 'deposit' | 'withdrawal' | 'same-bank-transfer' | 'international-transfer' | 'local-bank-transfer';

export interface Transaction {
    id: number;
    transaction_code: string;
    type: TransactionType;
    amount: number;
    currency?: string;
    recipient_account?: string;
    recipient_name?: string;
    bank_name?: string;
    bank_address?: string;
    swift_code?: string;
    beneficiary_address?: string;
    reference?: string;
    description?: string;
    client: {
        client_id: string;
        account_number: string;
        user: {
            name: string;
        };
    };
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    created_at: string;
}

