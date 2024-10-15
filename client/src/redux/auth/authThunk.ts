// src/store/auth/authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from './authTypes';
import { LOGIN_API, REGISTER_API } from '../../utils/api/apis';

// Async thunk for login
export const loginUser = createAsyncThunk<
  User, // The type of the return value
  { email: string; password: string }, // The type of the argument
  { rejectValue: string } // The type for the error payload
>(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }:any) => {
    try {
      const response = await axios.post<{ token: string; user: User }>(
        `${LOGIN_API}`, 
        credentials,
        // { withCredentials: true },
        
      );
      
      localStorage.setItem('token', response.data.token); // Store token in local storage
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk<
  User, // The type of the return value
  { name: string; email: string; password: string }, // The type of the argument
  { rejectValue: string } // The type for the error payload
>(
  'auth/register',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }:any) => {
    try {
      const response = await axios.post<{ user: User }>(
        `${REGISTER_API}`, 
        userData,
        // {withCredentials: true}
      );
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue('Registration failed. Please check your input.');
    }
  }
);
