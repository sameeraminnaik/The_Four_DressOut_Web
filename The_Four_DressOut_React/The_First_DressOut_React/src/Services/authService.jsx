import axios from "axios";

export const API_URL = "http://localhost:5128/api/Auth";
const token = localStorage.getItem("token");

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
      Password: formData.password,
      ConfirmPassword: formData.confirmPassword,
      Role: "Customer",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      Email: email,
      Password: password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
