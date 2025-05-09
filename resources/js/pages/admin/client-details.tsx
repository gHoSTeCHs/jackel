import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, useForm } from '@inertiajs/react';
import { PieChart } from 'react-minimal-pie-chart';
import * as z from 'zod';

interface Transaction {
    id: number;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    description: string;
    created_at: string;
}

interface Client {
    id: number;
    client_id: string;
    account_number: string;
    balance: number;
    status: boolean;
    user: {
        name: string;
        email: string;
    };
    account_type: {
        id: string;
        name: string;
    };
    transactions: Transaction[];
}

interface ClientDetailsProps {
    client: Client;
}

type TransactionFormData = {
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    description: string;
};

type BalanceFormData = {
    amount: number;
    operation: 'add' | 'subtract';
};

const transactionSchema = z.object({
    amount: z.number().min(0.01),
    type: z.enum(['deposit', 'withdrawal', 'transfer']),
    description: z.string().min(1),
});

const balanceSchema = z.object({
    amount: z.number().min(0.01),
    operation: z.enum(['add', 'subtract']),
});

export default function ClientDetails({ client }: ClientDetailsProps) {
    const transactionForm = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        data: {
            amount: 0,
            type: 'deposit',
            description: '',
        },
    });

    const balanceForm = useForm<BalanceFormData>({
        resolver: zodResolver(balanceSchema),
        data: {
            amount: 0,
            operation: 'add',
        },
    });

    const accountTypes = [
        { id: '1', name: 'Checking Account' },
        { id: '2', name: 'Business Account' },
        { id: '3', name: 'Fixed Deposit Account' },
        { id: '4', name: 'Student Account' },
    ];

    // Calculate transaction statistics
    const transactionStats = client.transactions.reduce(
        (acc, transaction) => {
            acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
            return acc;
        },
        {} as Record<string, number>,
    );

    const transactionChartData = [
        { title: 'Deposits', value: transactionStats.deposit || 0, color: '#10B981' },
        { title: 'Withdrawals', value: transactionStats.withdrawal || 0, color: '#EF4444' },
        { title: 'Transfers', value: transactionStats.transfer || 0, color: '#3B82F6' },
    ];

    return (
        <AppLayout>
            <Head title={`Client Details - ${client.user.name}`} />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Client Details</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Client ID</p>
                                    <p>{client.client_id}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Account Number</p>
                                    <p>{client.account_number}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Name</p>
                                    <p>{client.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Email</p>
                                    <p>{client.user.email}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Balance</p>
                                    <p>${client.balance.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Status</p>
                                    <Switch checked={client.status} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative h-[200px]">
                                <PieChart
                                    data={transactionChartData}
                                    lineWidth={20}
                                    paddingAngle={2}
                                    label={({ dataEntry }) => `${dataEntry.title}: $${dataEntry.value.toLocaleString()}`}
                                    labelStyle={{ fontSize: '5px' }}
                                    labelPosition={80}
                                />
                            </div>
                            <div className="mt-4 flex justify-center gap-4">
                                {transactionChartData.map((data) => (
                                    <div key={data.title} className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
                                        <span className="text-sm">{data.title}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Create Transaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    transactionForm.submit('post', '/admin/transactions');
                                }}
                                className="space-y-4"
                            >
                                <FormField
                                    name="amount"
                                    control={transactionForm.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="type"
                                    control={transactionForm.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="deposit">Deposit</SelectItem>
                                                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                                                    <SelectItem value="transfer">Transfer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="description"
                                    control={transactionForm.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Create Transaction</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Update Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    balanceForm.submit('post', '/admin/balance');
                                }}
                                className="space-y-4"
                            >
                                <FormField
                                    name="amount"
                                    control={balanceForm.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="operation"
                                    control={balanceForm.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Operation</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select operation" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="add">Add</SelectItem>
                                                    <SelectItem value="subtract">Subtract</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Update Balance</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {client.transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="capitalize">{transaction.type}</TableCell>
                                            <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                                            <TableCell>{transaction.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
