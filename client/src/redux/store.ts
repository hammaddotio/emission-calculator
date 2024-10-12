// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import co2CalculatorReducer from './calculators/co2Calculator/co2CalculatorSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    co2Calculator: co2CalculatorReducer,
  },
});

// Create a typed dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store as default
export default store;
