import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
  err: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSignIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userSignOut: (state) => {
      state.token = undefined;
      state.user = {};
    },
  },
});
export default authSlice.reducer;
export const { userSignIn, userSignOut } = authSlice.actions;
