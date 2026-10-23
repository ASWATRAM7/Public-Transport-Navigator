import mongoose, { Document, Schema } from 'mongoose';

export interface IUserStats extends Document {
  userId?: mongoose.Types.ObjectId;
  username: string;
  clearanceLevel: number;
  xp: number;
  carbonSavedGrams: number;
  streakDays: number;
  routesScanned: number;
  lastActive: Date;
  createdAt: Date;
}

const UserStatsSchema = new Schema<IUserStats>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true, default: 'ChennaiTraveler_01' },
  clearanceLevel: { type: Number, default: 2 },
  xp: { type: Number, default: 260 },
  carbonSavedGrams: { type: Number, default: 5840.0 },
  streakDays: { type: Number, default: 10 },
  routesScanned: { type: Number, default: 20 },
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const UserStats = mongoose.models.UserStats || mongoose.model<IUserStats>('UserStats', UserStatsSchema);
