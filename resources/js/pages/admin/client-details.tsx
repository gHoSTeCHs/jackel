import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PieChart } from 'react-minimal-pie-chart';

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

type BalanceFormData = {
    amount: number;
    operation: 'add' | 'subtract';
    reason?: string;
};

const UpdateClientBalance = ({ clientId, currentBalance }: { clientId: number; currentBalance: number }) => {
    const { data, setData, errors, post } = useForm<BalanceFormData>({
        amount: 0,
        operation: 'add',
        reason: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('clients.update-balance', { client: clientId }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData('amount', Number(e.target.value))}
                            placeholder="Enter amount"
                        />
                        {errors.amount && <p className="text-destructive text-sm">{errors.amount}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="operation">Operation</Label>
                        <Select value={data.operation} onValueChange={(value) => setData('operation', value as 'add' | 'subtract')}>
                            <SelectTrigger id="operation">
                                <SelectValue placeholder="Select operation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="add">Add</SelectItem>
                                <SelectItem value="subtract">Subtract</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.operation && <p className="text-destructive text-sm">{errors.operation}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason (Optional)</Label>
                        <Input
                            id="reason"
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            placeholder="Reason for balance adjustment"
                        />
                        {errors.reason && <p className="text-destructive text-sm">{errors.reason}</p>}
                    </div>
                    <div className="text-muted-foreground text-sm">Current Balance: ${currentBalance.toLocaleString()}</div>
                    <Button type="submit">Update Balance</Button>
                </form>
            </CardContent>
        </Card>
    );
};

type TransactionFormData = {
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    description: string;
};

export default function ClientDetails({ client }: ClientDetailsProps) {
    const { data, setData, errors, post } = useForm<TransactionFormData>({
        amount: 0,
        type: 'deposit',
        description: '',
    });

    const handleTransactionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('transactions.store', { client: client.id }));
    };

    const transactionStats = client.transactions.reduce(
        (acc, transaction) => {
            acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
            return acc;
        },
        {} as Record<string, number>,
    );

    const transactionChartData = [
        { title: 'Deposits', value: Number(transactionStats.deposit) || 0, color: '#10B981' },
        { title: 'Withdrawals', value: Number(transactionStats.withdrawal) || 0, color: '#EF4444' },
        { title: 'Transfers', value: Number(transactionStats.transfer) || 0, color: '#3B82F6' },
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
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Account Type</p>
                                    <p>{client.account_type.name}</p>
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
                            <form onSubmit={handleTransactionSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', Number(e.target.value))}
                                        placeholder="Enter amount"
                                    />
                                    {errors.amount && <p className="text-destructive text-sm">{errors.amount}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(value) => setData('type', value as 'deposit' | 'withdrawal' | 'transfer')}
                                    >
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="deposit">Deposit</SelectItem>
                                            <SelectItem value="withdrawal">Withdrawal</SelectItem>
                                            <SelectItem value="transfer">Transfer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <p className="text-destructive text-sm">{errors.type}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter description"
                                    />
                                    {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                                </div>
                                <Button type="submit">Create Transaction</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <UpdateClientBalance clientId={client.id} currentBalance={client.balance} />

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {client.transactions.length > 0 ? (
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
                            ) : (
                                <p className="text-muted-foreground py-4 text-center">No transactions yet</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
