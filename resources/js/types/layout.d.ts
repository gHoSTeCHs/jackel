export interface SidebarItem {
    icon: string;
    label: string;
    path: string;
    isActive?: boolean;
}

export interface HeaderProps {
    bankName: string;
    userName: string;
}

export interface MainLayoutProps {
    children?: React.ReactNode;
}
