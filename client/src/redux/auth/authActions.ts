// src/store/auth/authActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/auth/login`, credentials);
      localStorage.setItem('token', response.data.token); // Store token in local storage
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'api/v1/auth/register',
  async (userData: any, { rejectWithValue }:any) => {
    try {
      const response = await axios.post(`${URL}/api/auth/register`, userData);
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue('Registration failed. Please check your input.');
    }
  }
);
