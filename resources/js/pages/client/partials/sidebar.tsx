import { Link } from '@inertiajs/react';

const Sidebar = () => {
    return (
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
                            <Link href="/client" className="nav-link">
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
    );
};

export default Sidebar;
