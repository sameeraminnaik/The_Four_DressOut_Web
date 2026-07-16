import axios from "axios";
export const api = axios.create({
  baseURL: "https://localhost:7256/api",
});

const token = localStorage.getItem("token");
export const getAllCategories = () => {
  return api.get("/category/getAllCategories");
};

export const addProduct = async (formdata) => {
  const data = new FormData();

  data.append("name", formdata.name);
  data.append("description", formdata.description);
  data.append("price", formdata.price);
  data.append("stock", formdata.stock);
  data.append("size", formdata.size);
  data.append("color", formdata.color);
  data.append("categoryId", formdata.categoryId);
  data.append("image", formdata.image);

  return await api.post("/product/addpost", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllProduct = async () => {
  return await api.get("/product/getAllProduct", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
