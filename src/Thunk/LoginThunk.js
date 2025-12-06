import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosConfig"; // import axios instance

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {

      // Use the axios instance instead of axios.post
      const response = await api.post("/auth/login", userData);

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);
