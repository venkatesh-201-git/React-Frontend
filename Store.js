import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./src/Slice/LoginSlice";

export const store = configureStore({
    reducer: {
        auth: loginSlice.reducer,
    }
});