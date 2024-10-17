// src/components/Login.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/authThunk'; // Adjust the import path based on your folder structure
import { Button, Form, Input, message } from 'antd';
import { RootState } from '../../redux/store'; // Adjust import based on your store file path
import { useNavigate } from 'react-router-dom';
import Auth from '../../layouts/Auth';
import { headers } from '../../utils/api/apiHeaders';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const resultAction = await dispatch(loginUser(values));

            if (loginUser.fulfilled.match(resultAction)) {
                message.success('Login successful!');
                resultAction.payload.user_role === 'admin' ? navigate('/dashboard') : navigate('/calculators');
                // Set the Authorization header with the token
                const token = localStorage.getItem('token');
                if (token) {
                    headers.headers.Authorization = token;
                }
            } else {
                // If login failed, display the error returned from the API
                message.error(error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            // Handle any unexpected errors (e.g., network issues)
            message.error('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <Auth loading={loading}>
            <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <Form onFinish={onFinish}>
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
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </Auth>
    );
};

export default Login;
