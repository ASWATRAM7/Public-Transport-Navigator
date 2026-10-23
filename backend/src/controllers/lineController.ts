import { Request, Response } from 'express';
import { Line } from '../models/Line';
import { Route } from '../models/Route';
import { Stop } from '../models/Stop';

export async function getLines(req: Request, res: Response) {
  try {
    const lines = await Line.find().sort({ code: 1 });
    const routes = await Route.find();
    const allStops = await Stop.find();
    const stopMap = new Map(allStops.map(s => [s.code, s]));

    const formatted = lines.map(line => {
      const lineRoute = routes.find(r => r.lineCode === line.code);
      const stops: any[] = [];
      if (lineRoute) {
        lineRoute.routeStops
          .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
          .forEach((rs: any) => {
            const s = stopMap.get(rs.stopCode);
            if (s) {
              stops.push({
                id: s._id,
                code: s.code,
                name: s.name,
                sector: s.sector,
                x: s.x,
                y: s.y,
                zone: s.zone,
                imageUrl: s.imageUrl
              });
            }
          });
      }

      return {
        id: line._id,
        code: line.code,
        name: line.name,
        color: line.color,
        type: line.type,
        status: line.status,
        frequencyMinutes: line.frequencyMinutes,
        speedKmh: line.speedKmh,
        imageUrl: line.imageUrl,
        stopsCount: stops.length,
        stops
      };
    });

    return res.status(200).json({
      status: 'ONLINE',
      count: formatted.length,
      lines: formatted
    });
  } catch (error: any) {
    console.error('Failed to fetch lines:', error);
    return res.status(500).json({ error: 'LINES_FETCH_ERROR', message: error.message });
  }
}
