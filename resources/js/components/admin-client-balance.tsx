import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

type BalanceFormData = {
    amount: number;
    operation: 'add' | 'subtract';
};

const UpdateClientBalance = () => {
    const { data, setData, errors, post } = useForm<BalanceFormData>({
        amount: 0,
        operation: 'add',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/update-balance');
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
                    <Button type="submit">Update Balance</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default UpdateClientBalance;
