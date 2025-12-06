import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../Thunk/LoginThunk";

const initialState = {
  loading: false,
  user: null,
  error: null,
  message: "",
  token : null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.message = "Logging in...";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // FIX: backend response should be action.payload.user
        state.user = action.payload.user;  
        state.token = action.payload.token;
        state.message = action.payload.message || "Login successful! ✔️";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.message = "Login failed ❌";
      });
  }
});

export default loginSlice;
