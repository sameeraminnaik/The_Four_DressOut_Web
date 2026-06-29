import axios from "axios"
export const api = axios.create({
  baseURL:"https://localhost:7256/api/product",
});
const token = localStorage.getItem("token");
export const addProduct = async (formData) => {
    return await api.post(
    "/addpost",
    formData,
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
);
}

export const getAllProduct = async() => {
    return await api.get("/getAllProduct",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
}
