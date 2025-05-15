export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface Account {
    id: string;
    account_number: string;
    client: {
        id: string;
        client_id: string;
        user: {
            name: string;
        };
    };
}

export interface Transaction {
    id: string;
    transaction_code: string;
    type: 'deposit' | 'withdrawal' | 'same-bank-transfer' | 'local-bank-transfer' | 'international-transfer';
    amount: number;
    currency?: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    created_at: string;
    account?: Account;
    recipient_account?: string;
    recipient_name?: string;
    bank_name?: string;
    bank_address?: string;
    swift_code?: string;
    beneficiary_address?: string;
    reference?: string;
    description?: string;
}
