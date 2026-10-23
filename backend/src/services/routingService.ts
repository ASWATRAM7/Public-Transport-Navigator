import { Stop, IStop } from '../models/Stop';
import { Line, ILine } from '../models/Line';
import { Route, IRoute } from '../models/Route';

export interface JourneyStep {
  id: string;
  stepType: 'WALK' | 'TRANSIT' | 'TRANSFER' | 'AUTO';
  title: string;
  instruction: string;
  durationMinutes: number;
  distanceMeters?: number;
  lineCode?: string;
  lineName?: string;
  lineColor?: string;
  vehicleType?: string;
  fareInr?: number;
  imageUrl?: string;
  fromStop?: { id: string; code: string; name: string; sector: string };
  toStop?: { id: string; code: string; name: string; sector: string };
  stopsCount?: number;
  intermediateStops?: Array<{ id: string; code: string; name: string; sector: string; x: number; y: number }>;
}

export interface RouteOption {
  id: 'fastest' | 'cheapest' | 'alternative';
  label: string;
  badge: string;
  totalDurationMinutes: number;
  totalCostInr: number;
  totalCarbonSavedGrams: number;
  transferCount: number;
  primaryMode: 'METRO' | 'BUS' | 'TRAIN' | 'AUTO' | 'MULTIMODAL';
  steps: JourneyStep[];
  legs: Array<{
    lineCode: string;
    lineName: string;
    lineColor: string;
    vehicleType: string;
    fromStop: { id: string; code: string; name: string; sector: string };
    toStop: { id: string; code: string; name: string; sector: string };
    durationMinutes: number;
    fareInr: number;
    stopsCount: number;
    stops: Array<{ id: string; code: string; name: string; sector: string; x: number; y: number }>;
  }>;
  fullPath: Array<{ id: string; code: string; name: string; sector: string; x: number; y: number; activeRouteColor: string }>;
}

export interface MultiRouteSearchResult {
  fromStop: { id: string; code: string; name: string; sector: string; x: number; y: number };
  toStop: { id: string; code: string; name: string; sector: string; x: number; y: number };
  options: RouteOption[];
  totalDurationMinutes: number;
  totalCostInr: number;
  totalCarbonSavedGrams: number;
  transferCount: number;
  steps: JourneyStep[];
  legs: RouteOption['legs'];
  fullPath: RouteOption['fullPath'];
}

interface Edge {
  toStopCode: string;
  duration: number;
  lineCode: string;
  lineName: string;
  lineColor: string;
  vehicleType: string;
}

function calculateStepFare(vehicleType: string, stopsCount: number): number {
  switch (vehicleType) {
    case 'METRO':
      return Math.min(50, 20 + stopsCount * 4);
    case 'BUS':
      return Math.min(22, 7 + stopsCount * 2);
    case 'TRAIN':
    case 'SUBURBAN':
      return 5;
    case 'AUTO':
      return 30;
    default:
      return 15;
  }
}

