import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Forbidden: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary" onClick={handleGoBack}>
                        Go Back
                    </Button>
                }
                className="shadow-lg rounded-lg p-6 bg-white"
            />
        </div>
    );
};

export default Forbidden;
