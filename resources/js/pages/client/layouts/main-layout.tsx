import Nav from '@/pages/client/partials/nav';
import Sidebar from '@/pages/client/partials/sidebar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="hold-transition sidebar-mini layout-fixed layout-navbar-fixed">
            <div className="wrapper">
                <Nav />
                <Sidebar />
                <div className="content-wrapper">{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
