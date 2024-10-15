import React, { ReactNode } from 'react';
import Navbar from '../common/Navbar';

interface MainProps {
    children?: ReactNode; // Type for children prop
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <>
            {/* <Navbar /> */}
            {children}

        </>
    );
};

export default Main;
