import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Box, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const AdminNavbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Open profile dropdown menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Close profile dropdown menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle logout (placeholder)
    const handleLogout = () => {
        console.log('Logout clicked');
        handleMenuClose();
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Left side - Toggle Button or Menu icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>

                {/* Right side - Profile with Avatar and Dropdown */}
                <Box>
                    <IconButton
                        onClick={handleMenuOpen}
                        size="large"
                        edge="end"
                        color="inherit"
                    >
                        <Avatar alt="User Name" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminNavbar;
