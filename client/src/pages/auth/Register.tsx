// src/components/Register.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/auth/authThunk'; // Adjust the import path based on your folder structure
import { Button, Form, Input, message } from 'antd';
import { RootState } from '../../redux/store'; // Adjust import based on your store file path
import { useNavigate } from 'react-router-dom';
import Auth from '../../layouts/Auth';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    const handleSubmit = async (values: { username: string; email: string; password: string }) => {
        const resultAction = await dispatch(registerUser(values));

        if (registerUser.fulfilled.match(resultAction)) {
            // Successfully registered
            message.success('Registration successful!');
            navigate('/login');
        } else {
            // Registration failed
            message.error(error || 'Registration failed.');
        }
    };

    return (
        <Auth loading={loading}>
            <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </Auth>
    );
};

export default Register;
