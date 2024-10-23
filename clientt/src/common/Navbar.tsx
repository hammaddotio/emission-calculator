import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/auth/authSlice";



const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [visible, setVisible] = useState(false);
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    const userRole = useSelector((state: any) => state.auth.userRole)
    // const logout = useSelector((state: any) => state.auth.logout)
    console.log(isAuthenticated)
    console.log(userRole)

    // const showDrawer = () => {
    //     setVisible(true);
    // };

    // const onClose = () => {
    //     setVisible(false);
    // };
    const handleLogOut = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <>
            {
                isAuthenticated ? (
                    <div>


                        <div className="flex justify-between items-center p-4 bg-white shadow">
                            <h1 className="text-xl font-bold">
                                <img
                                    src="/arty-node-logo.png"
                                    alt="arty-node-logo"
                                    className="h-10"
                                />
                            </h1>

                            <Menu mode={'horizontal'} className="hidden md:flex">
                                <Menu.Item key="logout">
                                    <Link onClick={handleLogOut} to={'/'}>Logout</Link>
                                </Menu.Item>
                                {
                                    userRole === 'admin' &&
                                    <Menu.Item key="users">
                                        <Link to={'/users'}>Users</Link>
                                    </Menu.Item>
                                }
                            </Menu>

                            {/* <Button
                                type="primary"
                                onClick={showDrawer}
                                className="md:hidden" // Hide the button on larger screens
                            >
                                Menu
                            </Button>
                            <Menu mode={'horizontal'} className="hidden md:flex"> {/* Show menu only on medium screens and up 
                                <Menu.Item key="home">
                                    <Link to={'/'}>Home</Link>
                                </Menu.Item>
                                <Menu.Item key="users">
                                    <Link to={'/users'}>Users</Link>
                                </Menu.Item>
                                <Menu.Item key="dashboard">
                                    <Link to={'/dashboard'}>Dashboard</Link>
                                </Menu.Item>
                                <Menu.Item key="calculators">
                                    <Link to={'/calculators'} >Calculators</Link>
                                </Menu.Item>
                                <Menu.Item key="calculatedData">
                                    <Link to={'/calculated-data'} >Calculated Data</Link>
                                </Menu.Item>
                                <Menu.Item key="logout">
                                    <Link to={'/login'} onClick={handleLogOut}>Logout</Link>
                                </Menu.Item>
                            </Menu> */}
                        </div>

                        {/* <Drawer
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
                                <Menu.Item key="logout">
                                    <Link to={'/login'} onClick={handleLogOut}>Logout</Link>
                                </Menu.Item>
                            </Menu>
                        </Drawer> */}
                    </div >
                ) : (
                    <></>
                )
            }
        </>
    );
};

export default Navbar;
