import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Modal, message, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_API } from '../../../utils/api/apis';
import { headers } from '../../../utils/api/apiHeaders';

interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    user_role: 'admin' | 'user'; // Added user_role
}

const { Option } = Select;

const EditUser: React.FC<{ user: User; fetchUsers: () => void }> = ({ user, fetchUsers }) => {
    const [formData, setFormData] = useState<Omit<User, 'createdAt'> & { password?: string }>({
        username: user.username,
        email: user.email,
        user_role: user.user_role,
        password: '', // Initialize password as an empty string
    });
    const [visible, setVisible] = useState(false); // State to control modal visibility

    useEffect(() => {
        // Set the initial form data when user prop changes
        setFormData({
            username: user.username,
            email: user.email,
            user_role: user.user_role,
            password: '', // Reset password when user changes
        });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, user_role: value as 'admin' | 'user' });
    };

    const hasChanges = () => {
        // Check if formData is different from original user data (username, email, user_role)
        return (
            formData.username !== user.username ||
            formData.email !== user.email ||
            formData.user_role !== user.user_role ||
            !!formData.password // Check if password is provided (non-empty)
        );
    };

    const handleUpdate = async () => {
        try {
            // Create an object containing only the fields to be updated
            const updateData = {
                username: formData.username,
                email: formData.email,
                user_role: formData.user_role,
                ...(formData.password && { password: formData.password }), // Include password if it is provided
            };
            console.log(updateData)

            const response = await axios.patch(`${USER_API}/${user._id}`, updateData, headers);
            message.success('User updated successfully!'); // Display success message
            console.log(response.data); // Log the response
            fetchUsers(); // Refresh users list
            setVisible(false); // Close the modal after successful update
        } catch (error) {
            message.error('Failed to update user.'); // Display error message
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <Button
                onClick={() => setVisible(true)} // Show modal on button click
                icon={<EditOutlined />}
            />

            <Modal
                title="Edit User"
                visible={visible}
                onCancel={() => setVisible(false)} // Close modal on cancel
                footer={[
                    <Button key="cancel" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="update"
                        type="primary"
                        onClick={handleUpdate}
                        icon={<EditOutlined />}
                        disabled={!hasChanges()} // Disable button if there are no changes
                    >
                        Update
                    </Button>
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Username">
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Created At">
                        <Input
                            name="createdAt"
                            value={new Date(user.createdAt).toLocaleDateString()} // Display date as string
                            disabled // Disable input for createdAt as it's not editable
                        />
                    </Form.Item>
                    <Form.Item label="User Role">
                        <Select
                            value={formData.user_role}
                            onChange={handleRoleChange}
                            allowClear
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input
                            name="password"
                            type="password" // Ensure password input is hidden
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave empty to keep current password"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EditUser;
