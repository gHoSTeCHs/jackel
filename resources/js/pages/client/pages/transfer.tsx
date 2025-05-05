import MainLayout from '@/pages/client/layouts/main-layout';
import { Link } from '@inertiajs/react';

const Transfer = () => {
    return (
        <MainLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Funds Transfers</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link href="#">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link href="#">iBank Finances</Link>
                                </li>
                                <li className="breadcrumb-item active">Transfers</li>
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
                                <h3 className="card-title">Select on any account to transfer funds from</h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example1" className="table-hover table-bordered table-striped table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Acc Number</th>
                                                <th>Rate</th>
                                                <th>Acc Type</th>
                                                <th>Acc Owner</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>Cnt</td>
                                                <td>Account Name</td>
                                                <td>Account Number</td>
                                                <td>Account Rates</td>
                                                <td>AccountType</td>
                                                <td>Client Name</td>
                                                <td>
                                                    <a className="btn btn-success btn-sm" href={'/transfer/7802094682038'}>
                                                        <i className="fas fa-money-bill-alt"></i>
                                                        Transfer Money
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
export default Transfer;
