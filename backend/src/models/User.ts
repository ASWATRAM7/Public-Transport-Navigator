import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'commuter' | 'admin';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['commuter', 'admin'], default: 'commuter' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
