import React from 'react';
import { Popconfirm, Button, message } from 'antd';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { USER_API } from '../../../utils/api/apis';

interface DeleteUserProps {
    user: { _id: string; username: string }; // User data structure
    fetchUsers: () => void; // Function to fetch user list after deletion
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user, fetchUsers }) => {
    // Function to handle the delete action
    const handleDelete = async () => {
        try {
            await axios.delete(`${USER_API}/${user._id}`);
            message.success(`User ${user.username} deleted successfully!`); // Display success message
            fetchUsers(); // Refresh the user list
        } catch (error) {
            message.error(`Failed to delete user ${user.username}.`); // Display error message
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Popconfirm
            title={`Are you sure you want to delete ${user.username}?`}
            onConfirm={handleDelete}
            onCancel={() => message.info('Delete action cancelled.')}
            okText="Yes"
            cancelText="No"
        >
            <Button danger icon={<DeleteOutlined />}>

            </Button>
        </Popconfirm>
    );
};

export default DeleteUser;
