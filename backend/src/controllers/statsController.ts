import { Request, Response } from 'express';
import { UserStats } from '../models/UserStats';
import { Line } from '../models/Line';
import { Stop } from '../models/Stop';

export async function getStats(req: Request, res: Response) {
  try {
    let stats = await UserStats.findOne();
    if (!stats) {
      stats = await UserStats.create({
        username: 'ChennaiTraveler_01',
        clearanceLevel: 2,
        xp: 260,
        carbonSavedGrams: 5840.0,
        streakDays: 10,
        routesScanned: 20
      });
    }

    const totalLines = await Line.countDocuments();
    const delayedLines = await Line.countDocuments({ status: 'DELAYED' });
    const activeStops = await Stop.countDocuments();

    return res.status(200).json({
      status: 'ONLINE',
      stats: {
        id: stats._id,
        username: stats.username,
        clearanceLevel: stats.clearanceLevel,
        xp: stats.xp,
        carbonSavedGrams: stats.carbonSavedGrams,
        streakDays: stats.streakDays,
        routesScanned: stats.routesScanned,
        lastActive: stats.lastActive
      },
      systemMetrics: {
        totalLines,
        delayedLines,
        activeStops,
        networkReliabilityScore: 98.6,
        averageHeadwayMinutes: 5.2
      }
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'TELEMETRY_FETCH_ERROR', message: error.message });
  }
}

export async function recordScan(req: Request, res: Response) {
  try {
    const { xpReward = 10, carbonSaved = 240 } = req.body;

    let stats = await UserStats.findOne();
    if (!stats) {
      stats = await UserStats.create({
        username: 'ChennaiTraveler_01',
        clearanceLevel: 2,
        xp: 260,
        carbonSavedGrams: 5840.0,
        streakDays: 10,
        routesScanned: 20
      });
    }

    stats.xp += Number(xpReward);
    stats.carbonSavedGrams += Number(carbonSaved);
    stats.routesScanned += 1;
    stats.lastActive = new Date();

    const previousLevel = stats.clearanceLevel;
    const newLevel = Math.floor(stats.xp / 150) + 1;
    stats.clearanceLevel = newLevel;

    await stats.save();

    return res.status(200).json({
      status: 'TELEMETRY_LOGGED',
      reward: {
        xpGained: Number(xpReward),
        carbonSavedGrams: Number(carbonSaved),
        levelUp: newLevel > previousLevel
      },
      stats: {
        id: stats._id,
        username: stats.username,
        clearanceLevel: stats.clearanceLevel,
        xp: stats.xp,
        carbonSavedGrams: stats.carbonSavedGrams,
        streakDays: stats.streakDays,
        routesScanned: stats.routesScanned,
        lastActive: stats.lastActive
      }
    });
  } catch (error: any) {
    console.error('Failed to log scan:', error);
    return res.status(500).json({ error: 'SCAN_LOG_ERROR', message: error.message });
  }
}
