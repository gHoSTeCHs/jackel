import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Account } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    client_id: z.string().min(1, 'Please select a client'),
    type: z.enum(['deposit', 'withdrawal', 'same-bank-transfer', 'local-bank-transfer', 'international-transfer'], {
        required_error: 'Please select a transaction type',
    }),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Amount must be greater than 0'),
    currency: z.string().optional(),
    recipient_account: z.string().optional(),
    recipient_name: z.string().optional(),
    bank_name: z.string().optional(),
    bank_address: z.string().optional(),
    swift_code: z.string().optional(),
    beneficiary_address: z.string().optional(),
    reference: z.string().optional(),
    description: z.string().optional(),
});

const transferTypeLabels = {
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
    'same-bank-transfer': 'Same Bank Transfer',
    'local-bank-transfer': 'Local Bank Transfer',
    'international-transfer': 'International Wire Transfer',
};

interface CreateTransactionDialogProps {
    accounts: Account[];
}

export function CreateTransactionDialog({ accounts }: CreateTransactionDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client_id: '',
            type: 'deposit',
            amount: '',
            currency: 'USD',
            recipient_account: '',
            recipient_name: '',
            bank_name: '',
            bank_address: '',
            swift_code: '',
            beneficiary_address: '',
            reference: '',
            description: '',
        },
    });

    const watchTransactionType = form.watch('type');

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post('/admin/transactions', values, {
            onSuccess: () => {
                form.reset();
            },
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Transaction</DialogTitle>
                    <DialogDescription>Fill in the transaction details to process a new transaction.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="client_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an account" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {accounts.map((account) => (
                                                <SelectItem key={account.id} value={account.id}>
                                                    {account.client.user.name} - {account.account_number}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select transaction type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.entries(transferTypeLabels).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {watchTransactionType === 'international-transfer' && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Currency</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select currency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                                                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                                                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {(watchTransactionType === 'same-bank-transfer' ||
                            watchTransactionType === 'local-bank-transfer' ||
                            watchTransactionType === 'international-transfer') && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="recipient_account"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Recipient Account Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter account number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="recipient_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Recipient Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter recipient name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {(watchTransactionType === 'local-bank-transfer' || watchTransactionType === 'international-transfer') && (
                            <FormField
                                control={form.control}
                                name="bank_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter bank name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {watchTransactionType === 'international-transfer' && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="bank_address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bank Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter bank address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="swift_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SWIFT/BIC Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter SWIFT code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="beneficiary_address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Beneficiary Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter beneficiary address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {(watchTransactionType === 'same-bank-transfer' ||
                            watchTransactionType === 'local-bank-transfer' ||
                            watchTransactionType === 'international-transfer') && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="reference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reference</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Invoice payment" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Additional details about this transfer" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0.01" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                Create Transaction
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
