'use client';
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { uploadToCloudinary } from './services/products/imageService';
import { createProduct, deleteProduct, getProducts, updateProduct } from './services/products/productService';
import Form from './components/form';
import { Product, ProductFormData } from './utils/types';
import Table from './components/table';

const Home = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '',
    image: null,
    pdf: null,
  });
  const [productsData, setProductsData] = useState<Product[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [isAddProduct, setIsAddProduct] = useState<boolean>(false);
  const [isUpdateProduct, setIsUpdateProduct] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        if (productsResponse?.data?.status === 200) {
          setProductsData(productsResponse.data.data);
        }
      } catch (error) {
        console.error('getProducts Error', error);
      }
    };
    fetchProducts();
  }, []);

  const handleEditProduct = (product: Product) => {
    if (!product?._id) {
      console.error('Undefined or invalid id');
      return;
    }
    setProductId(product?._id);
    setIsUpdateProduct(true);
    setFormData({
      title: product.title,
      description: product.description,
      price: typeof product.price === 'number' ? product.price.toString() : product.price,
      image: product.image,
      pdf: product.pdf,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormData(prevData => {
      if (files && files.length > 0) {
        return {
          ...prevData,
          [name]: files[0],
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleUpdateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prevData => {
      if (files && files.length > 0) {
        return {
          ...prevData,
          [name]: files[0],
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = '';
      let pdfUrl = '';

      if (formData.image instanceof File) {
        imageUrl = await uploadToCloudinary(formData.image, 'image');
      }

      if (formData.pdf instanceof File) {
        pdfUrl = await uploadToCloudinary(formData.pdf, 'pdf');
      }

      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        imageUrl,
        pdfUrl,
        createdAt: new Date().toISOString(),
      };

      const addProductResponse = await createProduct(productData);
      if (addProductResponse?.data?.status === 201) {
        setFormData({
          title: '',
          description: '',
          price: '',
          image: null,
          pdf: null,
        });
        setIsAddProduct(false);
        if (imageInputRef.current) imageInputRef.current.value = '';
        if (pdfInputRef.current) pdfInputRef.current.value = '';
        setProductsData(prev => [...prev, addProductResponse.data.data]);
      }
    } catch (error) {
      console.error('Product error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const formPayload = new FormData();
      formPayload.append('id', productId);
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('price', formData.price);
      if (formData.image instanceof File) {
        formPayload.append('image', formData.image);
      } else if (formData.image) {
        formPayload.append('imageUrl', formData.image);
      }
      if (formData.pdf instanceof File) {
        formPayload.append('pdf', formData.pdf);
      } else if (formData.pdf) {
        formPayload.append('pdfUrl', formData.pdf);
      }
      const updateProductResponse = await updateProduct(formPayload);
      if (updateProductResponse.data?.status === 200) {
        setProductsData(prev =>
          prev.map(item =>
            item._id === productId ? updateProductResponse.data.data : item
          )
        );
        setIsUpdateProduct(false);
        setFormData({
          title: '',
          description: '',
          price: '',
          image: null,
          pdf: null,
        });
      }
    } catch (error) {
      console.error('Product update error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!productId) {
      console.error('Undefined or invalid ID');
      return;
    }
    try {
      const response = await deleteProduct(productId);
      if (response?.success) {
        setProductsData(prev => prev.filter(product => product._id !== productId));
      }
    } catch (error) {
      console.error('Delete product error:', error);
    }
  };

  const handleCancel = () => {
    setIsAddProduct(false);
    setIsUpdateProduct(false);
    setFormData({
      title: '',
      description: '',
      price: '',
      image: null,
      pdf: null,
    });
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50 z-20'>
      <button
        type='button'
        className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        onClick={() => setIsAddProduct(true)}
      >
        Add Product
      </button>
      <Table
        productsData={productsData}
        onEditClick={handleEditProduct}
        onDeleteClick={handleDeleteProduct}
      />
      {isAddProduct && (
        <Form
          formName="add"
          formData={formData}
          onProductChange={handleChange}
          isUploading={isUploading}
          onSubmitClick={handleSubmit}
          onCancelClick={handleCancel}
          imageInputRef={imageInputRef}
          pdfInputRef={pdfInputRef}
        />
      )}
      {isUpdateProduct && (
        <Form
          formName="update"
          formData={formData}
          onProductChange={handleUpdateChange}
          isUploading={isUploading}
          onSubmitClick={handleUpdateSubmit}
          onCancelClick={handleCancel}
          imageInputRef={imageInputRef}
          pdfInputRef={pdfInputRef}
        />
      )}
    </div>
  );
}

export default Home