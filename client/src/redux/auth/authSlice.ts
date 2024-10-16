// src/redux/auth/authSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { registerUser,loginUser } from './authThunk';

// Define types for user data
interface User {
  id: string;
  username: string;
  email: string;
  userRole: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  userRole: string;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  userRole: localStorage.getItem('role') || '',
  loading: false,
  error: null,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.user = null;
      state.userRole = '';
      console.log('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
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
        state.user = action.payload; // Set user data
        state.isAuthenticated = true; // Automatically log in the user after registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user data
        state.userRole = action.payload.user_role
        state.isAuthenticated = true; // User is now authenticated

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
