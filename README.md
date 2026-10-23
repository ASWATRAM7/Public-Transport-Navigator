# 🏛️ AESTHETIC CHENNAI TRANSIT — EDITORIAL TRAVEL & NAVIGATION PLATFORM
> **An Aesthetic, Editorial, and Immersive Public Transport Navigation Experience for Chennai, Tamil Nadu, India**  
> Inspired by high-end travel journalism (*Condé Nast Traveler* & *Monocle*) and engineered with **Node.js, Express, MongoDB (Mongoose), JWT Authentication**, and a **Tri-Option Multimodal Routing Engine**.  
> Developed for the **Agile Methodologies Course**: 5 Epics, 12 User Stories with Gherkin Acceptance Criteria, 68 Story Points, and 100% Passing Automated CI Test Suites.

---

```
  ██████╗██╗  ██╗███████╗███╗   ██╗███╗   ██╗ █████╗ ██╗    ████████╗██████╗  █████╗ ███╗   ██╗███████╗██╗████████╗
 ██╔════╝██║  ██║██╔════╝████╗  ██║████╗  ██║██╔══██╗██║    ╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██║╚══██╔══╝
 ██║     ███████║█████╗  ██╔██╗ ██║██╔██╗ ██║███████║██║       ██║   ██████╔╝███████║██╔██╗ ██║███████╗██║   ██║   
 ██║     ██╔══██║██╔══╝  ██║╚██╗██║██║╚██╗██║██╔══██║██║       ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║██║   ██║   
 ╚██████╗██║  ██║███████╗██║ ╚████║██║ ╚████║██║  ██║██║       ██║   ██║  ██║██║  ██║██║ ╚████║███████║██║   ██║   
  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝   ╚═╝   
                   [ AESTHETIC CHENNAI TRANSIT · EDITORIAL TRAVEL JOURNAL EDITION ]
```

---

## 🏛️ 1. Creative Vision & Editorial Aesthetics

The platform completely pivots away from generic SaaS dashboards and terminal tropes into a **sophisticated, collectible travel journal**:

- **Color Palette:** Warm off-white canvas (`#F9F8F6`), deep charcoal typography (`#1A1A1A`), subtle earthy accents (muted terracotta `#C26A4A`, deep forest green `#2E4034`, warm ochre `#A87C39`).
- **Typography Hierarchy:** Classical editorial serif headings (**Playfair Display**) paired with ultra-clean sans-serif UI body copy (**Inter**) and monospaced telemetry (**JetBrains Mono**).
- **High-Resolution Photography:** Every transit hub and line card incorporates authentic, high-resolution photography with subtle dark gradient scrim overlays for perfect legibility.
- **Split-Screen Authentication (`/login` & `/register`):** Full-bleed atmospheric transit photography and evocative quotes on the left pane; minimalist, high-contrast forms on the right pane.
- **Micro-Interactions:** Subtle hover states, smooth transitions via Framer Motion, and a quiet charcoal Gamification Toast (`+10 XP`).

---

## 🔒 2. Authentication & Security Protocol

- **Backend Stack:** Node.js, Express, MongoDB with Mongoose, `bcryptjs` for salted password hashing, and `jsonwebtoken` for signed bearer tokens.
- **Endpoints:**
  - `POST /api/auth/register`: Creates new commuter accounts, hashes passwords, initializes default mobility stats, and issues a 7-day JWT token.
  - `POST /api/auth/login`: Authenticates email and password, returning user data and JWT token.
  - `GET /api/auth/me`: Protected endpoint verifying the `Authorization: Bearer <token>` header, returning commuter credentials and XP metrics.
- **Frontend Security:** React `AuthContext` with persistent `localStorage` token storage, automated header injection on outgoing requests, and `<ProtectedRoute>` route wrappers securing private pages like `/status`.

---

## 🗺️ 3. Regional Scope: 30 Real Chennai Transit Hubs

The MongoDB database seeds and queries **30 authentic Chennai hubs** with coordinates, zone partitions, sectors, and high-resolution Unsplash imagery:

