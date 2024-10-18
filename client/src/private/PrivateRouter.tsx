import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


interface PrivateRouterProps {
    allowedRoles: string[]; // Array of roles allowed to access the routes
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ allowedRoles }) => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const userRole = useSelector((state: any) => state.auth.userRole); // Get user role

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If the user's role is not allowed, redirect to a forbidden or dashboard page
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/404" replace />; // Or another route
    }

    // Otherwise, render the child components (protected routes)
    return <Outlet />;
};

export default PrivateRouter;
