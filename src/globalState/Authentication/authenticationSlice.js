import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"), // ✅ stays true after refresh
  },
  reducers: {
    // ✅ set true on login
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload); // save token
    },

    // ✅ set false on logout
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
