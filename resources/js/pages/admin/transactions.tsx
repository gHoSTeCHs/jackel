import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Filter, Plus, Search } from 'lucide-react';

interface Transaction {
    id: number;
    transaction_code: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    client: {
        client_id: string;
        account_number: string;
        user: {
            name: string;
        };
    };
    status: boolean;
    created_at: string;
}

interface TransactionsPageProps {
    transactions: Transaction[];
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
        case 'transfer':
            return 'secondary';
        default:
            return 'outline';
    }
};

export default function Transactions({ transactions }: TransactionsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions Management" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Transaction
                    </Button>
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
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">{transaction.transaction_code}</TableCell>
                                        <TableCell>{transaction.client.user.name}</TableCell>
                                        <TableCell>{transaction.client.account_number}</TableCell>
                                        <TableCell>
                                            <Badge variant={getTransactionBadgeVariant(transaction.type)}>
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={transaction.status ? 'outline' : 'secondary'}>
                                                {transaction.status ? 'Completed' : 'Pending'}
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
