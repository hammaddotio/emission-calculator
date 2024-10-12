import React, { ReactNode } from 'react';

interface MainProps {
    children: ReactNode; // Type for children prop
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Main;
