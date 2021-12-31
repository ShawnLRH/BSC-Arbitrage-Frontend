// Import resources
import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  userDetails: null,
  guestUser: null,
};

// Create slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userDetails = action.payload;
    },
    setLogout: (state) => {
      state.userDetails = null;
    },
    setGuestUser: (state, action) => {
      state.guestUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// Set action creators
export const { setLogin, setLogout, setGuestUser } = userSlice.actions;

// Set selectors
export const selectUser = (state) => state.user.userDetails;
export const selectGuestUser = (state) => state.user.guestUser;

// Export
export default userSlice.reducer;
