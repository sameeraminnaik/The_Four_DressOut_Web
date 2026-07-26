 import { getAllProduct } from "../Api/sellerApi";

export const products = async () => {
  try {
    const response = await getAllProduct();
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("Error fetching products:", error.message);
    return [];
  }
};

export default products;

