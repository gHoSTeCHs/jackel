const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="#" className="brand-link">
                <img src={''} alt="iBanking Logo" className="brand-image img-circle elevation-3 opacity-80" />
                <span className="brand-text font-weight-light">Bank Name</span>
            </a>

            <div className="sidebar">
                <div className="user-panel d-flex mt-3 mb-3 pb-3">
                    <div className="image">
                        <img src={''} className="elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">
                            User Name
                        </a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item has-treeview">
                            <a href="pages_dashboard.php" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a href="pages_account.php" className="nav-link">
                                <i className="nav-icon fas fa-user-tie"></i>
                                <p>Account</p>
                            </a>
                        </li>

                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-briefcase"></i>
                                <p>
                                    iBank Accounts
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages_open_acc.php" className="nav-link">
                                        <i className="fas fa-lock-open nav-icon"></i>
                                        <p>Open iBank Acc</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages_manage_acc_openings.php" className="nav-link">
                                        <i className="fas fa-cog nav-icon"></i>
                                        <p>My iBank Accounts</p>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-dollar-sign"></i>
                                <p>
                                    Finances
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages_deposits.php" className="nav-link">
                                        <i className="fas fa-upload nav-icon"></i>
                                        <p>Deposits</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages_withdrawals.php" className="nav-link">
                                        <i className="fas fa-download nav-icon"></i>
                                        <p>Withdrawals</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages_transfers.php" className="nav-link">
                                        <i className="fas fa-random nav-icon"></i>
                                        <p>Transfers</p>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="pages_view_client_bank_acc.php" className="nav-link">
                                        <i className="fas fa-money-bill-alt nav-icon"></i>
                                        <p>Balance Enquiries</p>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-header">Advanced Modules</li>
                        <li className="nav-item">
                            <a href="pages_transactions_engine.php" className="nav-link">
                                <i className="nav-icon fas fa-exchange-alt"></i>
                                <p>Transactions History</p>
                            </a>
                        </li>

                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-file-invoice-dollar"></i>
                                <p>
                                    Financial Reports
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages_financial_reporting_deposits.php" className="nav-link">
                                        <i className="fas fa-file-upload nav-icon"></i>
                                        <p>Deposits</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages_financial_reporting_withdrawals.php" className="nav-link">
                                        <i className="fas fa-cart-arrow-down nav-icon"></i>
                                        <p>Withdrawals</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages_financial_reporting_transfers.php" className="nav-link">
                                        <i className="fas fa-random nav-icon"></i>
                                        <p>Transfers</p>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="pages_logout.php" className="nav-link">
                                <i className="nav-icon fas fa-power-off"></i>
                                <p>Log Out</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
