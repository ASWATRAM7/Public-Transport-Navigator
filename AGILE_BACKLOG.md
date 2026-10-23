# 📖 AGILE PRODUCT BACKLOG: AESTHETIC CHENNAI TRANSIT (MONGODB + JWT EDITION)
> **Project Vision:** An aesthetic, editorial, and immersive travel experience for Chennai public transport (*Condé Nast Traveler* & *Monocle* editorial aesthetic) powered by **Node.js, Express, MongoDB (Mongoose), JWT Authentication**, and an intelligent **Tri-Option Routing Engine**.  
> **Course:** Agile Software Engineering & Methodologies  
> **Scrum Framework:** 5 Epics · 12 User Stories with Gherkin Acceptance Criteria · 2-Week Sprints

---

## 🎯 Epics Overview

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   EPIC ROADMAP: AESTHETIC CHENNAI TRANSIT (MERN STACK)                 │
├────────────────────┬────────────────────┬────────────────────┬───────────────┬─────────┤
│ EPIC 1: AUTH &     │ EPIC 2: GRAPH      │ EPIC 3: EDITORIAL  │ EPIC 4: MULTI-│ EPIC 5: │
│ COMMUTER SECURITY  │ TOPOLOGY & MONGODB │ DESIGN SYSTEM &    │ PAGE TRAVEL   │ CI/CD & │
│ (JWT + bcryptjs)   │ (30 Hubs, 3 Paths) │ SPLIT-SCREEN AUTH  │ EXPERIENCE    │ TESTING │
└────────────────────┴────────────────────┴────────────────────┴───────────────┴─────────┘
```

---

## 📋 Detailed Product Backlog & User Stories

### EPIC 1: Commuter Authentication & JWT Security Protocol
**Goal:** Implement full user registration, password hashing with `bcryptjs`, JWT token issuance, protected route middleware (`requireAuth`), and persistent user session context.

#### Story 1.1: User Registration & Secure Password Hashing
- **As a** new Chennai commuter,  
- **I want** to create an account with my email, full name, and password,  
- **So that** my transit travel history, carbon credits, and commuter XP can be securely tracked.
- **Story Points:** 5
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Successful commuter registration
    Given valid registration details (name, email, password >= 6 chars)
    When POST /api/auth/register is called
    Then the response status is 201
    And the user is saved to MongoDB with a salted bcrypt password hash
    And a valid JWT bearer token is returned alongside the user profile
  ```

#### Story 1.2: Authentication & Token Issuance
- **As a** registered commuter,  
- **I want** to log in with my email and password to receive a JWT session token,  
- **So that** I can access protected features like the Live Status Bulletin and personalized mobility records.
- **Story Points:** 5
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Logging in with valid credentials
    Given an existing registered user
    When POST /api/auth/login is called with correct email and password
    Then the response status is 200
    And a signed JWT token (valid for 7 days) and user object are returned
  ```

#### Story 1.3: Protected Route Middleware & User Profile Endpoint
- **As an** authenticated commuter,  
- **I want** `GET /api/auth/me` to authenticate my JWT token in the Authorization header,  
- **So that** unauthenticated visitors are prevented from accessing private transit dashboards.
- **Story Points:** 3
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Accessing protected endpoint without token
    When GET /api/auth/me is requested without an Authorization header
    Then the response status is 401 Unauthorized
  ```

---

### EPIC 2: MongoDB Metropolitan Graph Topology & Tri-Option Routing Engine
**Goal:** Define Mongoose schemas (`User`, `Stop`, `Line`, `Route`, `UserStats`), seed 30+ authentic Chennai locations with Unsplash photography, and implement a Dijkstra engine returning at least 3 distinct journey options (`Fastest`, `Cheapest`, `Alternative`).

#### Story 2.1: Mongoose Models & 30+ Hub Chennai Seed Script
- **As a** transit navigator,  
- **I want** the MongoDB database to model 30+ real Chennai locations (e.g., Chennai Central, Egmore, T. Nagar, Adyar, Tambaram, OMR Sholinganallur, Anna Nagar, Velachery, Airport, Marina Beach) across 5 transit modes with high-res Unsplash imagery,  
- **So that** queries return rich geographic and photographic context.
- **Story Points:** 8
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Querying stops collection in MongoDB
    Given the MongoDB database is seeded
    When GET /api/stops is called
    Then at least 30 stops are returned
    And each stop includes code, name, sector, zone, coordinates, and an authentic imageUrl
  ```

#### Story 2.2: Tri-Option Multimodal Pathfinding Algorithm
- **As a** commuter with varied needs (speed vs. affordability),  
- **I want** `GET /api/route/search?from=X&to=Y` to return 3 distinct options: Fastest (Metro priority), Cheapest (MTC Bus/Train lowest INR fare), and Alternative (Multimodal Auto connector),  
- **So that** I can evaluate trade-offs between travel time, cost in ₹, and comfort.
- **Story Points:** 13
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Searching routes between Central and Airport
    When GET /api/route/search?from=CHN-CTL&to=AIRPORT is executed
    Then the response status is 200
    And the payload contains an options array with at least 3 distinct routes
    And each route option includes totalCostInr, totalDurationMinutes, carbonSaved, and multimodal steps
  ```

---

### EPIC 3: Editorial Design System & Split-Screen Authentication UI
**Goal:** Configure Tailwind CSS for the *Condé Nast Traveler* / *Monocle* travel journal aesthetic (warm off-white `#F9F8F6`, deep charcoal `#1A1A1A`, terracotta `#C26A4A`, forest green `#2E4034`), `Playfair Display` serif headlines, and create the split-screen authentication view.

