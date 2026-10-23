import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { UserStats } from '../models/UserStats';
import { AuthRequest } from '../middleware/authMiddleware';

const JWT_SECRET = process.env.JWT_SECRET || 'aesthetic_chennai_transit_jwt_secret_key_2026';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'Name, email, and password are required fields.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'WEAK_PASSWORD',
        message: 'Password must be at least 6 characters in length.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({
        error: 'EMAIL_ALREADY_REGISTERED',
        message: 'A commuter account with this email address already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash
    });

    // Create companion mobility stats record
    await UserStats.create({
      userId: user._id,
      username: user.name,
      clearanceLevel: 1,
      xp: 100,
      carbonSavedGrams: 1200.0,
      streakDays: 1,
      routesScanned: 0
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      status: 'REGISTERED',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: err.message
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'Email and password are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      status: 'AUTHENTICATED',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: err.message
    });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }

    const stats = await UserStats.findOne({ userId: user._id }) || {
      xp: 260,
      carbonSavedGrams: 5840,
      clearanceLevel: 2,
      streakDays: 10,
      routesScanned: 20
    };

    return res.status(200).json({
      status: 'VERIFIED',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      stats
    });
  } catch (err: any) {
    console.error('getMe error:', err);
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: err.message
    });
  }
}
