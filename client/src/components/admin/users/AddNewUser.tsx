import React, { useState } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd'; // Added Select from Ant Design

interface AddNewUserInterface {
    addNewUser: (payload: { username: string; email: string; password: string; user_role: string }) => void;
}

const AddNewUser: React.FC<AddNewUserInterface> = ({ addNewUser }) => {
    const [loading, setLoading] = useState(false); // Loading state for button
    const [error, setError] = useState<string | null>(null); // Error handling
    const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility

    // Handle form submission
    const handleSubmit = async (payload: { username: string; email: string; password: string; user_role: string }) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            // Pass form values (payload) to the addNewUser function
            await addNewUser(payload);
            setIsModalVisible(false); // Close modal after successful registration
        } catch (error) {
            setError('Failed to register user'); // Show error message if registration fails
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    // Open the modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Close the modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {/* Button to trigger the modal */}
            <div className='mx-10 my-10 flex justify-end'>
                <Button type="primary" onClick={showModal}>
                    Add New User
                </Button>
            </div>

            {/* Modal for AddNewUser Form */}
            <Modal
                title=""
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Removes default footer buttons
            >
                <div className="max-w-md mx-auto p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Add New User</h2>
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Input type="email" placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        {/* Dropdown for selecting role */}
                        <Form.Item
                            name="user_role"
                            rules={[{ required: true, message: 'Please select a role!' }]}
                        >
                            <Select placeholder="Select a role">
                                <Select.Option value="user">User</Select.Option>
                                <Select.Option value="admin">Admin</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {error && <p className="text-red-500">{error}</p>} {/* Error message */}
                </div>
            </Modal>
        </>
    );
};

export default AddNewUser;
