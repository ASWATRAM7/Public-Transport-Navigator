import mongoose, { Document, Schema } from 'mongoose';

export interface IStop extends Document {
  code: string;
  name: string;
  sector: string;
  x: number;
  y: number;
  zone: number;
  imageUrl?: string;
  createdAt: Date;
}

const StopSchema = new Schema<IStop>({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  sector: { type: String, required: true, trim: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  zone: { type: Number, default: 1 },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Stop = mongoose.models.Stop || mongoose.model<IStop>('Stop', StopSchema);