| Code | Hub / Terminal Name | Zone | Sector & Functionality |
|---|---|---|---|
| `CHN-CTL` | Chennai Central (Dr. MGR Central) | Zone 1 | Park Town heritage core, Metro Blue/Green hub |
| `EGM-STN` | Chennai Egmore Station | Zone 1 | Gothic rail junction & Metro interchange |
| `T-NAGAR` | T. Nagar (Panagal Park) | Zone 1 | Commercial silk quarter & central bus hub |
| `ADYAR` | Adyar Depot & Bridge | Zone 2 | South coastal conurbation bus terminus |
| `TAMBARAM` | Tambaram Junction Terminal | Zone 3 | Southern rail gateway & suburban EMU hub |
| `OMR-SHL` | OMR (Sholinganallur Hub) | Zone 2 | Rajiv Gandhi IT Expressway tech corridor |
| `ANNA-NGR` | Anna Nagar Roundtana | Zone 1 | West residential boulevard & Metro Green Line |
| `VELACHERY` | Velachery MRTS Terminal | Zone 2 | South-central marshland rail terminus |
| `AIRPORT` | Chennai International Airport (MAA) | Zone 2 | Meenambakkam aviation zone with direct Metro concourse |
| `MARINA` | Marina Beach Concourse | Zone 1 | Historic Bay of Bengal coastal boulevard |
| `GUINDY` | Guindy Multi-Modal Interchange | Zone 1 | Industrial crossroads (Metro + Suburban EMU + MTC) |
| `KOYAMBEDU`| CMBT Koyambedu | Zone 1 | Interstate bus terminus & Metro interchange |
| `PORUR` | Porur Toll Junction | Zone 2 | Southwest lake belt arterial junction |
| `CHROMEPET`| Chromepet Station | Zone 3 | GST Road commercial district rail hub |
| `MYLAPORE` | Mylapore Tank (Kapaleeshwarar) | Zone 1 | Classical cultural heritage bus corridor |
| `BESANT-NGR`| Besant Nagar (Elliot Beach) | Zone 2 | South promenade, cafe district & coast |
| `PERAMBUR` | Perambur Loco Works | Zone 1 | Northern industrial & railway workshop belt |
| `ALANDUR` | Alandur Elevated Junction | Zone 1 | Double-deck elevated Metro Blue & Green interchange |
| `THIRUVAN` | Thiruvanmiyur Bus Terminal | Zone 2 | ECR coastal gateway & IT corridor feeder |
| `MEDAVAKKAM`| Medavakkam Junction | Zone 3 | South suburban crossroads |
| `SAIDAPET` | Saidapet Concourse | Zone 1 | Adyar River north bank arterial hub |
| `NUNGAM` | Nungambakkam High Road | Zone 1 | Embassies & institutional core rail station |
| `KILPAUK` | Kilpauk Medical College | Zone 1 | Water works & medical quarter Metro hub |
| `VADAPALANI`| Vadapalani Temple Concourse | Zone 1 | Cinema & retail hub on Metro Green Line |
| `PALLAVARAM`| Pallavaram Hill Concourse | Zone 2 | Airport-adjacent southern suburban rail stop |
| `ROYAPETTAH`| Royapettah Clock Tower | Zone 1 | Historic commercial spine |
| `TRIPLICANE`| Triplicane High Road | Zone 1 | Parthasarathy Temple concourse near beach |
| `BROADWAY` | Broadway Bus Terminus | Zone 1 | George Town colonial port core bus terminal |
| `SHENOY-NGR`| Shenoy Nagar Metro (Park) | Zone 1 | Garden suburb underground station |
| `RACE-COURSE`| Guindy Race Course Concourse | Zone 1 | South botanical green belt stop |

---

## ⚡ 4. Tri-Option Multimodal Pathfinding Engine

When querying `GET /api/route/search?from=X&to=Y`, the Dijkstra engine generates **at least 3 distinct options**:

1. **Option 1: Fastest Route (`RECOMMENDED`)**
   - High-speed underground/elevated CMRL Metro corridors.
   - Lowest total duration with minimal transfer penalties.
   - *Example (Central ➔ Airport): ₹48 · 24 mins · Direct Metro.*
2. **Option 2: Cheapest Route (`LOWEST FARE`)**
   - Subsidized MTC city buses and Southern Suburban flat-fare EMU trains.
   - Economical, low-cost commuter travel across the city.
   - *Example (Central ➔ Airport): ₹18 · 42 mins · Suburban/Bus.*
3. **Option 3: Alternative Route (`BALANCED`)**
   - Incorporates First/Last-Mile Auto-rickshaw or Share-Auto feeder connectors bypassing congestion.
   - *Example (Central ➔ Airport): ₹60 · 26 mins · Multimodal Auto + Metro.*

Each option calculates:
- Total Fare in INR (`₹`)
- Estimated Duration in Minutes
- Transfer Counts & Calling Stations
- Sequential Multimodal Turn-By-Turn Steps (Walk, Metro, Bus, Suburban, Auto)
- Precise Grams of Carbon Saved (CO₂ offset)

---

## 📖 5. Multi-Page Travel Journal Architecture

| Route | Page | Feature Set |
|---|---|---|
| **`/`** | **Overview / Home** | Full-bleed hero image with Playfair typography, floating search dispatch card with 30-stop dropdowns, quick departure presets, 5 transit modality editorial cards, and real-time IST clock. |
| **`/search`** | **Route Planner** | 3 Clickable Option Comparison Tabs (*Fastest*, *Cheapest*, *Alternative*). Turn-by-turn vertical timeline with vehicle badges, intermediate calling stops, leg fares, and **"Record Trip & Earn XP"** action. |
| **`/lines`** | **Line Directory** | Editorial cards showcasing all 7 transit lines across Metro, MTC Bus, Suburban Rail, and Share Auto. Filter tabs (`ALL`, `METRO`, `BUS`, `TRAIN`, `AUTO`) and interactive timetable inspection modal. |
| **`/status`** | **Live Network Status** *(Protected)* | Accessible only to authenticated commuters. Real-time network punctuality (98.6%), corridor advisories, and personal commuter mobility dossier. |
| **`/about`** | **Manifesto & Agile Lore** | Historical narrative of Madras 1895 electric trams to modern CMRL Metro, Agile Scrum sprint velocity matrix (5 Epics, 12 Stories, 68 Points), and persona profiles. |
| **`/login`** | **Sign In** | Split-screen layout: atmospheric photography + quote on left; clean login form with demo account autofill on right. |
| **`/register`** | **Register** | Split-screen layout: Southern rail photography on left; registration form with starter bonus (+100 XP) badge on right. |

