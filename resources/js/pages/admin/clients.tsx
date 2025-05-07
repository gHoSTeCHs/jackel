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

interface Client {
    id: number;
    client_id: string;
    account_number: string;
    user: {
        name: string;
        email: string;
    };
    account_type: {
        name: string;
    };
    status: boolean;
    balance: number;
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
                                    <TableHead>Client ID</TableHead>
                                    <TableHead>Account Number</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Account Type</TableHead>
                                    <TableHead>Balance</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients?.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>{client.client_id}</TableCell>
                                        <TableCell>{client.account_number}</TableCell>
                                        <TableCell>{client.user.name}</TableCell>
                                        <TableCell>{client.user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{client.account_type.name}</Badge>
                                        </TableCell>
                                        <TableCell>${client.balance.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Switch checked={client.status} onCheckedChange={() => {}} aria-label="Toggle account status" />
                                        </TableCell>
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
