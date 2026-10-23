import { Request, Response } from 'express';
import { Stop } from '../models/Stop';
import { Line } from '../models/Line';
import { Route } from '../models/Route';

export async function getStops(req: Request, res: Response) {
  try {
    const stops = await Stop.find().sort({ code: 1 });
    const routes = await Route.find();
    const lines = await Line.find();

    const lineMap = new Map(lines.map(l => [l.code, l]));

    const formatted = stops.map(stop => {
      // Find lines that call at this stop
      const callingLines: any[] = [];
      for (const route of routes) {
        const hasStop = (route.routeStops as any[]).some((rs: any) => rs.stopCode === stop.code);
        if (hasStop) {
          const l = lineMap.get(route.lineCode);
          if (l && !callingLines.some(cl => cl.code === l.code)) {
            callingLines.push({
              id: l._id,
              code: l.code,
              name: l.name,
              color: l.color,
              type: l.type,
              status: l.status,
              imageUrl: l.imageUrl
            });
          }
        }
      }

      return {
        id: stop._id,
        code: stop.code,
        name: stop.name,
        sector: stop.sector,
        x: stop.x,
        y: stop.y,
        zone: stop.zone,
        imageUrl: stop.imageUrl,
        lines: callingLines
      };
    });

    return res.status(200).json({
      status: 'ONLINE',
      count: formatted.length,
      stops: formatted
    });
  } catch (error: any) {
    console.error('Error fetching stops:', error);
    return res.status(500).json({ error: 'INTERNAL_GRID_FAILURE', details: error.message });
  }
}
