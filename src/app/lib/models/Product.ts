import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price?: number;
  image?: string;
  pdf?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    image: { type: String },
    pdf: { type: String },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
