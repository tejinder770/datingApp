import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';
import { uploadToCloudinary } from '@/app/services/products/imageService';
import User from '../../../lib/models/Users'

export async function GET() {
    await connectToDB();
    try {
        const products = await User.find().sort({ createdAt: -1 });
        return NextResponse.json({
            status: 200,
            success: true,
            message: 'users retrieved successfully',
            data: products,
        });
    } catch (error) {
        console.error('getUsers Error:', error);
        return NextResponse.json({
            error: 'Server error',
            status: 500
        });
    }
}

export async function POST(req: Request) {
    await connectToDB();
    try {
        const body = await req.json();
        const { username, email, gender, age, country, state, city, userImage, password, confirmpassword } = body;
        if (!username, !email, !gender, !age, !country, !state, !city, !userImage, !password, confirmpassword ) {
            return NextResponse.json({
                error: 'Missing required fields',
                status: 400
            });
        }
        const product = await User.create({
            username,
            email,
            price: parseFloat(price),
            image: imageUrl,
            pdf: pdfUrl,
        });
        return NextResponse.json({
            success: true,
            status: 201,
            message: 'product created successfully',
            data: product,
        })
    } catch (error) {
        console.error('postProduct Error:', error);
        return NextResponse.json({
            error: 'Server error',
            status: 500
        });
    }
}

export async function PUT(req: Request) {
    await connectToDB();
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as string;
        const imageFile = formData.get('image') as File | null;
        const pdfFile = formData.get('pdf') as File | null;
        const imageUrl = formData.get('imageUrl') as string | null;
        const pdfUrl = formData.get('pdfUrl') as string | null;
        let finalImageUrl = imageUrl;
        let finalPdfUrl = pdfUrl;

        if (imageFile instanceof File) {
            finalImageUrl = await uploadToCloudinary(imageFile, 'image');
        }
        if (pdfFile instanceof File) {
            finalPdfUrl = await uploadToCloudinary(pdfFile, 'pdf');
        }

        const updatedProduct = await User.findByIdAndUpdate(
            id,
            {
                title,
                description,
                price: parseFloat(price),
                image: finalImageUrl,
                pdf: finalPdfUrl,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({
                error: 'Product not found',
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (error) {
        console.error('PUT /product Error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            status: 500
        });
    }
}

export async function DELETE(req: Request) {
    await connectToDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({
                error: 'Product ID is required',
                status: 400
            });
        }
        const deletedProduct = await User.findByIdAndDelete(id);
        if (!deletedProduct) {
            return NextResponse.json({
                error: 'Product not found',
                status: 404
            });
        }
        return NextResponse.json({
            status: 200,
            success: true,
            message: 'product deleted successfully',
            data: deletedProduct,
        });
    } catch (error) {
        console.error('DELETE /product Error:', error);
        return NextResponse.json({
            error: error || 'Internal server error',
            status: 500
        });
    }
}
