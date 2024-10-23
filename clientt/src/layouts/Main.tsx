import React, { ReactNode } from 'react';
// import Navbar from '../common/Navbar';
import AdminSideBar from '../components/admin/Sidebar';

interface MainProps {
    children?: ReactNode; // Type for children prop
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <>
            <div className='flex'>
                <AdminSideBar />
                {/* <Navbar /> */}
                <div className='flex-grow p-4'>
                    {children}
                </div>
            </div>

        </>
    );
};

export default Main;
