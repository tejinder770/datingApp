import { ApiResponse, Product } from "@/app/utils/types";
import axios from "axios";

export const getProducts = async () => {
    try {
        const response = await axios.get('/api/v1/products');
        return response;
    } catch (error: any) {
        return error;
    }
};

export const createProduct = async (data) => {
    try {
        const response = await axios.post('/api/v1/products', data);
        return response;
    } catch (error: any) {
        return error
    }
};

export const updateProduct = async (formData: FormData): Promise<ApiResponse<Product>> => {
    try {
        const response = await axios.put('/api/v1/products', formData);
        return response;
    } catch (error: any) {
        return error
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`/api/v1/products?id=${id}`);
        return response.data;
    } catch (error: any) {
        console.error('Delete product error:', error);
        return error;
    }
};
