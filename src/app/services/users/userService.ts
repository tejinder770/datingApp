import axios from "axios";

export const getUsers = async () => {
    try {
        const response = await axios.get('/api/v1/users');
        return response;
    } catch (error: any) {
        return error;
    }
};

export const createUser = async (data: any) => {
    try {
        const response = await axios.post('/api/v1/users', data);
        return response;
    } catch (error: any) {
        return error
    }
};

export const updateUser = async (formData: any) => {
    try {
        const response = await axios.put('/api/v1/users', formData);
        return response;
    } catch (error: any) {
        return error
    }
};

export const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`/api/v1/users?id=${id}`);
        return response.data;
    } catch (error: any) {
        console.error('Delete product error:', error);
        return error;
    }
};
