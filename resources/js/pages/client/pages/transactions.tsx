import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const Transactions = () => {
    // Mock transaction data
    const mockTransactions = [
        {
            id: 1,
            code: 'TXN001',
            accountNumber: 'ACC12345',
            type: 'Deposit',
            amount: 500.0,
            owner: 'John Doe',
            timestamp: '2023-10-27 10:00:00',
        },
        {
            id: 2,
            code: 'TXN002',
            accountNumber: 'ACC67890',
            type: 'Withdrawal',
            amount: 150.0,
            owner: 'Jane Smith',
            timestamp: '2023-10-27 11:30:00',
        },
        {
            id: 3,
            code: 'TXN003',
            accountNumber: 'ACC12345',
            type: 'Transfer',
            amount: 200.0,
            owner: 'John Doe',
            timestamp: '2023-10-28 09:15:00',
        },
        {
            id: 4,
            code: 'TXN004',
            accountNumber: 'ACC54321',
            type: 'Deposit',
            amount: 1000.0,
            owner: 'Alice Brown',
            timestamp: '2023-10-28 14:00:00',
        },
    ];

    const getBadgeClass = (type: string) => {
        switch (type) {
            case 'Deposit':
                return 'badge-success';
            case 'Withdrawal':
                return 'badge-danger';
            case 'Transfer':
                return 'badge-warning';
            default:
                return 'badge-secondary';
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <MainLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Transaction History</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link href={'/client'}>Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Transaction History</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Your Recent Transactions</h3>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="transactionsTable" className="table-hover table-striped table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Transaction Code</th>
                                                    <th>Account No.</th>
                                                    <th>Type</th>
                                                    <th>Amount</th>
                                                    <th>Acc. Owner</th>
                                                    <th>Timestamp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mockTransactions.map((transaction, index) => (
                                                    <tr key={transaction.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{transaction.code}</td>
                                                        <td>{transaction.accountNumber}</td>
                                                        <td>
                                                            <span className={`badge ${getBadgeClass(transaction.type)}`}>{transaction.type}</span>
                                                        </td>
                                                        <td>$ {transaction.amount.toFixed(2)}</td>
                                                        <td>{transaction.owner}</td>
                                                        <td>{formatDate(transaction.timestamp)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Transactions;
