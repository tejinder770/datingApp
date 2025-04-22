import axios from "axios";

export const getProducts = async () => {
    try {
        const response = await axios.get('/api/v1/products');
        return response;
    } catch (error) {
        return error;
    }
};

export const createProduct = async (data) => {
    try {
        const response = await axios.post('/api/v1/products', data);
        return response;
    } catch (error) {
        return error
    }
};
