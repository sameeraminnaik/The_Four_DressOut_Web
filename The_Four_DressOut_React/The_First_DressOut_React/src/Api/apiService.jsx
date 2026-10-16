import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7256/api",
});

const getToken = () => localStorage.getItem("token");

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const placeOrder = async () => {
  if (!getToken()) {
    throw new Error("You must be logged in to place an order.");
  }
  try {
    const response = await api.post("/orders", {}); // empty body, token added automatically
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data || "Failed to place order.");
  }
};

export const getMyOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data || "Failed to fetch orders.");
  }
};

export const getAllOrders = async () => {
  try {
    const response = await api.get("/orders/all");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data || "Failed to fetch all orders.");
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data || "Failed to cancel order.");
  }
};