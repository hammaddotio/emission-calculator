import React, { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    console.log(isAuthenticated)

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center p-4 bg-white shadow">
                <h1 className="text-xl font-bold">Your Logo</h1>
                <Button
                    type="primary"
                    onClick={showDrawer}
                    className="md:hidden" // Hide the button on larger screens
                >
                    Menu
                </Button>
                <Menu mode={'horizontal'} className="hidden md:flex"> {/* Show menu only on medium screens and up */}
                    <Menu.Item key="home">
                        <Link to={'/'}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="dashboard">
                        <Link to={'/dashboard'}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="calculators">
                        <Link to={'/calculators'} >Calculators</Link>
                    </Menu.Item>
                </Menu>
            </div>

            <Drawer
                title="Menu"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Menu mode={'inline'}>
                    <Menu.Item key="home" onClick={onClose}>
                        <Link to={'/'}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="dashboard" onClick={onClose}>
                        <Link to={'/dashboard'}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="calculators" onClick={onClose}>
                        <Link to={'/calculators'}>Calculators</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </div>
    );
};

export default Navbar;
