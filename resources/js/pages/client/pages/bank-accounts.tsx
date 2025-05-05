import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const BankAccounts = () => {
    const mockAccounts = [
        {
            id: 1,
            name: 'Savings Account',
            accountNumber: 'ACC123456789',
            rate: '1.5%',
            type: 'Savings',
            owner: 'John Doe',
            dateOpened: '2023-01-15',
        },
        {
            id: 2,
            name: 'Checking Account',
            accountNumber: 'ACC987654321',
            rate: '0.5%',
            type: 'Checking',
            owner: 'John Doe',
            dateOpened: '2022-11-20',
        },
        {
            id: 3,
            name: 'Investment Account',
            accountNumber: 'ACC555555555',
            rate: 'Variable',
            type: 'Investment',
            owner: 'John Doe',
            dateOpened: '2024-03-10',
        },
    ];

    return (
        <MainLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>My Accounts</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link href="/client">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link href="#">iBank Accounts</Link>
                                </li>
                                <li className="breadcrumb-item active">My Accounts</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">iBanking Accounts</h3>
                            </div>
                            <div className="card-body">
                                <table id="example1" className="table-bordered table-hover table-striped table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Account No.</th>
                                            <th>Rate</th>
                                            <th>Acc. Type</th>
                                            <th>Acc. Owner</th>
                                            <th>Date Opened</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockAccounts.map((account, index) => (
                                            <tr key={account.id}>
                                                <td>{index + 1}</td>
                                                <td>{account.name}</td>
                                                <td>{account.accountNumber}</td>
                                                <td>{account.rate}</td>
                                                <td>{account.type}</td>
                                                <td>{account.owner}</td>
                                                <td>{account.dateOpened}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default BankAccounts;
