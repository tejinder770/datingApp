import React from 'react';
import Image from 'next/image';
import { TableProps } from '@/app/utils/types';

const Table: React.FC<TableProps> = ({
    productsData,
    onEditClick,
    onDeleteClick
}) => {
    return (
        <div className="mt-10 w-full overflow-x-auto">
            {productsData.length > 0 && (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                            <th className="py-3 px-4 border-b border-slate-300">Image</th>
                            <th className="py-3 px-4 border-b border-slate-300">Title</th>
                            <th className="py-3 px-4 border-b border-slate-300">Price</th>
                            <th className="py-3 px-4 border-b border-slate-300">Description</th>
                            <th className="py-3 px-4 border-b border-slate-300">PDF</th>
                            <th className="py-3 px-4 border-b border-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-200">
                                <td className="py-2 px-4 border-b border-slate-300">
                                    {product.image && (
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
                                <td className="py-2 px-4 border-b border-slate-300">{product.title}</td>
                                <td className="py-2 px-4 border-b border-slate-300">${product.price}</td>
                                <td className="py-2 px-4 border-b border-slate-300">{product.description}</td>
                                <td className="py-2 px-4 border-b border-slate-300">
                                    {product.pdf && (
                                        <a
                                            href={product.pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View PDF
                                        </a>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b border-slate-300">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEditClick(product)}
                                            className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteClick(product._id)}
                                            className="text-red-600 hover:text-red-800 cursor-pointer hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Table;