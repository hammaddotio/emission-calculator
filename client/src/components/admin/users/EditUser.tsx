import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Modal, message } from 'antd';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { USER_API } from '../../../utils/api/apis';

interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
}

const EditUser: React.FC<{ user: User }> = ({ user, fetchUsers }) => {
    const [formData, setFormData] = useState<User>(user);
    const [visible, setVisible] = useState(false); // State to control modal visibility

    useEffect(() => {
        // Set the initial form data when user prop changes
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`${USER_API}/${user._id}`, formData);
            message.success('User updated successfully!'); // Display success message
            console.log(response.data); // Log the response
            fetchUsers()
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
            >
            </Button>

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
                            value={new Date(formData.createdAt).toLocaleDateString()} // Display date as string
                            disabled // Disable input for createdAt as it's not editable
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EditUser;
