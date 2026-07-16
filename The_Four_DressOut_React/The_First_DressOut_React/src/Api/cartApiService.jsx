import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7256/api/cart",
});

const getToken = () => localStorage.getItem("token");

export const placeCartItem = async (cartItem) => {
  const response = await api.post("/addToCart", cartItem, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateCartQuantity = async (id, quantity) => {
  const response = await api.put(
    `/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};

export const removeCartItem = async (id) => {
  await api.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getCart = async () => {

    const response = await api.get("/getCart",{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    });

    return response.data;
}