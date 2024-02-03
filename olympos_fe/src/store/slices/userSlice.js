import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      return { isAuthenticated: true, user: [action.payload] };
    },
    logout(state) {
      // return { ...state, user: null, isAuthenticated: false };
      return { isAuthenticated: false, user: [] };
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
