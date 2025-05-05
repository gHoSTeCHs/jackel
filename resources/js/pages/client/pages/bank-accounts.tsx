import { Link } from '@inertiajs/react';

const BankAccounts = () => {
    return (
        <div className="hold-transition sidebar-mini layout-fixed layout-navbar-fixed">
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i className="fas fa-bars"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="wrapper">
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <Link href={'/client'} className="brand-link">
                        <img src="https://placehold.co/600x400" alt="iBanking Logo" className="brand-image img-circle elevation-3 opacity-80" />
                        <span className="brand-text font-weight-light">Bank Name</span>
                    </Link>

                    <div className="sidebar">
                        <div className="user-panel d-flex mt-3 mb-3 pb-3">
                            <div className="image">
                                <img src="https://placehold.co/600x400" className="elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <Link href="#" className="d-block">
                                    User Name
                                </Link>
                            </div>
                        </div>

                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item has-treeview">
                                    <Link href={'/client'} className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p>Dashboard</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link href={'/client-account'} className="nav-link">
                                        <i className="nav-icon fas fa-user-tie"></i>
                                        <p>Account</p>
                                    </Link>
                                </li>

                                <li className="nav-item has-treeview">
                                    <Link href="#" className="nav-link">
                                        <i className="nav-icon fas fa-briefcase"></i>
                                        <p>
                                            iBank Accounts
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href={'/bank-accounts'} className="nav-link">
                                                <i className="fas fa-cog nav-icon"></i>
                                                <p>My iBank Accounts</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item has-treeview">
                                    <Link href="#" className="nav-link">
                                        <i className="nav-icon fas fa-dollar-sign"></i>
                                        <p>
                                            Finances
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link">
                                                <i className="fas fa-upload nav-icon"></i>
                                                <p>Deposits</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link">
                                                <i className="fas fa-download nav-icon"></i>
                                                <p>Withdrawals</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link">
                                                <i className="fas fa-random nav-icon"></i>
                                                <p>Transfers</p>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="#" className="nav-link">
                                                <i className="fas fa-money-bill-alt nav-icon"></i>
                                                <p>Balance Enquiries</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-header">Advanced Modules</li>
                                <li className="nav-item">
                                    <Link href="#" className="nav-link">
                                        <i className="nav-icon fas fa-exchange-alt"></i>
                                        <p>Transactions History</p>
                                    </Link>
                                </li>

                                <li className="nav-item has-treeview">
                                    <Link href="#" className="nav-link">
                                        <i className="nav-icon fas fa-file-invoice-dollar"></i>
                                        <p>
                                            Financial Reports
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link">
                                                <i className="fas fa-file-upload nav-icon"></i>
                                                <p>Deposits</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link">
                                                <i className="fas fa-cart-arrow-down nav-icon"></i>
                                                <p>Withdrawals</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link">
                                                <i className="fas fa-random nav-icon"></i>
                                                <p>Transfers</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <Link href="#" className="nav-link">
                                        <i className="nav-icon fas fa-power-off"></i>
                                        <p>Log Out</p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>My Accounts</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <a href="#">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#">iBank Accounts</a>
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
                                                <tr>
                                                    <td>Account Name</td>
                                                    <td>Account Name</td>
                                                    <td>Account Number</td>
                                                    <td>Account rates</td>
                                                    <td>Acc type</td>
                                                    <td>Client Name</td>
                                                    <td>Date Opened</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="control-sidebar control-sidebar-dark"></aside>
            </div>
        </div>
    );
};

export default BankAccounts;
