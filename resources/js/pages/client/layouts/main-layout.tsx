import Nav from '@/pages/client/partials/nav';
import Sidebar from '@/pages/client/partials/sidebar';
import React, { useEffect } from 'react';

declare global {
    interface Window {
        $: any;
    }
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        document.body.classList.add('hold-transition', 'sidebar-mini', 'layout-fixed', 'layout-navbar-fixed');

        console.log('Attempting to initialize AdminLTE widgets in MainLayout useEffect...');
        try {
            const pushMenuElement = window.$('[data-widget="pushmenu"]');
            if (pushMenuElement.length > 0 && window.$ && window.$.fn && window.$.fn.PushMenu) {
                pushMenuElement.PushMenu();
                console.log('AdminLTE PushMenu initialized successfully.');
            } else if (pushMenuElement.length === 0) {
                console.warn("AdminLTE PushMenu element '[data-widget=pushmenu]' not found.");
            } else {
                console.warn('AdminLTE PushMenu jQuery plugin not found.');
            }

            const cardWidgetElement = window.$('[data-card-widget]');
            if (cardWidgetElement.length > 0 && window.$ && window.$.fn && window.$.fn.CardWidget) {
                cardWidgetElement.CardWidget();
                console.log('AdminLTE CardWidget initialized successfully.');
            } else if (cardWidgetElement.length === 0) {
                console.warn("AdminLTE CardWidget element '[data-card-widget]' not found.");
            } else {
                console.warn('AdminLTE CardWidget jQuery plugin not found.');
            }

            const overlay = document.getElementById('sidebar-overlay');
            if (overlay) {
                overlay.onclick = () => {
                    document.body.classList.remove('sidebar-open');

                    const pushMenuElement = window.$('[data-widget="pushmenu"]');
                    if (pushMenuElement.length > 0 && window.$ && window.$.fn && window.$.fn.PushMenu) {
                        pushMenuElement.PushMenu('collapse');
                    }
                    overlay.classList.remove('active');
                };
            }
        } catch (error) {
            console.error('Error initializing AdminLTE widgets:', error);
        }

        return () => {
            console.log('Cleaning up MainLayout: Removing body classes and disposing widgets...');
            document.body.classList.remove('hold-transition', 'sidebar-mini', 'layout-fixed', 'layout-navbar-fixed');
            try {
                const pushMenuElement = window.$('[data-widget="pushmenu"]');
                if (pushMenuElement.length > 0 && window.$ && window.$.fn && window.$.fn.PushMenu && typeof pushMenuElement.PushMenu === 'function') {
                    pushMenuElement.PushMenu('dispose');
                    console.log('AdminLTE PushMenu disposed.');
                } else {
                    console.warn('AdminLTE PushMenu element or plugin not available for disposal.');
                }

                const cardWidgetElement = window.$('[data-card-widget]');
                if (
                    cardWidgetElement.length > 0 &&
                    window.$ &&
                    window.$.fn &&
                    window.$.fn.CardWidget &&
                    typeof cardWidgetElement.CardWidget === 'function'
                ) {
                    if (typeof cardWidgetElement.CardWidget('dispose') === 'function') {
                        cardWidgetElement.CardWidget('dispose');
                        console.log('AdminLTE CardWidget disposed.');
                    } else if (typeof cardWidgetElement.CardWidget('destroy') === 'function') {
                        cardWidgetElement.CardWidget('destroy');
                        console.log('AdminLTE CardWidget destroyed.');
                    } else {
                        console.warn("AdminLTE CardWidget does not support 'dispose' or 'destroy'.");
                    }
                } else {
                    console.warn('AdminLTE CardWidget element or plugin not available for destruction/disposal.');
                }
            } catch (error) {
                console.error('Error disposing/destroying AdminLTE widgets:', error);
            }
            console.log('MainLayout cleanup finished.');
        };
    }, []);

    return (
        <div className="wrapper">
            <Nav />
            <Sidebar />

            <div className="content-wrapper">{children}</div>

            <div
                id="sidebar-overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.3)',
                    zIndex: 1040,
                    display: 'none',
                    transition: 'opacity 0.3s',
                }}
            ></div>
        </div>
    );
};

export default MainLayout;
