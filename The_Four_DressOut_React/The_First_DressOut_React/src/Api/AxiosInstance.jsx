import React from "react";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7256",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/Auth";
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
