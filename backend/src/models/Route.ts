import mongoose, { Document, Schema } from 'mongoose';

export interface IRouteStop {
  stopCode: string;
  orderIndex: number;
  travelTimeToNextMinutes: number;
}

export interface IRoute extends Document {
  lineCode: string;
  direction: 'OUTBOUND' | 'INBOUND';
  routeStops: IRouteStop[];
  createdAt: Date;
}

const RouteStopSchema = new Schema<IRouteStop>({
  stopCode: { type: String, required: true },
  orderIndex: { type: Number, required: true },
  travelTimeToNextMinutes: { type: Number, default: 4 }
}, { _id: false });

const RouteSchema = new Schema<IRoute>({
  lineCode: { type: String, required: true, uppercase: true },
  direction: { type: String, enum: ['OUTBOUND', 'INBOUND'], default: 'OUTBOUND' },
  routeStops: [RouteStopSchema],
  createdAt: { type: Date, default: Date.now }
});

export const Route = mongoose.models.Route || mongoose.model<IRoute>('Route', RouteSchema);
