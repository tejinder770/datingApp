'use client';
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { uploadToCloudinary } from './services/products/imageService';
import { createProduct, getProducts } from './services/products/productservice';

export default function Home() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
    pdf: null,
  });
  const [productsData, setProductsData] = useState<[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const [isAddProduct, setIsAddProduct] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        if (productsResponse) {
          // console.log('getProductsResponse', productsResponse);
          setProductsData(productsResponse?.data);
        }
      } catch (error) {
        console.log('getProducts Error', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      setFormData(prevData => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = '';
      let pdfUrl = '';

      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image, 'image');
      }

      if (formData.pdf) {
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
      if (addProductResponse.status === 201) {
        // console.log("addProductResponse", addProductResponse);
        setFormData({
          title: '',
          description: '',
          price: '',
          image: null,
          pdf: null,
        });
        if (imageInputRef.current) imageInputRef.current.value = '';
        if (pdfInputRef.current) pdfInputRef.current.value = '';
        const newProduct = addProductResponse.data;
        setProductsData((prevData) => [...prevData, newProduct]);
        setIsAddProduct(false)
      }
    } catch (error) {
      console.error('Product error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50 z-20'>
      <button type='submit' onClick={() => setIsAddProduct(true)}>Add Product</button>
      {isAddProduct &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg relative">
            <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Create New Product</h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  placeholder='Enter title'
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  required
                  value={formData.title}
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <input
                  type='text'
                  name='description'
                  placeholder='Enter description'
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  required
                  value={formData.description}
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
                  Price
                </label>
                <input
                  type='text'
                  name='price'
                  placeholder='Enter price'
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  required
                  value={formData.price}
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
                  Image
                </label>
                <input
                  type='file'
                  name='image'
                  ref={imageInputRef}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  accept='image/*'
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='pdf' className='block text-sm font-medium text-gray-700'>
                  PDF
                </label>
                <input
                  type='file'
                  name='pdf'
                  ref={pdfInputRef}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  accept='application/pdf'
                />
              </div>
              <button
                type='submit'
                disabled={isUploading}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {isUploading ? (
                  <span className='flex items-center justify-center'>
                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Create Product'
                )}
              </button>
              <button
                type='reset'
                className='w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                onClick={() => setIsAddProduct(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      }
      {productsData && productsData.length > 0 && (
        <div className="mt-10 w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="py-3 px-4 border-b border-slate-300">Image</th>
                <th className="py-3 px-4 border-b border-slate-300">Title</th>
                <th className="py-3 px-4 border-b border-slate-300">Price</th>
                <th className="py-3 px-4 border-b border-slate-300">Description</th>
                <th className="py-3 px-4 border-b border-slate-300">PDF</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, id) => (
                <tr key={id} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border-b border-slate-300 cursor-pointer">
                    {product?.image && (
                      <Image
                        src={product.image}
                        height={100}
                        width={100}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                        priority
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-slate-300 cursor-pointer">{product?.title}</td>
                  <td className="py-2 px-4 border-b border-slate-300 cursor-pointer">${product?.price}</td>
                  <td className="py-2 px-4 border-b border-slate-300 cursor-pointer">{product?.description}</td>
                  <td className="py-2 px-4 border-b border-slate-300 cursor-pointer text-blue-600 underline">
                    <a href={product?.pdf} target="_blank" rel="noopener noreferrer">View PDF</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

