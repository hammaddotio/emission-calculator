import React, { useState } from 'react';
import { Modal, Descriptions, Button, Card, Avatar } from 'antd';
import { CalendarOutlined, EyeOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'; // Importing an icon for the View button

interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
}

const ViewUser: React.FC = ({ user }) => {
    const [visible, setVisible] = useState(false); // Local state for modal visibility

    // Function to open the modal
    const showModal = () => {
        setVisible(true);
    };

    // Function to close the modal
    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            {/* View button with an icon */}
            <Button icon={<EyeOutlined />} onClick={showModal} />


            {/* Modal to view user details */}
            <Modal
                title="View User"
                visible={visible}
                onCancel={handleClose}
                footer={null} // Optional: You can add footer buttons like 'Close' here if needed
            >
                {user ? (
                    <Card bordered={false} style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            {/* Avatar for the user */}
                            <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: '20px' }} />
                            <div>
                                {/* User name as a prominent heading */}
                                <h2 style={{ margin: 0 }}>{user.username}</h2>
                                <p style={{ color: 'gray', margin: 0 }}>User ID: {user._id}</p>
                            </div>
                        </div>

                        {/* Descriptions with better icons and padding */}
                        <Descriptions bordered size="middle" column={1}>
                            <Descriptions.Item label={<><MailOutlined /> Email</>}>
                                {user.email}
                            </Descriptions.Item>
                            <Descriptions.Item label={<><UserOutlined /> User Role</>}>
                                {user.user_role}
                            </Descriptions.Item>
                            <Descriptions.Item label={<><CalendarOutlined /> Created At</>}>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                ) : (
                    <p>No user selected</p>
                )}
            </Modal>
        </>
    );
};

export default ViewUser;
