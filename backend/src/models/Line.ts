import mongoose, { Document, Schema } from 'mongoose';

export interface ILine extends Document {
  code: string;
  name: string;
  color: string;
  type: 'METRO' | 'BUS' | 'SUBURBAN' | 'AUTO';
  status: 'ON_TIME' | 'DELAYED' | 'MAINTENANCE';
  frequencyMinutes: number;
  speedKmh: number;
  imageUrl?: string;
  createdAt: Date;
}

const LineSchema = new Schema<ILine>({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  color: { type: String, required: true },
  type: { type: String, enum: ['METRO', 'BUS', 'SUBURBAN', 'AUTO'], default: 'METRO' },
  status: { type: String, enum: ['ON_TIME', 'DELAYED', 'MAINTENANCE'], default: 'ON_TIME' },
  frequencyMinutes: { type: Number, default: 5 },
  speedKmh: { type: Number, default: 70 },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Line = mongoose.models.Line || mongoose.model<ILine>('Line', LineSchema);
