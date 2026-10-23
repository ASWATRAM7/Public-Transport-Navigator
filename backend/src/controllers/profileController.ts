import { Request, Response } from 'express';
import { prisma } from '../db';

export async function getProfile(req: Request, res: Response) {
  try {
    let profile = await prisma.userProfile.findFirst({
      orderBy: { createdAt: 'asc' }
    });

    if (!profile) {
      profile = await prisma.userProfile.create({
        data: {
          username: 'CYBER_NOMAD_99',
          clearanceLevel: 1,
          xp: 20,
          carbonSavedGrams: 450,
          streakDays: 2
        }
      });
    }

    return res.status(200).json({
      status: 'PROFILE_RETRIEVED',
      profile
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'PROFILE_ERROR', message: error.message });
  }
}

export async function recordScan(req: Request, res: Response) {
  try {
    const { carbonSaved = 180, xpReward = 10 } = req.body;

    let profile = await prisma.userProfile.findFirst({
      orderBy: { createdAt: 'asc' }
    });

    if (!profile) {
      profile = await prisma.userProfile.create({
        data: {
          username: 'CYBER_NOMAD_99',
          clearanceLevel: 1,
          xp: 0,
          carbonSavedGrams: 0,
          streakDays: 1
        }
      });
    }

    const newXp = profile.xp + Number(xpReward);
    const newCarbon = profile.carbonSavedGrams + Number(carbonSaved);

    // Compute clearance level
    let clearanceLevel = 1;
    if (newXp >= 500) clearanceLevel = 4;
    else if (newXp >= 250) clearanceLevel = 3;
    else if (newXp >= 100) clearanceLevel = 2;

    const updated = await prisma.userProfile.update({
      where: { id: profile.id },
      data: {
        xp: newXp,
        carbonSavedGrams: newCarbon,
        clearanceLevel,
        lastActive: new Date()
      }
    });

    return res.status(200).json({
      status: 'TELEMETRY_LOGGED',
      reward: {
        xpGained: xpReward,
        carbonSavedGrams: carbonSaved,
        levelUp: clearanceLevel > profile.clearanceLevel
      },
      profile: updated
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'TELEMETRY_FAILED', message: error.message });
  }
}
