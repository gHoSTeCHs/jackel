import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const Dashboard = () => {
    const mockTransactions = [
        {
            code: 'TXN12345',
            accountNumber: 'ACC98765',
            type: 'Deposit',
            amount: '$500.00',
            owner: 'John Doe',
            timestamp: '2023-10-27 10:00 AM',
        },
        {
            code: 'TXN67890',
            accountNumber: 'ACC54321',
            type: 'Withdrawal',
            amount: '$200.00',
            owner: 'Jane Smith',
            timestamp: '2023-10-27 11:30 AM',
        },
        {
            code: 'TXN11223',
            accountNumber: 'ACC12345',
            type: 'Transfer',
            amount: '$150.00',
            owner: 'Alice Brown',
            timestamp: '2023-10-26 02:15 PM',
        },
    ];
    return (
        <MainLayout>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="text-dark m-0">Client Dashboard</h1>
                        </div>

                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link href="#">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-info elevation-1">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Deposits</span>
                                    <span className="info-box-number">Deposits</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3 col-12">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-danger elevation-1">
                                    <i className="fas fa-download"></i>
                                </span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Withdrawals</span>
                                    <span className="info-box-number">$ Withdrawals </span>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix hidden-md-up"></div>

                        <div className="col-sm-6 col-md-3 col-12">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-success elevation-1">
                                    <i className="fas fa-random"></i>
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Transfers</span>
                                    <span className="info-box-number">$ Transfers</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3 col-12">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-purple elevation-1">
                                    <i className="fas fa-money-bill-alt"></i>
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Wallet Balance</span>
                                    <span className="info-box-number">$ Account balance</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header border-transparent">
                                    <h3 className="card-title">Latest Transactions</h3>

                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="collapse-button">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <button type="button" className="btn btn-tool" data-card-widget="remove" title="remove-button">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table-striped table-hover m-0 table">
                                            <thead>
                                                <tr>
                                                    <th>Transaction Code</th>
                                                    <th>Account No.</th>
                                                    <th>Type</th>
                                                    <th>Amount</th>
                                                    <th>Acc. Owner</th>
                                                    <th>Timestamp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mockTransactions.map((transaction) => (
                                                    <tr key={transaction.code}>
                                                        <td>{transaction.code}</td>
                                                        <td>{transaction.accountNumber}</td>
                                                        <td>
                                                            <span
                                                                className={`badge ${transaction.type === 'Deposit' ? 'badge-success' : transaction.type === 'Transfer' ? 'badge-warning' : transaction.type === 'Withdrawal' ? 'badge-danger' : ''}`}
                                                            >
                                                                {transaction.type}
                                                            </span>
                                                        </td>
                                                        <td>{transaction.amount}</td>
                                                        <td>{transaction.owner}</td>
                                                        <td>{transaction.timestamp}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="card-footer clearfix">
                                    <Link href="#" className="btn btn-sm btn-info float-left">
                                        View All
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Dashboard;
