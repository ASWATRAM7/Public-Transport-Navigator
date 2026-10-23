import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Stop } from './models/Stop';
import { Line } from './models/Line';
import { Route } from './models/Route';
import { User } from './models/User';
import { UserStats } from './models/UserStats';
import { connectDB, disconnectDB } from './db';

dotenv.config();

export async function seedMongo() {
  console.log('🏛️ [SEED] Connecting to MongoDB...');
  await connectDB();

  console.log('🏛️ [SEED] Clearing existing transit & user collections...');
  await Route.deleteMany({});
  await Line.deleteMany({});
  await Stop.deleteMany({});
  await User.deleteMany({});
  await UserStats.deleteMany({});

  console.log('🏛️ [SEED] Creating 30+ Authentic Chennai Transit Hubs with 100% UNIQUE Unsplash imagery...');
  const stopsData = [
    {
      code: 'CHN-CTL',
      name: 'Chennai Central (Dr. MGR Central)',
      sector: 'Park Town Heritage Core',
      x: 260,
      y: 120,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'EGM-STN',
      name: 'Chennai Egmore Station',
      sector: 'Gothic Rail Junction',
      x: 230,
      y: 160,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'T-NAGAR',
      name: 'T. Nagar (Panagal Park)',
      sector: 'Commercial & Silk Quarter',
      x: 210,
      y: 260,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'ADYAR',
      name: 'Adyar Depot & Bridge',
      sector: 'South Coastal Conurbation',
      x: 300,
      y: 320,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'TAMBARAM',
      name: 'Tambaram Junction Terminal',
      sector: 'Southern Rail Gateway',
      x: 120,
      y: 520,
      zone: 3,
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'OMR-SHL',
      name: 'OMR (Sholinganallur Hub)',
      sector: 'Rajiv Gandhi IT Corridor',
      x: 340,
      y: 440,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'ANNA-NGR',
      name: 'Anna Nagar Roundtana',
      sector: 'West Residential Boulevards',
      x: 140,
      y: 150,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'VELACHERY',
      name: 'Velachery MRTS Terminal',
      sector: 'South-Central Marshland',
      x: 260,
      y: 360,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'AIRPORT',
      name: 'Chennai International Airport (MAA)',
      sector: 'Meenambakkam Aviation Zone',
      x: 150,
      y: 440,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'MARINA',
      name: 'Marina Beach Concourse',
      sector: 'Historic Bay of Bengal Coast',
      x: 310,
      y: 180,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'GUINDY',
      name: 'Guindy Multi-Modal Interchange',
      sector: 'Industrial & Rail Crossroads',
      x: 190,
      y: 320,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'KOYAMBEDU',
      name: 'CMBT Koyambedu',
      sector: 'Interstate Grand Bus Terminus',
      x: 120,
      y: 200,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'PORUR',
      name: 'Porur Toll Junction',
      sector: 'South-West Lake Belt',
      x: 100,
      y: 280,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'CHROMEPET',
      name: 'Chromepet Station',
      sector: 'GST Road Commercial District',
      x: 130,
      y: 480,
      zone: 3,
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'MYLAPORE',
      name: 'Mylapore Tank (Kapaleeshwarar)',
      sector: 'Classical Cultural Heritage',
      x: 280,
      y: 230,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1609137144822-45e0543e49e0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'BESANT-NGR',
      name: 'Besant Nagar (Elliot Beach)',
      sector: 'South Promenade & Cafes',
      x: 320,
      y: 330,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'PERAMBUR',
      name: 'Perambur Loco Works',
      sector: 'Northern Industrial Belt',
      x: 220,
      y: 90,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1520105072000-f44fc0832105?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'ALANDUR',
      name: 'Alandur Elevated Junction',
      sector: 'Double-Deck Metro Node',
      x: 170,
      y: 370,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'THIRUVAN',
      name: 'Thiruvanmiyur Bus Terminal',
      sector: 'ECR Coastal Gateway',
      x: 320,
      y: 370,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'MEDAVAKKAM',
      name: 'Medavakkam Junction',
      sector: 'South Suburban Crossroads',
      x: 230,
      y: 470,
      zone: 3,
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'SAIDAPET',
      name: 'Saidapet Concourse',
      sector: 'Adyar River North Bank',
      x: 210,
      y: 300,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'NUNGAM',
      name: 'Nungambakkam High Road',
      sector: 'Embassies & Institutional Core',
      x: 220,
      y: 210,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'KILPAUK',
      name: 'Kilpauk Medical College',
      sector: 'Water Works & Medical Quarter',
      x: 190,
      y: 140,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'VADAPALANI',
      name: 'Vadapalani Temple Concourse',
      sector: 'Cinema & Retail Hub',
      x: 160,
      y: 250,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'PALLAVARAM',
      name: 'Pallavaram Hill Concourse',
      sector: 'Airport South Suburban',
      x: 140,
      y: 460,
      zone: 2,
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'ROYAPETTAH',
      name: 'Royapettah Clock Tower',
      sector: 'Historic Commercial Spine',
      x: 270,
      y: 200,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'TRIPLICANE',
      name: 'Triplicane High Road',
      sector: 'Parthasarathy Temple Concourse',
      x: 290,
      y: 170,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'BROADWAY',
      name: 'Broadway Bus Terminus',
      sector: 'George Town Colonial Port Core',
      x: 290,
      y: 100,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'SHENOY-NGR',
      name: 'Shenoy Nagar Metro (Park)',
      sector: 'Garden Suburb Underground',
      x: 170,
      y: 160,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'RACE-COURSE',
      name: 'Guindy Race Course Concourse',
      sector: 'South Botanical Green Belt',
      x: 200,
      y: 340,
      zone: 1,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  await Stop.insertMany(stopsData);

  console.log('🏛️ [SEED] Populating Chennai Transit Lines with 100% UNIQUE Editorial Photography...');
  const linesData = [
    {
      code: 'METRO-BLU',
      name: 'Chennai Metro Blue Line',
      color: '#2E4034', // Deep Forest Green CMRL
      type: 'METRO',
      status: 'ON_TIME',
      frequencyMinutes: 5,
      speedKmh: 80.0,
      imageUrl: 'https://images.unsplash.com/photo-1558441719-755047b1c4dc?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { code: 'BROADWAY', timeNext: 3 },
        { code: 'CHN-CTL', timeNext: 4 },
        { code: 'EGM-STN', timeNext: 7 },
        { code: 'SAIDAPET', timeNext: 6 },
        { code: 'GUINDY', timeNext: 4 },
        { code: 'ALANDUR', timeNext: 5 },
        { code: 'AIRPORT', timeNext: 0 },
      ]
    },
    {
      code: 'METRO-GRN',
      name: 'Chennai Metro Green Line',
      color: '#2E4034', // Deep Forest Green CMRL
      type: 'METRO',
      status: 'ON_TIME',
      frequencyMinutes: 6,
      speedKmh: 75.0,
      imageUrl: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { code: 'ANNA-NGR', timeNext: 4 },
        { code: 'SHENOY-NGR', timeNext: 3 },
        { code: 'KILPAUK', timeNext: 5 },
        { code: 'CHN-CTL', timeNext: 4 },
        { code: 'EGM-STN', timeNext: 8 },
        { code: 'VADAPALANI', timeNext: 7 },
        { code: 'ALANDUR', timeNext: 0 },
      ]
    },
    {
      code: 'SUB-SOUTH',
      name: 'Southern Suburban South Line (EMU)',
      color: '#A87C39', // Warm Ochre
      type: 'SUBURBAN',
      status: 'ON_TIME',
      frequencyMinutes: 12,
      speedKmh: 65.0,
      imageUrl: 'https://images.unsplash.com/photo-1527603815363-e77388476406?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { code: 'CHN-CTL', timeNext: 5 },
        { code: 'EGM-STN', timeNext: 6 },
        { code: 'NUNGAM', timeNext: 4 },
        { code: 'SAIDAPET', timeNext: 5 },
        { code: 'GUINDY', timeNext: 8 },
        { code: 'PALLAVARAM', timeNext: 5 },
        { code: 'CHROMEPET', timeNext: 4 },
        { code: 'TAMBARAM', timeNext: 0 },
      ]
    },
    {
      code: 'MTC-21G',
      name: 'MTC City Bus 21G (Broadway - Tambaram)',
      color: '#C26A4A', // Muted Terracotta
      type: 'BUS',
      status: 'DELAYED',
      frequencyMinutes: 10,
      speedKmh: 32.0,
      imageUrl: 'https://images.unsplash.com/photo-1556122071-e404be745493?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { code: 'BROADWAY', timeNext: 6 },
        { code: 'MARINA', timeNext: 8 },
        { code: 'MYLAPORE', timeNext: 7 },
        { code: 'ADYAR', timeNext: 10 },
        { code: 'GUINDY', timeNext: 14 },
        { code: 'CHROMEPET', timeNext: 9 },
        { code: 'TAMBARAM', timeNext: 0 },
      ]
    },
    {
      code: 'MTC-570',
      name: 'MTC City Bus 570 (CMBT - OMR Express)',
      color: '#C26A4A', // Muted Terracotta
      type: 'BUS',
      status: 'ON_TIME',
      frequencyMinutes: 8,
      speedKmh: 35.0,
      imageUrl: 'https://images.unsplash.com/photo-1572097662444-ed77be345ee9?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { code: 'KOYAMBEDU', timeNext: 7 },
        { code: 'VADAPALANI', timeNext: 9 },
        { code: 'GUINDY', timeNext: 8 },
        { code: 'VELACHERY', timeNext: 11 },
        { code: 'THIRUVAN', timeNext: 6 },
        { code: 'OMR-SHL', timeNext: 0 },
      ]
    },
    {
      code: 'MTC-19B',
      name: 'MTC City Bus 19B (T. Nagar - Medavakkam)',
      color: '#C26A4A', // Muted Terracotta
      type: 'BUS',
      status: 'ON_TIME',
      frequencyMinutes: 9,
      speedKmh: 30.0,
      imageUrl: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { code: 'T-NAGAR', timeNext: 6 },
        { code: 'SAIDAPET', timeNext: 8 },
        { code: 'ADYAR', timeNext: 12 },
        { code: 'VELACHERY', timeNext: 9 },
        { code: 'MEDAVAKKAM', timeNext: 0 },
      ]
    },
    {
      code: 'SHARE-AUTO',
      name: 'South Chennai Share Auto Feeder',
      color: '#A87C39', // Warm Ochre
      type: 'AUTO',
      status: 'ON_TIME',
      frequencyMinutes: 3,
      speedKmh: 40.0,
      imageUrl: 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { code: 'GUINDY', timeNext: 10 },
        { code: 'PORUR', timeNext: 12 },
        { code: 'KOYAMBEDU', timeNext: 0 },
      ]
    }
  ];

  for (const l of linesData) {
    await Line.create({
      code: l.code,
      name: l.name,
      color: l.color,
      type: l.type,
      status: l.status,
      frequencyMinutes: l.frequencyMinutes,
      speedKmh: l.speedKmh,
      imageUrl: l.imageUrl
    });

    const routeStops = l.stops.map((stopInfo, idx) => ({
      stopCode: stopInfo.code,
      orderIndex: idx,
      travelTimeToNextMinutes: stopInfo.timeNext
    }));

    await Route.create({
      lineCode: l.code,
      direction: 'OUTBOUND',
      routeStops
    });
  }

  console.log('🏛️ [SEED] Populating Demo Commuter & Telemetry...');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Password123!', salt);

  const demoUser = await User.create({
    name: 'Aravind Swaminathan',
    email: 'testuser@chennaitransit.in',
    passwordHash,
    role: 'commuter'
  });

  await UserStats.create({
    userId: demoUser._id,
    username: 'ChennaiTraveler_01',
    clearanceLevel: 2,
    xp: 260,
    carbonSavedGrams: 5840.0,
    streakDays: 10,
    routesScanned: 20
  });

  console.log('🏛️ [SEED] Aesthetic Chennai Transit MongoDB dataset populated successfully with 100% UNIQUE imagery.');
}

if (require.main === module) {
  seedMongo()
    .then(async () => {
      await disconnectDB();
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ [SEED] Error during MongoDB seed:', err);
      process.exit(1);
    });
}
