// src/store/auth/authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from './authTypes';
import { LOGIN_API, REGISTER_API } from '../../utils/api/apis';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials:any, rejectWithValue?:any) => {
    try {
      const response = await axios.post(
        `${LOGIN_API}`, 
        credentials,
        // { withCredentials: true },
        
      );
      
      localStorage.setItem('token', response.data.token); // Store token in local storage
      localStorage.setItem('role', response.data.user.user_role); // Store token in local storage
      return response.data.user; // Return user data
    } catch (error:null|any) {
      console.log(error)
      return rejectWithValue(`${error.response.data.message}`);

    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, rejectWithValue?:any) => {
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
