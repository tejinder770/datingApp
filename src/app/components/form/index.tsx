import React from 'react';
import Image from 'next/image';
import { FormProps } from '../../utils/types';

const Form: React.FC<FormProps> = ({
    formName,
    formData,
    onProductChange,
    isUploading,
    onSubmitClick,
    onCancelClick,
    imageInputRef,
    pdfInputRef
}) => {
    const getImageSrc = () => {
        if (!formData.image) return '';
        return typeof formData.image === 'string'
            ? formData.image
            : URL.createObjectURL(formData.image);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg relative">
                <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
                    {formName === 'add' ? 'Add Product' : 'Update Product'}
                </h1>
                <form onSubmit={onSubmitClick} className='space-y-6'>
                    <div className='space-y-2'>
                        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                            Title
                        </label>
                        <input
                            type='text'
                            name='title'
                            placeholder='Enter title'
                            onChange={onProductChange}
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
                            onChange={onProductChange}
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
                            onChange={onProductChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            required
                            value={formData.price}
                        />
                    </div>
                    <div>
                        <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
                            Image
                        </label>
                        <input
                            type='file'
                            name='image'
                            ref={imageInputRef}
                            accept='image/*'
                            className='hidden'
                            id='product-image'
                            onChange={onProductChange}
                        />
                        <label
                            htmlFor='product-image'
                            className='inline-block px-4 py-2 border rounded cursor-pointer hover:bg-gray-50'
                        >
                            {formData?.image ? 'Change Image' : 'Select Image'}
                        </label>
                        {formData?.image && (
                            <Image
                                height={50}
                                width={50}
                                src={getImageSrc()}
                                alt='product'
                                className='h-28 w-32 rounded-md mt-2'
                            />
                        )}
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='pdf' className='block text-sm font-medium text-gray-700'>
                            PDF
                        </label>
                        <input
                            type='file'
                            name='pdf'
                            ref={pdfInputRef}
                            onChange={onProductChange}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            accept='application/pdf'
                        />
                        {formData?.pdf && typeof formData.pdf === 'string' && (
                            <div className='mt-2'>
                                <p className='text-sm text-gray-500 mb-1'>Current PDF:</p>
                                <a
                                    href={formData.pdf}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-600 underline'
                                >
                                    View Current PDF
                                </a>
                            </div>
                        )}
                        {formData?.pdf && typeof formData.pdf !== 'string' && (
                            <div className='mt-2'>
                                <p className='text-sm text-gray-500'>New PDF selected for upload</p>
                            </div>
                        )}
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
                            formName === 'add' ? 'Add Product' : 'Update Product'
                        )}
                    </button>
                    <button
                        type='button'
                        className='w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        onClick={onCancelClick}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;