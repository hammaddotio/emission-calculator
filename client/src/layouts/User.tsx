import React, { ReactNode } from 'react';
import Navbar from '../common/Navbar';

interface UserProps {
    children?: ReactNode; // Type for children prop
}

const User: React.FC<UserProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}

        </>
    );
};

export default User;