#### Story 3.1: Editorial Design Tokens & Component Library
- **As a** design connoisseur,  
- **I want** the application to feel like a collectible travel magazine rather than an AI dashboard,  
- **So that** the experience is tactile, refined, and visually engaging.
- **Story Points:** 5
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Verifying editorial components
    Given the EditorialButton component
    Then it renders in solid charcoal (#1A1A1A) or thin 1px border with sharp or slightly rounded corners
    And ImageCard renders high-res photography with subtle dark gradient scrim overlays
  ```

#### Story 3.2: Split-Screen Login & Registration Views
- **As a** visitor,  
- **I want** a split-screen login/signup interface with dramatic Chennai transit photography on one side and an elegant minimalist form on the other,  
- **So that** signing into the transit journal feels premium and delightful.
- **Story Points:** 8
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Viewing the Split-Screen Login Page
    Given the user navigates to /login
    Then one half displays a full-height aesthetic transit image with an editorial quote
    And the other half displays a clean form with Playfair Display heading and charcoal submit button
  ```

---

### EPIC 4: Immersive Multi-Page Travel Journal Experience
**Goal:** Deliver 5 interconnected pages with React Router v6, protected routes for authenticated commuters, and fluid Framer Motion transitions.

#### Story 4.1: Hero Section & Floating Search Card (Home Page)
- **As a** traveler,  
- **I want** a hero section with full-bleed train/bus photography, a serif headline, and a floating sharp-cornered search card,  
- **So that** I can select any of the 30+ Chennai hubs and explore curated commutes.
- **Story Points:** 8
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Submitting search on Home Page
    Given the user selects origin and destination from the 30-stop dropdown
    When "Explore Route Options" is clicked
    Then the application navigates to /search with selected query parameters
  ```

#### Story 4.2: Tri-Option Comparison Tabs & Turn-by-Turn Timeline (Search Results)
- **As a** passenger,  
- **I want** 3 minimal comparison tabs (Fastest, Cheapest, Alternative) with costs in ₹ and durations,  
- **So that** clicking any tab highlights it and immediately updates the vertical turn-by-turn timeline below.
- **Story Points:** 8
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Switching between Fastest and Cheapest tabs
    Given search results for an itinerary
    When the user clicks the "Cheapest Route" tab
    Then the active tab highlights with a solid border
    And the timeline updates to show MTC bus stages and lowest fare
  ```

#### Story 4.3: Image-Driven Line Directory & Timetable Modal
- **As a** transit enthusiast,  
- **I want** image-driven cards showcasing Metro, Bus, Suburban, and Share Auto lines,  
- **So that** clicking any card opens a modal displaying sequential stops and frequency.
- **Story Points:** 5
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Inspecting transit line timetable
    Given the user is on /lines
    When the user clicks "Inspect Timetable"
    Then an elegant modal appears with the sequential station itinerary
  ```

#### Story 4.4: Protected Live Status Dashboard & Gamification Dossier
- **As an** authenticated commuter,  
- **I want** the `/status` page to be protected so only logged-in users can view real-time corridor advisories, punctuality scores, and their personal XP balance,  
- **So that** commuter accounts have distinct value and security.
- **Story Points:** 5
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Visiting /status while logged out
    Given an unauthenticated visitor
    When navigating to /status
    Then the user is redirected to /login with a return URL
  ```

#### Story 4.5: About & Agile Scrum Methodology Journal
- **As an** academic evaluator,  
- **I want** an `/about` page detailing Chennai's transport history (from 1895 electric trams to modern CMRL Metro) alongside the Agile Scrum sprint velocity matrix,  
- **So that** the project clearly demonstrates academic rigor and rich local narrative.
- **Story Points:** 5
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Reading Agile framework lore
    Given the user visits /about
    Then the page renders historical context alongside the 5 Epics and user persona profiles
  ```

---

### EPIC 5: Integration, Gamification Toast & Automated Testing
**Goal:** Integrate the React `AuthContext` with Axios token interceptors, add the minimal charcoal Gamification Toast, and run 100% passing test suites for both backend and frontend.

#### Story 5.1: Gamification Toast & Automated Test Suite
- **As a** commuter recording a journey,  
- **I want** a minimal charcoal toast notification saying `"Route Selected: +10 XP"`,  
- **And** all Jest/Supertest and React Testing Library tests must pass with 0 errors,  
- **So that** the application is proven production-ready.
- **Story Points:** 5
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Trip logging and test verification
    When the user records an itinerary
    Then +10 XP is added to the user's MongoDB record
    And a minimal charcoal toast appears
    And all backend and frontend unit tests pass (100% pass rate)
  ```

---

## 📊 Sprint Velocity & Estimation Summary

| Sprint | Scope | Estimated Story Points | Target Milestone |
|---|---|---|---|
| **Sprint 1 (Phase 2)** | MongoDB Setup, Mongoose Schemas, JWT Auth API, 30+ Hub Seed, Multi-Option Routing API, Jest Tests | 21 Pts | Backend Auth & Routing API Verified |
| **Sprint 2 (Phase 3)** | Editorial Design System, Auth Context, Split-Screen Login/Signup Page, Dynamic Navbar | 13 Pts | Authentication & Editorial Shell Live |
| **Sprint 3 (Phase 4)** | Multi-Page Travel Journal (Home, Search Results, Lines, Protected Status, About) | 26 Pts | All 5 Core Views Functional & Protected |
| **Sprint 4 (Phase 5)** | Gamification Toast, Framer Motion Transitions, RTL Tests, Final Documentation | 8 Pts | 100% Tests Passing & Final Delivery |
| **TOTAL** | **5 Epics · 12 User Stories** | **68 Pts** | Complete Academic Release |
