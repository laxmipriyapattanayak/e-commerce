import axios from "axios";
import { ProductType } from "types/product";
const baseURL = 'http://localhost:4000';

export const getAllProductsRequest = async ( ) => {
    const response = await axios.get(`${baseURL}/api/products`);
    return response.data;
};

export const getSingleProductRequest = async (slug :any) => {
    const response = await axios.get(`${baseURL}/api/products/${slug}`);
    return response.data;
};

export const createProduct = async (product: ProductType) => {    
    const response = await axios.post(`${baseURL}/api/products`, product, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteProductById = async (slug :any) => {
    const response = await axios.delete(`${baseURL}/api/products/${slug}`);
    return response.data;
};
export const updateProductById = async (slug :any, product: ProductType) => {
    const response = await axios.put(`${baseURL}/api/products/${slug}`, product, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const filterProduct = async (product: ProductType) => {    
    const response = await axios.post(`${baseURL}/api/products/filter`, product);
    return response.data;
}

