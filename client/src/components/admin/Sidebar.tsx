import React, { ReactNode, useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Define drawer width
const drawerWidth = 300;
interface AdminLayoutProps {
    children?: ReactNode; // Type for children prop
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if it's mobile
    const [mobileOpen, setMobileOpen] = useState(false); // For mobile drawer
    const [collapsed, setCollapsed] = useState(false); // For desktop collapsible drawer
    const navigate = useNavigate();

    const menuItems = [
        { label: 'Dashboard', key: 'dashboard', icon: <DashboardIcon /> },
        { label: 'Users', key: 'users', icon: <PeopleIcon /> },
    ];

    // Handle toggling mobile drawer
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Handle navigation
    const handleMenuItemClick = (key: string) => {
        navigate(`/${key}`);
        if (isMobile) {
            setMobileOpen(false); // Close the drawer after navigation on mobile
        }
    };

    // Drawer content
    const drawerContent = (
        <div>
            <Toolbar className='flex justify-between'>
                {/* {!collapsed && <Typography variant="h6">Admin Panel</Typography>} */}
                {!collapsed && (
                    <img
                        src="/arty-node-logo.png" // Path to your logo image
                        alt="Admin Panel Logo"
                        style={{ height: '40px', width: 'auto' }} // Adjust height and width as needed
                    />
                )}
                <IconButton onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuIcon /> : <CloseIcon />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        component="div"
                        key={item.key}
                        onClick={() => handleMenuItemClick(item.key)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {!collapsed && <ListItemText primary={item.label} />}
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar for mobile toggle button */}
            <AppBar position="fixed" sx={{ display: { md: 'none' } }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Welcome
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Responsive drawer for mobile */}
            <Drawer
                variant="permanent"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Permanent drawer for desktop */}
            <Drawer
                variant="permanent"
                open={!collapsed}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: collapsed ? 72 : drawerWidth, // Collapsed width shows only icons
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${collapsed ? 72 : drawerWidth}px)` }, // Responsive width
                    transition: 'width 0.3s', // Smooth transition for width change
                    marginLeft: { md: collapsed ? '72px' : '300px' }, // Set margin based on drawer state
                }}
            >
                <Toolbar /> {/* Spacer for fixed AppBar */}
                {children} {/* Your main content goes here */}
            </Box>
        </Box>
    );
};

export default AdminLayout;
