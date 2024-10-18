import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PublicRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const userRole = useSelector((state: any) => state.auth.userRole);

    // If authenticated, redirect to the dashboard (or any other route)
    if (isAuthenticated && userRole === 'admin') {
        return <Navigate to="/dashboard" replace />;
    }
    if (isAuthenticated && userRole === 'user') {
        return <Navigate to="/calculators" replace />;
    }

    // Otherwise, render the children (login/register components)
    return <Outlet />;
};

export default PublicRoute;
