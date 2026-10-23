import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

const JWT_SECRET = process.env.JWT_SECRET || 'aesthetic_chennai_transit_jwt_secret_key_2026';

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Authentication token missing or malformed.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };

    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) {
      return res.status(401).json({
        error: 'USER_NOT_FOUND',
        message: 'The token belongs to a commuter account that no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({
      error: 'INVALID_TOKEN',
      message: 'Authentication token is invalid or has expired.'
    });
  }
}
