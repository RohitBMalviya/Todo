import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice.js";

const store = configureStore({ reducer: authSlice });

export default store;
