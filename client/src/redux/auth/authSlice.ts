// src/redux/auth/authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from './utils/link';

// Define types for user data
interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null; // Change from 'username' to 'user'
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null, // Change from 'username' to 'user'
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/auth/register`, userData);
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue('Registration failed. Please check your input.');
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: 'auth', // Corrected from 'username' to 'name'
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; // Changed from 'username' to 'user'
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Remove token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Ensure this uses 'user'
        state.isAuthenticated = true; // Automatically log in the user after registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
