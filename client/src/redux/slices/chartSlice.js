// Import resources
import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  pairs: null,
  profits: null,
  losses: null,
};

// Create slice
export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setPairs: (state, action) => {
      state.pairs = action.payload;
    },
    setProfits: (state, action) => {
      state.profits = action.payload;
    },
    setLosses: (state, action) => {
      state.losses = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// Set action creators
export const { setPairs, setProfits, setLosses } = chartSlice.actions;

// Set selectors
export const selectPairs = (state) => state.chart.pairs;
export const selectProfits = (state) => state.chart.profits;
export const selectLosses = (state) => state.chart.losses;

// Export
export default chartSlice.reducer;
