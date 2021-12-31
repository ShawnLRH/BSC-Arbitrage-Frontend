// Import resources
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import chartReducer from "./slices/chartSlice";

// Export
// Add different reducers to store
export const store = configureStore({
  reducer: {
    user: userReducer,
    chart: chartReducer,
  },
});
