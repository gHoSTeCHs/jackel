import { CreateClientDialog } from '@/components/create-client-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';

interface Account {
    id: number;
    account_number: string;
    balance: number;
    status: boolean;
    account_type: {
        name: string;
    };
}

interface Client {
    id: number;
    user: {
        name: string;
        email: string;
    };
    accounts: Account[];
    total_balance: number;
}

interface ClientsPageProps {
    clients: Client[];
    accountTypes: {
        id: string;
        name: string;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/admin/clients',
    },
];

export default function Clients({ clients }: ClientsPageProps) {
    const accountTypes = [
        { id: '1', name: 'Checking Account' },
        { id: '2', name: 'Business Account' },
        { id: '3', name: 'Fixed Deposit Account' },
        { id: '4', name: 'Student Account' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients Management" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
                    <CreateClientDialog accountTypes={accountTypes} />
                </div>

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                        <Input placeholder="Search clients..." className="pl-8" />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Accounts</TableHead>
                                    <TableHead>Total Balance</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients?.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>{client.user.name}</TableCell>
                                        <TableCell>{client.user.email}</TableCell>
                                        <TableCell>
                                            {client.accounts.map((account) => (
                                                <div key={account.id} className="mb-1 last:mb-0">
                                                    <Badge variant="outline" className="mr-2">
                                                        {account.account_type.name}
                                                    </Badge>
                                                    <span className="text-muted-foreground text-sm">{account.account_number}</span>
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell>${client.total_balance.toLocaleString()}</TableCell>
                                        <TableCell>
                                            {client.accounts.map((account) => (
                                                <div key={account.id} className="mb-1 last:mb-0">
                                                    <Switch
                                                        checked={account.status}
                                                        onCheckedChange={() => {}}
                                                        aria-label={`Toggle account status for ${account.account_number}`}
                                                    />
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => (window.location.href = `/admin/clients/${client.id}`)}
                                            >
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