---

## 🧪 6. Automated Test Suites (23/23 Tests Passing)

### Backend Test Suite (Jest + Supertest with Mongoose)
```bash
cd backend
npm test
```
```
PASS tests/api.test.ts
  🏛️ CHENNAI TRANSIT EDITORIAL — Backend API & Pathfinding Tests
    Authentication Endpoints (/api/auth)
      √ POST /api/auth/register creates a new user and returns JWT token (421 ms)
      √ POST /api/auth/register rejects duplicate email with 409 Conflict (42 ms)
      √ POST /api/auth/login succeeds with valid credentials (206 ms)
      √ POST /api/auth/login rejects incorrect password with 401 Unauthorized (163 ms)
      √ GET /api/auth/me returns commuter profile with valid Bearer token (65 ms)
      √ GET /api/auth/me rejects requests without token with 401 Unauthorized (34 ms)
    Core Health & Topology Endpoints
      √ GET /health returns 200 and operational transit status (22 ms)
      √ GET /api/lines returns all Chennai Metro, Bus, and Suburban rail lines (67 ms)
      √ GET /api/stops returns authentic Chennai transit locations with imagery (94 ms)
    Multi-Step Chennai Route Search (GET /api/route/search)
      √ returns 400 when from or to parameters are missing (30 ms)
      √ returns 404 when stop code does not exist in Chennai network (109 ms)
      √ computes direct route between Chennai Central and Airport (Metro Blue Line) (142 ms)
      √ computes multi-step transfer journey across Chennai modes (T. Nagar to Tambaram) (71 ms)
    Commuter Gamification & Telemetry
      √ GET /api/stats returns Chennai commuter metrics (70 ms)
      √ POST /api/stats/scan increments commuter XP and carbon saved (56 ms)

Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total (100% Passing)
```

### Frontend Test Suite (Vitest + React Testing Library)
```bash
cd frontend
npm test -- --run
```
```
PASS src/test/AuthPages.test.tsx (2 tests)
  √ renders LoginPage with editorial imagery, inputs, and demo fill button
  √ renders RegisterPage with starter bonus badge, inputs, and link to sign in
PASS src/test/CommandTerminal.test.tsx (1 test)
  √ renders line directory header, category filters, and line cards
PASS src/test/SearchInput.test.tsx (2 tests)
  √ renders editorial hero headline and floating search dispatch card
  √ allows selecting departure and destination stations and submitting route search
PASS src/test/SearchResultsTimeline.test.tsx (3 tests)
  √ renders all 3 route option comparison cards (Fastest, Cheapest, Alternative)
  √ switches between options when comparison cards are clicked
  √ triggers record trip and logs commuter XP

Test Files: 4 passed, 4 total
Tests:      8 passed, 8 total (100% Passing)
```

### Production Build Validation
```bash
cd frontend
npm run build
```
```
vite v5.4.21 building for production...
✓ 1954 modules transformed.
dist/index.html                   1.48 kB │ gzip:   0.81 kB
dist/assets/index-DmK966Em.css   49.69 kB │ gzip:   8.49 kB
dist/assets/index-DLGE40Gr.js   393.14 kB │ gzip: 119.49 kB
✓ built in 11.70s (0 Errors)
```

---

## 🚀 7. Running the Platform Locally

### Prerequisites
- Node.js (v18+)
- Local MongoDB Server running on port `27017`

### Step 1: Start Backend Server
```bash
cd backend
npm install
npx ts-node src/seedMongo.ts
npm run dev
```
*Backend listens on `http://localhost:5000` (Healthcheck: `http://localhost:5000/health`).*

### Step 2: Start Frontend Application
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

### Demo Credentials
- **Email:** `testuser@chennaitransit.in`
- **Password:** `Password123!`
*(Or click the one-click **"Use Demo Account"** button on the `/login` page).*

---

## 📋 8. Agile Scrum Project Documentation

- Refer to [`AGILE_BACKLOG.md`](./AGILE_BACKLOG.md) for complete epics, user stories with Gherkin scenarios, story point estimates, and sprint velocity metrics.  
- Refer to [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for editorial typography tokens, color palettes, split-screen authentication specifications, and component tokens.

---

## 📄 License
MIT License © 2026 Aesthetic Chennai Transit Platform — Developed for Agile Methodologies Course.
