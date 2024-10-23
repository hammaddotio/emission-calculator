import React, { ReactNode, useState } from 'react';
import { Layout, Menu, Drawer, Button, Typography, Avatar } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    MenuOutlined,
    CloseOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/auth/authSlice";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
    children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log('Logout clicked');
        dispatch(logout());
    };

    const menuItems = [
        { label: 'Dashboard', key: 'dashboard', icon: <DashboardOutlined /> },
        { label: 'Users', key: 'users', icon: <UserOutlined /> },
        { label: 'Logout', key: 'logout', icon: <LogoutOutlined />, onClick: handleLogout },
    ];

    const handleMenuClick = (key: string) => {
        if (key === 'logout') {
            handleLogout();
        } else {
            navigate(`/${key}`);
        }
        setDrawerVisible(false); // Close the drawer after navigation
    };

    const drawerContent = (
        <Menu
            mode="inline"
            theme="light"
            defaultSelectedKeys={['dashboard']}
            style={{ width: 256 }}
        >
            {menuItems.map((item) => (
                <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => handleMenuClick(item.key)}
                >
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/arty-node-logo.png" alt="Admin Panel Logo" style={{ marginRight: 16 }} />
                    <Typography.Title level={4} style={{ margin: 0 }}>Welcome</Typography.Title>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
            </Header>
            <Layout>
                <Sider collapsible collapsed={collapsed}>
                    {drawerContent}
                </Sider>
                <Layout>
                    <Content style={{ padding: '24px', margin: 0 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>

            {/* Drawer for mobile view */}
            <Drawer
                title="Menu"
                placement="left"
                closable={true}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                bodyStyle={{ padding: 0 }}
            >
                {drawerContent}
            </Drawer>

            {/* Button to toggle drawer on mobile */}
            <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                style={{ position: 'fixed', bottom: 20, right: 20 }}
            />
        </Layout>
    );
};

export default AdminLayout;
