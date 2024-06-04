import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    email: "",
    password: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
