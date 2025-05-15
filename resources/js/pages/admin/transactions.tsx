import { CreateTransactionDialog } from '@/components/create-transaction-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Account, Transaction, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Filter, Search } from 'lucide-react';

interface TransactionsPageProps {
    transactions: Transaction[];
    accounts: Account[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/admin/transactions',
    },
];

const getTransactionBadgeVariant = (type: Transaction['type']): 'destructive' | 'default' | 'secondary' | 'outline' => {
    switch (type) {
        case 'deposit':
            return 'default';
        case 'withdrawal':
            return 'destructive';
        case 'same-bank-transfer':
            return 'secondary';
        case 'local-bank-transfer':
            return 'secondary';
        case 'international-transfer':
            return 'secondary';
        default:
            return 'outline';
    }
};

const getTransactionTypeLabel = (type: Transaction['type']): string => {
    switch (type) {
        case 'deposit':
            return 'Deposit';
        case 'withdrawal':
            return 'Withdrawal';
        case 'same-bank-transfer':
            return 'Same Bank Transfer';
        case 'local-bank-transfer':
            return 'Local Bank Transfer';
        case 'international-transfer':
            return 'International Transfer';
        default:
            return type;
    }
};

export default function Transactions({ transactions, accounts }: TransactionsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions Management" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
                    <CreateTransactionDialog accounts={accounts} />
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                        <Input placeholder="Search transactions..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction Code</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Recipent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions?.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">{transaction.transaction_code}</TableCell>
                                        <TableCell>{transaction.account?.client?.user?.name || 'N/A'}</TableCell>
                                        <TableCell>{transaction.account?.account_number || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Badge variant={getTransactionBadgeVariant(transaction.type)}>
                                                {getTransactionTypeLabel(transaction.type)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {transaction.currency ? `${transaction.currency} ` : '$'}
                                            {transaction.amount.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.type === 'same-bank-transfer' ||
                                            transaction.type === 'local-bank-transfer' ||
                                            transaction.type === 'international-transfer' ? (
                                                <div className="space-y-1 text-sm">
                                                    <p className="font-medium">{transaction.recipient_name}</p>
                                                    <p className="text-gray-500">{transaction.recipient_account}</p>
                                                    {transaction.bank_name && <p className="text-gray-500">{transaction.bank_name}</p>}
                                                    {transaction.swift_code && <p className="text-gray-500">SWIFT: {transaction.swift_code}</p>}
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    transaction.status === 'completed'
                                                        ? 'default'
                                                        : transaction.status === 'failed'
                                                          ? 'destructive'
                                                          : transaction.status === 'cancelled'
                                                            ? 'outline'
                                                            : 'secondary'
                                                }
                                            >
                                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
