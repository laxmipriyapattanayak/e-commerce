import axios from "axios";
import { CategoryType } from "types/category";

const baseURL = process.env.REACT_APP_API_HOST;

export const getAllCategoriesRequest = async () => {
  const response = await axios.get(`${baseURL}/api/categories`);
  return response.data;
};
export const createCategories = async (category: any) => {
  const response = await axios.post(`${baseURL}/api/categories`, category, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getSingleCategoryRequest = async (name: any) => {
  const response = await axios.get(`${baseURL}/api/categories/${name}`);
  return response.data;
};

export const deleteCategoryById = async (slug: any) => {
  const response = await axios.delete(`${baseURL}/api/categories/${slug}`);
  return response.data;
};

export const updateCategory = async (name: string, category: CategoryType) => {
  const response = await axios.put(
    `${baseURL}/api/categories/${name}`,
    category,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
