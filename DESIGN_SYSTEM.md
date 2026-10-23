# 🎨 DESIGN SYSTEM SPECIFICATION: AESTHETIC CHENNAI TRANSIT
> **Style Philosophy:** High-End Travel Publication (*Condé Nast Traveler*, *Monocle*, *Kinfolk*)  
> **Visual Direction:** Warm, tactile, evocative, and editorial. Replaces generic SaaS aesthetics with generous whitespace, sophisticated serif headlines, earthy natural accents, high-resolution transit photography with subtle scrims, and split-screen authentication layouts.

---

## 🏛️ 1. Color Palette Tokens

The palette abandons synthetic neon or generic blue/purple SaaS gradients in favor of an organic, muted, and intellectual color scheme:

| Token Name | Hex Code | Tailwind Class | Semantic Purpose |
|---|---|---|---|
| **Canvas Background** | `#F9F8F6` | `bg-[#F9F8F6]` | Warm off-white page background providing a tactile paper feel |
| **Pure White Card** | `#FFFFFF` | `bg-white` | Elevated card surfaces, search panels, and forms |
| **Deep Charcoal Text** | `#1A1A1A` | `text-[#1A1A1A]` | Primary headings, body copy, and solid editorial buttons |
| **Muted Slate Body** | `#5A5A5A` | `text-[#5A5A5A]` | Secondary metadata, captions, instructions, and labels |
| **Subtle Editorial Border** | `#E8E6E1` | `border-[#E8E6E1]` | Refined 1px card borders, dividing rules, and table grids |
| **Muted Terracotta** | `#C26A4A` | `text-[#C26A4A]`, `bg-[#C26A4A]` | Primary accent: MTC Bus badges, active tabs, and callouts |
| **Deep Forest Green** | `#2E4034` | `text-[#2E4034]`, `bg-[#2E4034]` | Secondary accent: Metro Rail lines, ecological carbon savings |
| **Warm Ochre / Gold** | `#A87C39` | `text-[#A87C39]`, `bg-[#A87C39]` | Southern Suburban Railway, Share Auto connectors |
| **Soft Sand Tint** | `#F0EDE6` | `bg-[#F0EDE6]` | Subtle hover fills, pill badges, and secondary table rows |

---

## 🔤 2. Editorial Typography Hierarchy

An authoritative editorial font pairing:
- **Headings (Display/H1-H3):** `Playfair Display` or `Lora` (Serif). Classic editorial elegance, high contrast, generous letter tracking.
- **Interface & Body Copy:** `Inter` or `Manrope` (Clean Sans-Serif). High legibility at small sizes, crisp tabular numbers.
- **Metadata & Telemetry:** `Inter` or `JetBrains Mono`. Clean, non-distracting figures for fares and timetables.

```css
/* Typography Scale */
h1 (Hero / Page Headline): font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1A1A]
h2 (Section Title):        font-serif text-2xl sm:text-4xl font-normal text-[#1A1A1A]
h3 (Card Headline):        font-serif text-xl sm:text-2xl font-medium text-[#1A1A1A]
body (Editorial Text):     font-sans text-sm sm:text-base text-[#5A5A5A] leading-relaxed
caption / label:           font-sans text-xs uppercase tracking-widest text-[#5A5A5A] font-semibold
fare / numeric figure:     font-sans text-xl sm:text-2xl font-semibold text-[#1A1A1A]
```

---

## 🖼️ 3. Curated Imagery & Overlay Guidelines

High-quality photography of public transit and Chennai landmarks forms the emotional core of the magazine experience:
- **Hero Backgrounds:** Full-width or framed landscape images with subtle gradient overlays (`bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/40 to-transparent`) ensuring complete text readability.
- **Card Imagery:** 16:9 or 4:3 aspect ratio images of iconic trains, green metro viaducts, red city buses, auto-rickshaws, and Chennai coastal scenes.
- **Image Overlays:** Warm dark scrims (`bg-black/30` to `bg-black/50`) or dual-tone tints.

### Curated Unsplash Transit References:
- **Hero / Train Viaduct:** `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80`
- **Suburban Railway Station:** `https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80`
- **Chennai / Metropolitan Bus:** `https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80`
- **Auto-rickshaw / Street:** `https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80`
- **Marina Coastal / Cityscape:** `https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80`

---

## 🔐 4. Split-Screen Authentication Design Specification

The Login and Registration views use a **50/50 split-screen layout**:
- **Left Panel (50% on desktop):** Full-height photographic showcase of a Chennai train/bus with a dark scrim, an editorial masthead, and an inspiring quote:
  > *"Every journey across Chennai is a dialogue between deep heritage and modern transit speed."*
- **Right Panel (50% on desktop):** A clean, warm off-white canvas with a pure white form card, elegant inputs with thin 1px borders (`border-[#E8E6E1] focus:border-[#1A1A1A]`), `Playfair Display` headline, and a solid deep charcoal submit button (`bg-[#1A1A1A] text-white hover:bg-[#2E4034]`).

---

## 🔘 5. Component Design Specifications

### A. `EditorialButton`
- **Primary:** Solid deep charcoal (`bg-[#1A1A1A] text-white hover:bg-[#2E4034] transition-colors duration-300`).
- **Secondary / Outline:** Transparent background with crisp 1px solid charcoal border (`border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300`).
- **Corner Radius:** Sharp or slightly rounded (`rounded-none` or `rounded-md`), strictly avoiding bubbly full pills.
- **Padding:** Generous horizontal breathing room (`px-6 py-3`).

### B. `ImageCard`
- Container with thin 1px border (`border border-[#E8E6E1] bg-white rounded-none sm:rounded-sm overflow-hidden`).
- High-res image header with subtle dark gradient overlay.
- Text content with serif title, muted description, and refined line indicator badge.

### C. `LineBadge`
- Muted, earthy background tag with subtle 1px border.
- **Metro Blue & Green:** `bg-[#2E4034]/10 text-[#2E4034] border-[#2E4034]/20`
- **MTC Bus:** `bg-[#C26A4A]/10 text-[#C26A4A] border-[#C26A4A]/20`
- **Suburban Train:** `bg-[#A87C39]/10 text-[#A87C39] border-[#A87C39]/20`

### D. `SearchCard`
- Clean, floating warm white box with sharp corners (`rounded-none` or `rounded-sm`), subtle border (`border border-[#E8E6E1]`), and clean grid sectioning.

### E. `GamificationToast`
- Minimalist charcoal bar (`bg-[#1A1A1A] text-white px-5 py-3.5 shadow-xl border border-white/10 rounded-sm`).
- Simple text: *"Route Selected: +10 XP. Commuter mobility balance updated."*

---

## 🎬 6. Motion Tokens (Framer Motion)

- **Page Transitions:** Subtle opacity fade with slight vertical rise (`initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}`).
- **Modal Transitions:** Soft zoom with backdrop blur (`initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}`).
- **Tab Switching:** Instant content re-render with gentle fade.
