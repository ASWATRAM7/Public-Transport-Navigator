import { Request, Response } from 'express';
import { findBestRoute } from '../services/routingService';

export async function searchRoute(req: Request, res: Response) {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      error: 'BAD_REQUEST',
      message: 'Both "from" and "to" parameters (stop codes or names) are required.'
    });
  }

  try {
    const result = await findBestRoute(String(from), String(to));

    if (!result) {
      return res.status(404).json({
        error: 'ROUTE_NOT_FOUND',
        message: `No active transit connection found between ${from} and ${to}.`
      });
    }

    return res.status(200).json({
      status: 'ROUTE_COMPUTED',
      telemetry: {
        timestamp: new Date().toISOString(),
        efficiencyRating: 'OPTIMAL'
      },
      ...result
    });
  } catch (error: any) {
    if (error.message === 'ONE_OR_BOTH_STOPS_NOT_FOUND') {
      return res.status(404).json({
        error: 'STOP_NOT_FOUND',
        message: `One or both specified stops could not be resolved on the transit grid.`
      });
    }

    console.error('Routing computation error:', error);
    return res.status(500).json({
      error: 'ROUTING_ENGINE_ERROR',
      message: error.message
    });
  }
}