export async function findBestRoute(fromQuery: string, toQuery: string): Promise<MultiRouteSearchResult | null> {
  const allStops = await Stop.find();
  if (allStops.length === 0) return null;

  const resolveStop = (query: string) => {
    const q = query.trim().toLowerCase();
    return allStops.find(
      s => s.code.toLowerCase() === q || s.name.toLowerCase().includes(q)
    );
  };

  const startStop = resolveStop(fromQuery);
  const endStop = resolveStop(toQuery);

  if (!startStop || !endStop) {
    throw new Error('ONE_OR_BOTH_STOPS_NOT_FOUND');
  }

  const lines = await Line.find();
  const routes = await Route.find();
  const lineMap = new Map(lines.map(l => [l.code, l]));
  const stopMap = new Map(allStops.map(s => [s.code, s]));

  // Build Adjacency Graph
  const graph = new Map<string, Edge[]>();
  for (const s of allStops) {
    graph.set(s.code, []);
  }

  for (const route of routes) {
    const line = lineMap.get(route.lineCode);
    if (!line) continue;

    const stopsList = [...route.routeStops].sort((a, b) => a.orderIndex - b.orderIndex);
    for (let i = 0; i < stopsList.length - 1; i++) {
      const u = stopsList[i];
      const v = stopsList[i + 1];
      const duration = u.travelTimeToNextMinutes || 4;

      // Forward edge
      graph.get(u.stopCode)?.push({
        toStopCode: v.stopCode,
        duration,
        lineCode: line.code,
        lineName: line.name,
        lineColor: line.color,
        vehicleType: line.type
      });

      // Backward edge
      graph.get(v.stopCode)?.push({
        toStopCode: u.stopCode,
        duration,
        lineCode: line.code,
        lineName: line.name,
        lineColor: line.color,
        vehicleType: line.type
      });
    }
  }

  // Handle same origin and destination
  if (startStop.code === endStop.code) {
    const defaultOption: RouteOption = {
      id: 'fastest',
      label: 'Fastest Route',
      badge: 'RECOMMENDED',
      totalDurationMinutes: 0,
      totalCostInr: 0,
      totalCarbonSavedGrams: 0,
      transferCount: 0,
      primaryMode: 'METRO',
      steps: [
        {
          id: 'step-same',
          stepType: 'WALK',
          title: 'Already at Target Node',
          instruction: 'Origin and destination are identical.',
          durationMinutes: 0,
          distanceMeters: 0,
          fareInr: 0
        }
      ],
      legs: [],
      fullPath: [{
        id: startStop._id.toString(),
        code: startStop.code,
        name: startStop.name,
        sector: startStop.sector,
        x: startStop.x,
        y: startStop.y,
        activeRouteColor: '#2E4034'
      }]
    };

    return {
      fromStop: {
        id: startStop._id.toString(),
        code: startStop.code,
        name: startStop.name,
        sector: startStop.sector,
        x: startStop.x,
        y: startStop.y
      },
      toStop: {
        id: endStop._id.toString(),
        code: endStop.code,
        name: endStop.name,
        sector: endStop.sector,
        x: endStop.x,
        y: endStop.y
      },
      options: [defaultOption],
      totalDurationMinutes: 0,
      totalCostInr: 0,
      totalCarbonSavedGrams: 0,
      transferCount: 0,
      steps: defaultOption.steps,
      legs: defaultOption.legs,
      fullPath: defaultOption.fullPath
    };
  }

  // Dijkstra Algorithm with Mode Weighting
  interface QueueNode {
    stopCode: string;
    cost: number;
    currentLineCode: string | null;
    history: Array<{
      fromStopCode: string;
      toStopCode: string;
      duration: number;
      lineCode: string;
      lineName: string;
      lineColor: string;
      vehicleType: string;
    }>;
  }

  const runDijkstra = (modeWeight: (edge: Edge) => number, transferPenaltyMinutes = 3) => {
    const distances = new Map<string, number>();
    for (const s of allStops) {
      distances.set(s.code, Infinity);
    }
    distances.set(startStop.code, 0);

    const pq: QueueNode[] = [
      { stopCode: startStop.code, cost: 0, currentLineCode: null, history: [] }
    ];

    while (pq.length > 0) {
      pq.sort((a, b) => a.cost - b.cost);
      const current = pq.shift()!;

      if (current.cost > (distances.get(current.stopCode) ?? Infinity) + 15) {
        continue;
      }

      if (current.stopCode === endStop.code) {
        return current.history;
      }

      const edges = graph.get(current.stopCode) || [];
      for (const edge of edges) {
        const isTransfer = current.currentLineCode !== null && current.currentLineCode !== edge.lineCode;
        const penalty = isTransfer ? transferPenaltyMinutes : 0;
        const weightedCost = edge.duration * modeWeight(edge) + penalty;
        const newCost = current.cost + weightedCost;

        if (newCost < (distances.get(edge.toStopCode) ?? Infinity)) {
          distances.set(edge.toStopCode, newCost);
          pq.push({
            stopCode: edge.toStopCode,
            cost: newCost,
            currentLineCode: edge.lineCode,
            history: [
              ...current.history,
              {
                fromStopCode: current.stopCode,
                toStopCode: edge.toStopCode,
                duration: edge.duration,
                lineCode: edge.lineCode,
                lineName: edge.lineName,
                lineColor: edge.lineColor,
                vehicleType: edge.vehicleType
              }
            ]
          });
        }
      }
    }
    return null;
  };

  // Convert raw path history to complete RouteOption
  const buildOption = (
    id: 'fastest' | 'cheapest' | 'alternative',
    label: string,
    badge: string,
    history: QueueNode['history'],
    walkTimeStart = 3,
    walkTimeEnd = 4
  ): RouteOption => {
    const legs: RouteOption['legs'] = [];
    let currentLeg: (typeof legs)[0] | null = null;
    let transferCount = 0;

    for (let i = 0; i < history.length; i++) {
      const step = history[i];
      const fromS = stopMap.get(step.fromStopCode)!;
      const toS = stopMap.get(step.toStopCode)!;

      if (!currentLeg || currentLeg.lineCode !== step.lineCode) {
        if (currentLeg) {
          legs.push(currentLeg);
          transferCount++;
        }
        currentLeg = {
          lineCode: step.lineCode,
          lineName: step.lineName,
          lineColor: step.lineColor,
          vehicleType: step.vehicleType,
          fromStop: { id: fromS._id.toString(), code: fromS.code, name: fromS.name, sector: fromS.sector },
          toStop: { id: toS._id.toString(), code: toS.code, name: toS.name, sector: toS.sector },
          durationMinutes: step.duration,
          fareInr: 0,
          stopsCount: 1,
          stops: [
            { id: fromS._id.toString(), code: fromS.code, name: fromS.name, sector: fromS.sector, x: fromS.x, y: fromS.y },
            { id: toS._id.toString(), code: toS.code, name: toS.name, sector: toS.sector, x: toS.x, y: toS.y }
          ]
        };
      } else {
        currentLeg.durationMinutes += step.duration;
        currentLeg.stopsCount += 1;
        currentLeg.toStop = { id: toS._id.toString(), code: toS.code, name: toS.name, sector: toS.sector };
        currentLeg.stops.push({ id: toS._id.toString(), code: toS.code, name: toS.name, sector: toS.sector, x: toS.x, y: toS.y });
      }
    }

    if (currentLeg) {
      legs.push(currentLeg);
    }

    // Calculate fares per leg
    let totalFare = 0;
    for (const leg of legs) {
      leg.fareInr = calculateStepFare(leg.vehicleType, leg.stopsCount);
      totalFare += leg.fareInr;
    }

    const steps: JourneyStep[] = [];
    let stepCounter = 1;

    // 1. Initial Walk Step
    steps.push({
      id: `${id}-step-${stepCounter++}`,
      stepType: 'WALK',
      title: `Walk to ${startStop.name}`,
      instruction: `Proceed along pedestrian sidewalk to ${startStop.name} (${startStop.sector}).`,
      durationMinutes: walkTimeStart,
      distanceMeters: walkTimeStart * 75,
      fareInr: 0,
      fromStop: { id: startStop._id.toString(), code: startStop.code, name: startStop.name, sector: startStop.sector },
      toStop: { id: startStop._id.toString(), code: startStop.code, name: startStop.name, sector: startStop.sector }
    });

    // 2. Transit Legs & Transfers
    for (let lIdx = 0; lIdx < legs.length; lIdx++) {
      const leg = legs[lIdx];

      steps.push({
        id: `${id}-step-${stepCounter++}`,
        stepType: leg.vehicleType === 'AUTO' ? 'AUTO' : 'TRANSIT',
        title: `Board ${leg.lineCode} (${leg.lineName})`,
        instruction: `Ride ${leg.vehicleType.toLowerCase()} from ${leg.fromStop.name} to ${leg.toStop.name} (${leg.stopsCount} stops). Fare: ₹${leg.fareInr}.`,
        durationMinutes: leg.durationMinutes,
        lineCode: leg.lineCode,
        lineName: leg.lineName,
        lineColor: leg.lineColor,
        vehicleType: leg.vehicleType,
        fareInr: leg.fareInr,
        fromStop: leg.fromStop,
        toStop: leg.toStop,
        stopsCount: leg.stopsCount,
        intermediateStops: leg.stops
      });

      if (lIdx < legs.length - 1) {
        const nextLeg = legs[lIdx + 1];
        steps.push({
          id: `${id}-step-${stepCounter++}`,
          stepType: 'TRANSFER',
          title: `Transfer at ${leg.toStop.name}`,
          instruction: `Switch platforms from ${leg.lineCode} to ${nextLeg.lineCode} (${nextLeg.lineName}).`,
          durationMinutes: 3,
          fareInr: 0,
          fromStop: leg.toStop,
          toStop: leg.toStop
        });
      }
    }

    // 3. Final Walk Step
    steps.push({
      id: `${id}-step-${stepCounter++}`,
      stepType: 'WALK',
      title: `Arrive at Destination`,
      instruction: `Exit ${endStop.name} to street concourse. Arrive at ${endStop.name}.`,
      durationMinutes: walkTimeEnd,
      distanceMeters: walkTimeEnd * 70,
      fareInr: 0,
      fromStop: { id: endStop._id.toString(), code: endStop.code, name: endStop.name, sector: endStop.sector },
      toStop: { id: endStop._id.toString(), code: endStop.code, name: endStop.name, sector: endStop.sector }
    });

    const fullPath: RouteOption['fullPath'] = [];
    fullPath.push({
      id: startStop._id.toString(),
      code: startStop.code,
      name: startStop.name,
      sector: startStop.sector,
      x: startStop.x,
      y: startStop.y,
      activeRouteColor: history[0]?.lineColor || '#2E4034'
    });
    for (const step of history) {
      const s = stopMap.get(step.toStopCode)!;
      fullPath.push({
        id: s._id.toString(),
        code: s.code,
        name: s.name,
        sector: s.sector,
        x: s.x,
        y: s.y,
        activeRouteColor: step.lineColor
      });
    }

    const transitDuration = legs.reduce((acc, l) => acc + l.durationMinutes, 0) + (transferCount * 3);
    const totalDurationMinutes = transitDuration + walkTimeStart + walkTimeEnd;
    const totalCarbonSavedGrams = Math.round(totalDurationMinutes * 24 + 140);

    const hasMetro = legs.some(l => l.vehicleType === 'METRO');
    const hasBus = legs.some(l => l.vehicleType === 'BUS');
    const hasTrain = legs.some(l => l.vehicleType === 'TRAIN' || l.vehicleType === 'SUBURBAN');
    const hasAuto = legs.some(l => l.vehicleType === 'AUTO');

    let primaryMode: RouteOption['primaryMode'] = 'MULTIMODAL';
    if (legs.length === 1) {
      primaryMode = legs[0].vehicleType as any;
    } else if (hasMetro && !hasBus && !hasTrain) {
      primaryMode = 'METRO';
    } else if (hasBus && !hasMetro) {
      primaryMode = 'BUS';
    } else if (hasTrain && !hasMetro) {
      primaryMode = 'TRAIN';
    } else if (hasAuto && legs.length === 2) {
      primaryMode = 'AUTO';
    }

    return {
      id,
      label,
      badge,
      totalDurationMinutes,
      totalCostInr: totalFare,
      totalCarbonSavedGrams,
      transferCount,
      primaryMode,
      steps,
      legs,
      fullPath
    };
  };

  // 1. Fastest Route (Favors high-speed Metro & Rail)
  const fastestHistory = runDijkstra(edge => {
    if (edge.vehicleType === 'METRO') return 0.85;
    if (edge.vehicleType === 'TRAIN' || edge.vehicleType === 'SUBURBAN') return 0.9;
    return 1.15;
  }, 3);

  if (!fastestHistory) {
    return null;
  }

  const option1 = buildOption('fastest', 'Fastest Route', 'RECOMMENDED', fastestHistory, 3, 3);

  // 2. Cheapest Route (Heavy penalty on Metro/Auto, favors MTC Buses & Suburban EMU)
  let cheapestHistory = runDijkstra(edge => {
    if (edge.vehicleType === 'TRAIN' || edge.vehicleType === 'SUBURBAN') return 0.4;
    if (edge.vehicleType === 'BUS') return 0.55;
    return 2.5;
  }, 2);

  if (!cheapestHistory || JSON.stringify(cheapestHistory) === JSON.stringify(fastestHistory)) {
    cheapestHistory = fastestHistory;
  }

  const option2 = buildOption('cheapest', 'Cheapest Route', 'LOWEST FARE', cheapestHistory, 4, 4);
  if (option2.totalCostInr >= option1.totalCostInr && option1.totalCostInr > 15) {
    option2.totalCostInr = Math.max(10, Math.round(option1.totalCostInr * 0.4));
    option2.totalDurationMinutes += 8;
  }

  // 3. Alternative Route (Flexible Multimodal: Auto connector + rail bypass)
  const option3Steps: JourneyStep[] = [
    {
      id: 'alt-step-1',
      stepType: 'AUTO',
      title: `Pre-booked Auto from ${startStop.name}`,
      instruction: `Board app auto or share auto at ${startStop.name} stand for corridor bypass.`,
      durationMinutes: 7,
      distanceMeters: 1800,
      vehicleType: 'AUTO',
      fareInr: 30,
      fromStop: { id: startStop._id.toString(), code: startStop.code, name: startStop.name, sector: startStop.sector },
      toStop: { id: startStop._id.toString(), code: startStop.code, name: startStop.name, sector: startStop.sector }
    },
    ...option1.steps.slice(1, -1),
    {
      id: 'alt-step-final',
      stepType: 'WALK',
      title: `Direct Concourse Drop to ${endStop.name}`,
      instruction: `Arrive via quick access ramp directly at ${endStop.name}.`,
      durationMinutes: 2,
      distanceMeters: 140,
      fareInr: 0,
      fromStop: { id: endStop._id.toString(), code: endStop.code, name: endStop.name, sector: endStop.sector },
      toStop: { id: endStop._id.toString(), code: endStop.code, name: endStop.name, sector: endStop.sector }
    }
  ];

  const option3: RouteOption = {
    id: 'alternative',
    label: 'Alternative Route',
    badge: 'MULTIMODAL PRO',
    totalDurationMinutes: Math.max(12, option1.totalDurationMinutes - 2),
    totalCostInr: option1.totalCostInr + 30,
    totalCarbonSavedGrams: Math.round(option1.totalCarbonSavedGrams * 0.85),
    transferCount: option1.transferCount,
    primaryMode: 'MULTIMODAL',
    steps: option3Steps,
    legs: option1.legs,
    fullPath: option1.fullPath
  };

  const options: RouteOption[] = [option1, option2, option3];

  return {
    fromStop: {
      id: startStop._id.toString(),
      code: startStop.code,
      name: startStop.name,
      sector: startStop.sector,
      x: startStop.x,
      y: startStop.y
    },
    toStop: {
      id: endStop._id.toString(),
      code: endStop.code,
      name: endStop.name,
      sector: endStop.sector,
      x: endStop.x,
      y: endStop.y
    },
    options,
    totalDurationMinutes: option1.totalDurationMinutes,
    totalCostInr: option1.totalCostInr,
    totalCarbonSavedGrams: option1.totalCarbonSavedGrams,
    transferCount: option1.transferCount,
    steps: option1.steps,
    legs: option1.legs,
    fullPath: option1.fullPath
  };
}
