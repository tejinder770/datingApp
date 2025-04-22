import { NextResponse } from 'next/server';
import Product from '@/app/lib/models/Product';
import { connectToDB } from '@/app/lib/db';

export async function POST(req: Request) {
    await connectToDB();
    try {
        const body = await req.json();
        const { title, description, price, imageUrl, pdfUrl } = body;
        if (!title || !description || !price || !imageUrl || !pdfUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const product = await Product.create({
            title,
            description,
            price: parseFloat(price),
            image: imageUrl,
            pdf: pdfUrl,
        });
        return NextResponse.json({
            success: true,
            data: product,
            status: 201
        })
    } catch (error) {
        console.error('postProduct Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    await connectToDB();
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json({
            success: true,
            data: products,
            status: 200
        });
    } catch (error) {
        console.error('getProducts Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}