// src/redux/co2CalculatorThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Example of an async thunk to save CO₂ emission data (API call)
export const saveCO2Emission = createAsyncThunk(
  'co2Calculator/saveCO2Emission',
  async (co2Emission: number, thunkAPI) => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await axios.post('https://your-api-url.com/emission', {
        emission: co2Emission,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to save CO₂ emission');
    }
  }
);
