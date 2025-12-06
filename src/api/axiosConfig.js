// src/api/axiosConfig.js

import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "backend-express-xi.vercel.app",  // base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
