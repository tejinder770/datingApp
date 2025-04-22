import axios from "axios";

export const uploadToCloudinary = async (file: File, type: 'image' | 'pdf') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blog_preset');
    formData.append('folder', type === 'image' ? 'images' : 'pdfs');
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const resourceType = type === 'image' ? 'image' : 'raw';

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${cloudName}/${resourceType}/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};