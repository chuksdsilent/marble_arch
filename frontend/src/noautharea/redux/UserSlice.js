import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  isSideBarOpen: false,
};

export const userSlice = createSlice({
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
    slideSideBar: (state, action) => {
      state.isSideBarOpen = action.payload.isSideBarOpen;
    },
    logout: state => {
      return initialState;
    },
  },
});

export const { slideSideBar, loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
