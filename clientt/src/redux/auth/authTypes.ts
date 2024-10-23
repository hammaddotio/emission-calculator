// src/store/auth/authTypes.ts

// Define types for user data
export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    user_role: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  