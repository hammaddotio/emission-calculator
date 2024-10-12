// src/redux/co2CalculatorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveCO2Emission } from './co2CalculatorThunk';

interface CO2CalculatorState {
  fuelType: string;
  fuelAmount: number;
  emissionFactor: number;
  co2Emission: number;
  loading: boolean;
  error: string | null;
}

const emissionFactors: { [key: string]: number } = {
  'Gas/diesel oil': 2.775,
  'Motor gasoline': 2.35,
  'Biodiesel (100%)': 1.928,
  'Natural gas liquids': 1.574,
  'Ethanol (100%)': 2.776,
  'Liquefied petroleum gases (LPG)': 1.653,
  'Aviation gasoline': 2.224,
  'Kerosene type jet fuel': 2.538,
  'CNG': 2.78,
};

const initialState: CO2CalculatorState = {
  fuelType: 'Gas/diesel oil',
  fuelAmount: 0,
  emissionFactor: emissionFactors['Gas/diesel oil'],
  co2Emission: 0,
  loading: false,
  error: null,
};

const co2CalculatorSlice = createSlice({
  name: 'co2Calculator',
  initialState,
  reducers: {
    setFuelType: (state, action: PayloadAction<string>) => {
      state.fuelType = action.payload;
      state.emissionFactor = emissionFactors[action.payload]; // Update the emission factor
    },
    setFuelAmount: (state, action: PayloadAction<number>) => {
      state.fuelAmount = action.payload;
    },
    calculateCO2Emission: (state) => {
      state.co2Emission = state.fuelAmount * state.emissionFactor / 1000;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCO2Emission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCO2Emission.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, handle the successful emission save response
      })
      .addCase(saveCO2Emission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFuelType, setFuelAmount, calculateCO2Emission } = co2CalculatorSlice.actions;
export default co2CalculatorSlice.reducer;
