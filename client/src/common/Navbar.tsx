import React from "react";
import { Menu } from "antd";

const Navbar: React.FC = () => {
    return (
        <Menu mode={'horizontal'}>
            <Menu.Item key="explore">Explore</Menu.Item>
            <Menu.Item key="features">Features</Menu.Item>
            <Menu.Item key="about">About Us</Menu.Item>
            <Menu.Item key="contact">Contact Us</Menu.Item>
        </Menu>
    );
};

export default Navbar;