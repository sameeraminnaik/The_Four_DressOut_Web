const BASE_URL = "http://localhost:5128/api";

const getToken = () => localStorage.getItem("token");

export const placeOrder = async () => {
  const token = getToken();

  if(!token ){
    throw new Error("You must be logged in to place an order.");
  }
  const response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data || "Failed to place order.");
  }

  return data;
};

export const getMyOrders = async () => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data || "Failed to fetch orders.");
  }

  return data;
};

export const cancelOrder = async (orderId) => {
  const response = await fetch(`${BASE_URL}/order/${orderId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data || "Failed to cancel order.");
  }

  return data;
};