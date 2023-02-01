import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
};

export const stockSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: state => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailure: state => {
      state.isLoading = false;
      state.isError = true;
    },
    logout: state => {
      return initialState;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = stockSlice.actions;

export default stockSlice.reducer;
