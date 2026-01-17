# iEMT Lab Design System Specification

> **Version:** 1.0.0
> **Status:** AUTHORITATIVE — This document replaces all prior web application specifications
> **Brand:** iEMT Lab — Integrated Electric Motor Technologies
> **Scope:** ICE→EV Conversion Platform, E-Commerce, Vehicle Configurator
> **Consumer:** AI Implementation Agents, Frontend Developers, Design Systems

---

## 1. Design Philosophy & Emotional Direction

### 1.1 Core Identity Statement

iEMT Lab exists at the intersection of **precision engineering** and **sustainable transformation**. The visual system must communicate that electric propulsion is not a compromise—it is an upgrade. Every pixel must feel like it was placed by an engineer who cares about beauty.

### 1.2 Emotional Targets

| Emotion | Intensity | How It Manifests |
|---------|-----------|------------------|
| **Trust** | HIGH | Deep navy foundations, consistent spacing, no visual noise |
| **Precision** | HIGH | Monospace data, exact alignments, mathematical spacing ratios |
| **Innovation** | MEDIUM-HIGH | Electric cyan accents, circuit-inspired iconography, forward-leaning typography |
| **Power** | MEDIUM | Bold weight headlines, high contrast, deliberate color saturation |
| **Sustainability** | MEDIUM | Muted earth tones as grounding elements, green functional accents |
| **Accessibility** | HIGH | Legible contrast ratios, clear hierarchy, predictable interactions |

### 1.3 What iEMT Lab MUST Feel Like

- A **high-end engineering laboratory** that happens to have a storefront
- **Tesla's precision** meets **Porsche's heritage confidence**
- A place where **data is beautiful** and **specifications are celebrated**
- **Quiet confidence** — never shouty, never cheap, never desperate
- The calm certainty of a **master technician** explaining complex systems simply

### 1.4 What iEMT Lab Must NEVER Feel Like

| Anti-Pattern | Why It Fails | Detection Signal |
|--------------|--------------|------------------|
| Generic startup | Erodes trust in engineering capability | Gradient blobs, playful illustrations, rounded everything |
| Cheap e-commerce | Contradicts premium positioning | Bright reds, yellow badges, "SALE!" visual language |
| Over-designed | Obscures technical credibility | Excessive animations, decorative elements without function |
| Cold/clinical | Alienates non-technical buyers | No warmth, no humanity, pure utility |
| Retro/nostalgic | Conflicts with future-forward EV mission | Sepia tones, vintage typography, skeuomorphism |
| Aggressive/extreme | Inappropriate for considered purchase | Sharp angles everywhere, fire imagery, screaming colors |

### 1.5 Brand Personality Attributes

```
PERSONALITY_VECTOR = {
  professional: 0.9,
  innovative: 0.85,
  trustworthy: 0.95,
  approachable: 0.7,
  playful: 0.15,
  aggressive: 0.2,
  minimalist: 0.75,
  technical: 0.85
}
```

---

## 2. Typography System

### 2.1 Font Stack Declaration

```css
:root {
  --font-display: 'Montserrat', system-ui, -apple-system, sans-serif;
  --font-body: 'Montserrat', 'Open Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace;
}
```

### 2.2 Headlines — Display Typography

#### H1 — Hero / Page Title

| Property | Value | Rationale |
|----------|-------|-----------|
| Font Family | Montserrat | Industrial, geometric, logo-aligned |
| Font Weight | 800 (ExtraBold) | Commanding presence without aggression |
| Text Transform | `uppercase` | Cinematic, architectural, authoritative |
| Letter Spacing | `0.05em` | Prevents cramping at large sizes, adds prestige |
| Line Height | `1.1` | Tight for impact, allows stacking |
| Font Size (Desktop) | `clamp(2.5rem, 5vw, 4rem)` | Responsive scaling with boundaries |
| Font Size (Mobile) | `clamp(1.75rem, 8vw, 2.5rem)` | Maintains impact on small screens |
| Color | `--color-text-primary` | Navy foundation |

**Usage Rules:**
- ONLY for main page heroes and primary section announcements
- Maximum ONE H1 per page
- Never sentence case, never lowercase
- Minimum 48px margin-bottom

**Emotional Intent:** The H1 is a monument. It declares. It does not ask permission.

#### H2 — Section Headers

| Property | Value | Rationale |
|----------|-------|-----------|
| Font Family | Montserrat | Continuity with H1 |
| Font Weight | 700 (Bold) | Strong but subordinate to H1 |
| Text Transform | `uppercase` | Maintains architectural system |
| Letter Spacing | `0.03em` | Slightly tighter than H1 |
| Line Height | `1.2` | Accommodates wrapping |
| Font Size | `clamp(1.5rem, 3vw, 2.25rem)` | Clear hierarchy step-down |
| Color | `--color-text-primary` | Consistent navy |

**Usage Rules:**
- Major section divisions
- Feature category headers
- Service area titles
- Maximum 3-4 per page recommended

**Emotional Intent:** H2 organizes. It creates chapters in the story.

### 2.3 Subheads — Supporting Typography

#### H3 — Subsection Headers

| Property | Value |
|----------|-------|
| Font Family | Montserrat |
| Font Weight | 600 (SemiBold) |
| Text Transform | `capitalize` (Title Case) |
| Letter Spacing | `0.01em` |
| Line Height | `1.3` |
| Font Size | `clamp(1.125rem, 2vw, 1.5rem)` |
| Color | `--color-text-primary` |

**Usage Rules:**
- Feature titles within sections
- Product names in listings
- Card headers
- FAQ questions

#### H4 — Tertiary Headers

| Property | Value |
|----------|-------|
| Font Family | Montserrat |
| Font Weight | 600 (SemiBold) |
| Text Transform | `none` (Sentence case) |
| Letter Spacing | `normal` |
| Line Height | `1.4` |
| Font Size | `clamp(1rem, 1.5vw, 1.25rem)` |
| Color | `--color-text-secondary` |

**Usage Rules:**
- Specification group labels
- Form section headers
- Sidebar navigation headers
- Widget titles

### 2.4 Body Text — Content Typography

#### Body Default

| Property | Value | Rationale |
|----------|-------|-----------|
| Font Family | Montserrat | Brand consistency; acceptable for body at this weight |
| Font Weight | 400 (Regular) | Optimal readability |
| Font Size | `1rem` (16px base) | Accessibility standard |
| Line Height | `1.65` | Generous for comfortable reading |
| Letter Spacing | `0.01em` | Slight opening for screen legibility |
| Color | `--color-text-body` | Softened for extended reading |
| Max Width | `68ch` | Optimal line length for comprehension |

#### Body Small

| Property | Value |
|----------|-------|
| Font Size | `0.875rem` (14px) |
| Line Height | `1.5` |
| Use Cases | Captions, helper text, metadata |

#### Body Large (Lead Paragraphs)

| Property | Value |
|----------|-------|
| Font Size | `1.125rem` (18px) |
| Font Weight | 400 |
| Line Height | `1.7` |
| Use Cases | Hero subtitles, article leads, feature descriptions |

### 2.5 Technical / Engineering Data — Monospace System

> **CRITICAL:** All quantitative specifications, performance metrics, and technical data MUST use monospace typography. This is non-negotiable.

#### Specification Data

| Property | Value | Rationale |
|----------|-------|-----------|
| Font Family | JetBrains Mono | Engineering aesthetic, excellent numerals |
| Font Weight | 500 (Medium) | Crisp without being heavy |
| Font Size | `0.9375rem` (15px) | Slightly smaller, data-dense contexts |
| Letter Spacing | `0` | Monospace is pre-spaced |
| Line Height | `1.5` | Allows for spec tables |
| Color | `--color-text-primary` | Full contrast for critical data |
| Background | `--color-surface-elevated` | Optional: subtle lift for data blocks |

**MANDATORY Usage Contexts:**

```
MONOSPACE_REQUIRED = [
  "battery_capacity",        // e.g., "72 kWh"
  "range_specifications",    // e.g., "340 km"
  "motor_power",            // e.g., "150 kW"
  "torque_values",          // e.g., "350 Nm"
  "charging_speeds",        // e.g., "22 kW AC / 150 kW DC"
  "voltage_systems",        // e.g., "400V Architecture"
  "weight_measurements",    // e.g., "1,847 kg"
  "acceleration_times",     // e.g., "0-100: 4.2s"
  "price_values",           // e.g., "€47,500"
  "part_numbers",           // e.g., "iEMT-MOT-150-A"
  "api_endpoints",          // e.g., "/api/v1/vehicles"
  "code_snippets",          // Any code display
  "vin_numbers",            // Vehicle identification
  "serial_numbers",         // Component serials
  "version_numbers"         // e.g., "v2.4.1"
]
```

**Emotional Intent:** Monospace signals "this is measured, verified, engineering-grade data." It creates instant credibility for technical claims.

#### Code Blocks

| Property | Value |
|----------|-------|
| Font Family | JetBrains Mono |
| Font Size | `0.875rem` |
| Background | `--color-navy-deep` |
| Text Color | `--color-ice-100` |
| Border Radius | `4px` |
| Padding | `1rem 1.25rem` |

### 2.6 Typography Scale Reference

```css
:root {
  --text-xs: 0.75rem;      /* 12px — Fine print, badges */
  --text-sm: 0.875rem;     /* 14px — Small body, captions */
  --text-base: 1rem;       /* 16px — Body default */
  --text-lg: 1.125rem;     /* 18px — Lead paragraphs */
  --text-xl: 1.25rem;      /* 20px — H4, large body */
  --text-2xl: 1.5rem;      /* 24px — H3 */
  --text-3xl: 1.875rem;    /* 30px — H2 mobile */
  --text-4xl: 2.25rem;     /* 36px — H2 desktop */
  --text-5xl: 3rem;        /* 48px — H1 mobile */
  --text-6xl: 4rem;        /* 64px — H1 desktop */
}
```

### 2.7 Typography Do / Don't

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use uppercase for H1, H2 only | Use uppercase for body text |
| Use monospace for ALL specs | Use body font for technical data |
| Maintain consistent hierarchy | Skip heading levels (H1 → H4) |
| Use 68ch max-width for body | Allow body text to span full viewport |
| Apply letter-spacing to headlines | Add letter-spacing to body text |
| Use 400 weight for body | Use light (300) weights for body |

---

## 3. Color System

### 3.1 Core Palette Definition

| Token Name | Hex Value | RGB | HSL |
|------------|-----------|-----|-----|
| `--color-navy-deep` | `#113859` | `17, 56, 89` | `207°, 68%, 21%` |
| `--color-ice-400` | `#8EB1BF` | `142, 177, 191` | `197°, 28%, 65%` |
| `--color-earth-400` | `#A69576` | `166, 149, 118` | `39°, 22%, 56%` |
| `--color-amber-500` | `#BF8B4B` | `191, 139, 75` | `33°, 49%, 52%` |
| `--color-ice-100` | `#F2F2F2` | `242, 242, 242` | `0°, 0%, 95%` |

### 3.2 Extended Palette (Computed)

#### Navy Scale (Primary)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-navy-900` | `#0A1F30` | Deepest backgrounds |
| `--color-navy-800` | `#0F2D45` | Dark mode surfaces |
| `--color-navy-700` | `#113859` | **BASE — Primary brand** |
| `--color-navy-600` | `#1A4A70` | Hover states on dark |
| `--color-navy-500` | `#245D87` | Secondary buttons |
| `--color-navy-400` | `#3A7199` | Icons on light |
| `--color-navy-300` | `#5A8DAD` | Muted accents |
| `--color-navy-200` | `#8EB1BF` | **ICE-400 overlap** |
| `--color-navy-100` | `#C5D9E2` | Tinted backgrounds |
| `--color-navy-50` | `#E8F1F5` | Subtle surface tints |

#### Ice Scale (Secondary / Cool)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-ice-500` | `#6A9AAC` | Darker ice for contrast |
| `--color-ice-400` | `#8EB1BF` | **BASE — Secondary cool** |
| `--color-ice-300` | `#A8C4CF` | Soft accents |
| `--color-ice-200` | `#C5D9E2` | Light backgrounds |
| `--color-ice-100` | `#F2F2F2` | **BASE — Page background** |
| `--color-ice-50` | `#FAFAFA` | Elevated surfaces |

#### Earth Scale (Tertiary / Warm)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-earth-600` | `#8A7A5E` | Darker earth |
| `--color-earth-500` | `#97876A` | Medium earth |
| `--color-earth-400` | `#A69576` | **BASE — Heritage warmth** |
| `--color-earth-300` | `#BEAB8F` | Soft warm accents |
| `--color-earth-200` | `#D4C9B5` | Warm backgrounds |
| `--color-earth-100` | `#EBE6DC` | Subtle warm tint |

#### Amber Scale (Accent / Energy)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-amber-700` | `#9A6B30` | Deep amber |
| `--color-amber-600` | `#AC7B3E` | Dark accent |
| `--color-amber-500` | `#BF8B4B` | **BASE — Primary accent** |
| `--color-amber-400` | `#CFA05F` | Hover state |
| `--color-amber-300` | `#DEB87C` | Soft highlight |
| `--color-amber-200` | `#EBCEA0` | Light accent background |

### 3.3 Semantic Color Tokens

> **IMPLEMENTATION NOTE:** Always reference semantic tokens in components, never raw palette values.

#### Backgrounds

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-page` | `#F2F2F2` | Default page background |
| `--color-bg-surface` | `#FFFFFF` | Cards, modals, elevated content |
| `--color-bg-surface-elevated` | `#FAFAFA` | Nested elevated surfaces |
| `--color-bg-inverse` | `#113859` | Dark sections, footers |
| `--color-bg-subtle` | `#E8F1F5` | Subtle section differentiation |

#### Text

| Token | Value | Usage | Contrast Ratio (on white) |
|-------|-------|-------|---------------------------|
| `--color-text-primary` | `#113859` | Headlines, primary content | 8.9:1 ✅ AAA |
| `--color-text-secondary` | `#3A7199` | Secondary content, labels | 4.7:1 ✅ AA |
| `--color-text-body` | `#1A4A70` | Body paragraphs | 7.2:1 ✅ AAA |
| `--color-text-muted` | `#6A9AAC` | Placeholder, disabled | 3.1:1 ⚠️ Large text only |
| `--color-text-inverse` | `#F2F2F2` | Text on dark backgrounds | N/A |
| `--color-text-inverse-muted` | `#8EB1BF` | Secondary text on dark | N/A |

#### Interactive

| Token | Value | Usage |
|-------|-------|-------|
| `--color-interactive-primary` | `#113859` | Primary buttons, links |
| `--color-interactive-primary-hover` | `#0F2D45` | Hover state |
| `--color-interactive-primary-active` | `#0A1F30` | Pressed state |
| `--color-interactive-secondary` | `#BF8B4B` | Secondary CTAs |
| `--color-interactive-secondary-hover` | `#AC7B3E` | Hover state |

#### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border-default` | `#C5D9E2` | Standard borders |
| `--color-border-subtle` | `#E8F1F5` | Subtle separators |
| `--color-border-strong` | `#8EB1BF` | Emphasized borders |
| `--color-border-focus` | `#BF8B4B` | Focus rings |

### 3.4 Color Usage Rules

#### Primary Navy (`#113859`)

**DO:**
- Hero section backgrounds
- Primary button fills
- Header/navigation backgrounds
- Footer backgrounds
- Primary text color
- Icon fills (primary actions)

**DON'T:**
- Body text backgrounds (too dark for extended reading)
- Warning or error states
- Success indicators
- Promotional badges

#### Ice (`#8EB1BF` / `#F2F2F2`)

**DO:**
- Page backgrounds (ice-100)
- Secondary button fills (ice-400)
- Subtle section dividers
- Data visualization: cooling, efficiency, software
- Supporting iconography
- Muted borders

**DON'T:**
- Primary CTAs (insufficient contrast)
- Critical alerts
- Primary text (fails contrast)
- Progress indicators for completion

#### Earth (`#A69576`)

**DO:**
- Heritage/history sections
- Premium tier indicators
- Subtle warm accents
- Testimonial backgrounds
- "Before" states in conversions
- Navigation hover accents

**DON'T:**
- Primary actions
- Error states
- Primary buttons
- Large text blocks
- Data requiring high visibility

#### Amber (`#BF8B4B`)

**DO:**
- Secondary CTAs
- Highlight accents
- Focus rings
- Featured badges
- Price callouts
- Hover state accents
- Progress indicators
- Achievement markers

**DON'T:**
- Warning states (too close to brand accent)
- Large background areas
- Body text
- Primary buttons on dark backgrounds

### 3.5 Contrast Compliance Matrix

| Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|------------|------------|-------|---------|----------|
| Navy Deep | Ice-100 | 8.9:1 | ✅ Pass | ✅ Pass |
| Navy Deep | White | 10.2:1 | ✅ Pass | ✅ Pass |
| Ice-100 | Navy Deep | 8.9:1 | ✅ Pass | ✅ Pass |
| Amber-500 | Navy Deep | 5.1:1 | ✅ Pass | ❌ Fail |
| Amber-500 | White | 2.8:1 | ❌ Fail | ❌ Fail |
| Earth-400 | White | 3.4:1 | ⚠️ Large only | ❌ Fail |

**RULE:** Amber and Earth must NEVER be used for body text. They are accent colors only.

---

## 4. Functional Color Mapping

### 4.1 Product Category → Color Association

> **CRITICAL:** These mappings create instant visual categorization. They must be applied consistently across all touchpoints.

#### Electric Blue / Cyan — Cloud Integration & Software

```
FUNCTION: Software, connectivity, cloud services, data, digital interfaces
COLOR_TOKEN: --color-functional-cloud
VALUE: #2EADD3 (Derived cyan, not in base palette)
FALLBACK: --color-ice-400 (#8EB1BF)
```

| Application | Implementation |
|-------------|----------------|
| Cloud service icons | Fill: `--color-functional-cloud` |
| Software feature cards | Left border: 4px solid `--color-functional-cloud` |
| API documentation | Code block accents |
| Connectivity indicators | Status dots, connection lines |
| Data visualization | Primary data series color |
| OTA update badges | Background tint |

**Emotional Intent:** Cool, intelligent, connected, always-on, digital precision

**WHERE IT APPEARS:**
- Cloud integration section headers
- Software feature highlights
- Connectivity status indicators
- API/Developer portal
- Data dashboard elements
- OTA update notifications

**WHERE IT MUST NEVER APPEAR:**
- Performance/power contexts
- Conversion process steps
- Heritage/history sections
- Price displays
- Error states

#### Eco Green — ICE → EV Conversions

```
FUNCTION: Sustainability, transformation, renewal, environmental benefit
COLOR_TOKEN: --color-functional-eco
VALUE: #4CAF50 (Balanced green, universally recognized)
SECONDARY: #81C784 (Lighter variant for backgrounds)
```

| Application | Implementation |
|-------------|----------------|
| Conversion CTAs | Button variant: eco |
| Environmental stats | Icon + text color |
| "Before/After" indicators | "After" state accent |
| CO₂ savings displays | Numeric highlight |
| Sustainability badges | Badge background |
| Process completion | Final step indicator |

**Emotional Intent:** Renewal, positive transformation, environmental responsibility, future-forward

**WHERE IT APPEARS:**
- ICE→EV conversion pages
- Environmental impact calculators
- Sustainability certifications
- "Go Electric" CTAs
- Emissions comparison data
- Process completion states

**WHERE IT MUST NEVER APPEAR:**
- Performance specifications
- Price/financial data
- Error or warning states
- Generic success messages (use sparingly)
- Non-conversion product pages

#### High-Voltage Orange — ATVs, Motorcycles, Performance

```
FUNCTION: Power, torque, adventure, performance, excitement
COLOR_TOKEN: --color-functional-power
VALUE: #FF6B35 (Vibrant, energetic orange)
SECONDARY: #FF8C5A (Lighter variant)
```

| Application | Implementation |
|-------------|----------------|
| Performance badges | Background: `--color-functional-power` |
| Torque/power stats | Numeric emphasis |
| ATV/Motorcycle sections | Section accent color |
| "High Performance" tags | Tag background |
| Acceleration highlights | Stat card accent |
| Adventure imagery overlays | Gradient accent |

**Emotional Intent:** Raw power, adrenaline, adventure, off-road capability, excitement

**WHERE IT APPEARS:**
- ATV product pages
- Motorcycle product pages
- Performance specification highlights
- "Sport Mode" indicators
- Power/torque callouts
- Adventure lifestyle imagery

**WHERE IT MUST NEVER APPEAR:**
- Sedan/standard vehicle pages
- Financial/pricing contexts
- Error states (conflicts with error red)
- Professional/business contexts
- Sustainability messaging

### 4.2 Functional Color Priority Rules

When multiple product categories or functions overlap, apply colors in this priority order:

```
PRIORITY_ORDER = [
  1: "error_states",        // Always red, overrides all
  2: "warning_states",      // Always amber-derived
  3: "success_states",      // Eco green (contextual)
  4: "primary_category",    // Based on current page context
  5: "secondary_accents"    // Supporting functions
]
```

**Overlap Scenario Examples:**

| Scenario | Resolution |
|----------|------------|
| EV Conversion + Performance Stats | Eco green for conversion CTA, Power orange for performance numbers |
| Cloud Software + Error State | Error red overrides cloud blue |
| ATV + Sustainability Badge | Power orange dominant, eco green badge isolated |
| Multiple product comparison | Neutral navy/ice, individual product accents in comparison cells |

### 4.3 System Status Colors

| Status | Color | Token | Usage |
|--------|-------|-------|-------|
| Success | `#4CAF50` | `--color-status-success` | Form completion, successful actions |
| Warning | `#F9A825` | `--color-status-warning` | Cautions, non-critical alerts |
| Error | `#E53935` | `--color-status-error` | Errors, critical failures |
| Info | `#2196F3` | `--color-status-info` | Informational messages |

**RULE:** System status colors override functional category colors in all contexts.

---

## 5. Iconography System

### 5.1 Icon Style Specification

| Property | Value | Rationale |
|----------|-------|-----------|
| Style | Outlined / Line | Clean, technical, modern |
| Stroke Width | `1.5px` | Optimal visibility, not heavy |
| Line Cap | `round` | Slightly softer, approachable |
| Line Join | `round` | Consistency with line cap |
| Corner Radius | `2px` (where applicable) | Subtle softening |
| Grid | `24×24px` base | Standard, scalable |
| Optical Sizing | Scale stroke to 1px at 16px, 2px at 32px | Maintain visual weight |

### 5.2 Icon Geometry Rules

```
GEOMETRY_PRINCIPLES = {
  primary_shapes: ["circle", "square", "rectangle"],
  angle_constraints: [0, 45, 90],  // degrees
  curve_style: "geometric_arcs",   // not organic beziers
  symmetry: "preferred",
  complexity: "minimal"            // max 3 visual elements per icon
}
```

### 5.3 Icon Categories & Treatments

| Category | Stroke Color | Fill Treatment | Examples |
|----------|--------------|----------------|----------|
| Navigation | `--color-text-primary` | None | Menu, close, chevron |
| Action | `--color-interactive-primary` | None, filled on hover | Download, share, edit |
| Status | Respective status color | Optional background circle | Check, warning, error |
| Product | `--color-text-primary` | None | Vehicle, battery, motor |
| Feature | `--color-ice-400` | None | Wifi, cloud, settings |

### 5.4 Circuit Node Alignment

> **BRAND ALIGNMENT:** Icons should subtly echo the circuit/node aesthetic of the iEMT Lab logo.

**Implementation Guidelines:**
- Incorporate small circular nodes (3-4px diameter) at key intersections
- Use straight connecting lines where possible
- Terminal points can feature node dots
- Avoid excessive organic curves

**Example — Battery Icon:**
```
Standard: Simple battery outline
iEMT Style: Battery with node dots at terminals, 
            internal level indicator with circuit-trace aesthetic
```

### 5.5 Icon Sizing Scale

| Size Token | Pixel Value | Use Case |
|------------|-------------|----------|
| `--icon-xs` | 12px | Inline text indicators |
| `--icon-sm` | 16px | Compact UI, badges |
| `--icon-md` | 24px | Standard UI, buttons |
| `--icon-lg` | 32px | Feature highlights |
| `--icon-xl` | 48px | Section markers |
| `--icon-2xl` | 64px | Hero features |

### 5.6 When NOT to Use Icons

| Context | Reason | Alternative |
|---------|--------|-------------|
| Body text decoration | Visual noise | Let typography carry weight |
| Every list item | Overwhelming, reduces impact | Use sparingly for key items |
| Pure decoration | No functional value | White space, typography |
| Complex concepts | Icons oversimplify | Illustrations or diagrams |
| Primary CTAs | Text is clearer | Text-only buttons |

---

## 6. UI Behavior & Visual Rhythm

### 6.1 Spacing System

> **BASE UNIT:** 4px — All spacing values derive from this unit.

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### 6.2 Component Spacing Rules

| Component Type | Internal Padding | External Margin | Gap (if flex/grid) |
|----------------|------------------|-----------------|---------------------|
| Buttons (sm) | `--space-2` `--space-4` | — | — |
| Buttons (md) | `--space-3` `--space-6` | — | — |
| Buttons (lg) | `--space-4` `--space-8` | — | — |
| Cards | `--space-6` | `--space-4` | — |
| Card grids | — | — | `--space-6` |
| Form fields | `--space-3` `--space-4` | `--space-4` (bottom) | — |
| Sections | `--space-16` (top/bottom) | — | — |
| Hero sections | `--space-24` (top/bottom) | — | — |
| Navigation items | `--space-2` `--space-4` | — | `--space-2` |

### 6.3 Density Modes

| Mode | Use Case | Spacing Multiplier |
|------|----------|-------------------|
| Compact | Data tables, dashboards | 0.75× |
| Default | Standard pages, forms | 1× |
| Comfortable | Marketing, hero areas | 1.25× |
| Spacious | Premium showcases | 1.5× |

### 6.4 Border Radius System

```css
:root {
  --radius-none: 0;
  --radius-sm: 2px;     /* Subtle rounding */
  --radius-md: 4px;     /* Default for buttons, inputs */
  --radius-lg: 8px;     /* Cards, modals */
  --radius-xl: 12px;    /* Feature cards */
  --radius-2xl: 16px;   /* Hero elements */
  --radius-full: 9999px; /* Pills, avatars */
}
```

**Application Rules:**
| Component | Border Radius |
|-----------|---------------|
| Buttons | `--radius-md` |
| Input fields | `--radius-md` |
| Cards | `--radius-lg` |
| Modals | `--radius-lg` |
| Badges/Pills | `--radius-full` |
| Images (product) | `--radius-lg` |
| Images (hero) | `--radius-none` |
| Tooltips | `--radius-md` |

### 6.5 Shadow System

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(17 56 89 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(17 56 89 / 0.08), 
               0 2px 4px -2px rgb(17 56 89 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(17 56 89 / 0.08), 
               0 4px 6px -4px rgb(17 56 89 / 0.05);
  --shadow-xl: 0 20px 25px -5px rgb(17 56 89 / 0.1), 
               0 8px 10px -6px rgb(17 56 89 / 0.05);
}
```

**Usage:**
| Component State | Shadow |
|-----------------|--------|
| Cards (default) | `--shadow-md` |
| Cards (hover) | `--shadow-lg` |
| Dropdowns | `--shadow-lg` |
| Modals | `--shadow-xl` |
| Buttons (default) | `--shadow-sm` |
| Elevated surfaces | `--shadow-md` |

### 6.6 Motion Guidelines

| Property | Value | Rationale |
|----------|-------|-----------|
| Duration (micro) | `100ms` | Immediate feedback |
| Duration (short) | `200ms` | Standard transitions |
| Duration (medium) | `300ms` | Page transitions |
| Duration (long) | `500ms` | Complex animations |
| Easing (default) | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth, natural |
| Easing (enter) | `cubic-bezier(0, 0, 0.2, 1)` | Decelerate in |
| Easing (exit) | `cubic-bezier(0.4, 0, 1, 1)` | Accelerate out |

**Motion Usage:**

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button hover | `100ms` | default |
| Card hover lift | `200ms` | default |
| Modal open | `300ms` | enter |
| Modal close | `200ms` | exit |
| Page transitions | `300ms` | default |
| Accordion expand | `300ms` | default |

**Motion Principles:**
1. Motion should feel **purposeful**, not decorative
2. Never delay user action with animation
3. Prefer **transforms** over layout changes
4. Use **opacity** + **transform** for enter/exit
5. Respect `prefers-reduced-motion` media query

### 6.7 Typography + Color Layout Harmony

**Hero Sections:**
```
Background: --color-navy-deep
Headline: --color-ice-100, Montserrat ExtraBold, UPPERCASE
Subhead: --color-ice-400, Montserrat Regular
CTA: --color-amber-500 fill, --color-navy-deep text
```

**Content Sections (Light):**
```
Background: --color-ice-100
Headline: --color-navy-deep, Montserrat Bold, UPPERCASE
Body: --color-text-body, Montserrat Regular
Accent: --color-amber-500 for highlights
```

**Feature Cards:**
```
Background: white
Border: --color-border-default
Headline: --color-text-primary, Montserrat SemiBold
Body: --color-text-body
Icon: --color-navy-400
Hover: --shadow-lg, border-color: --color-amber-500
```

---

## 7. Implementation Notes for AI & Developers

### 7.1 Token Naming Convention

```
NAMING_PATTERN: --{category}-{property}-{variant}-{state}

CATEGORIES: color, space, radius, shadow, font, text, icon
PROPERTIES: bg, text, border, fill, stroke, size, weight, family
VARIANTS: primary, secondary, tertiary, inverse, subtle, muted
STATES: default (omitted), hover, active, focus, disabled
```

**Examples:**
```css
--color-bg-primary          /* Primary background */
--color-text-primary-hover  /* Primary text on hover */
--color-border-focus        /* Focus ring color */
--space-section-y           /* Vertical section padding */
--radius-button             /* Button border radius */
```

### 7.2 Conditional Logic Rules

```
IF context == "hero_section":
    background = --color-navy-deep
    text_primary = --color-ice-100
    cta_style = "amber_fill"

IF context == "product_card" AND product_type == "atv":
    accent_color = --color-functional-power
    
IF context == "product_card" AND product_type == "conversion":
    accent_color = --color-functional-eco
    
IF context == "specification_display":
    font_family = --font-mono
    font_weight = 500
    
IF element == "price":
    font_family = --font-mono
    color = --color-text-primary
    
IF element == "button" AND variant == "primary":
    background = --color-navy-deep
    color = --color-ice-100
    hover_background = --color-navy-800
    
IF element == "button" AND variant == "secondary":
    background = transparent
    border = 2px solid --color-navy-deep
    color = --color-navy-deep
    hover_background = --color-navy-50
    
IF user_preference == "reduced_motion":
    transition_duration = 0
    animation = none
```

### 7.3 Component Token Mapping

```yaml
Button:
  primary:
    background: var(--color-interactive-primary)
    color: var(--color-text-inverse)
    border: none
    radius: var(--radius-md)
    padding: var(--space-3) var(--space-6)
    font: var(--font-display)
    weight: 600
    transform: uppercase
    letter-spacing: 0.02em
    shadow: var(--shadow-sm)
    hover:
      background: var(--color-interactive-primary-hover)
      shadow: var(--shadow-md)
    active:
      background: var(--color-interactive-primary-active)
      
Card:
  default:
    background: white
    border: 1px solid var(--color-border-default)
    radius: var(--radius-lg)
    padding: var(--space-6)
    shadow: var(--shadow-md)
    hover:
      shadow: var(--shadow-lg)
      border-color: var(--color-border-strong)
      
Input:
  default:
    background: white
    border: 1px solid var(--color-border-default)
    radius: var(--radius-md)
    padding: var(--space-3) var(--space-4)
    font: var(--font-body)
    color: var(--color-text-primary)
    focus:
      border-color: var(--color-amber-500)
      outline: 2px solid var(--color-amber-200)
      outline-offset: 2px
```

### 7.4 Breakpoint System

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

| Breakpoint | Target Devices | Container Max-Width |
|------------|----------------|---------------------|
| < 640px | Mobile portrait | 100% - 32px padding |
| 640-767px | Mobile landscape | 100% - 48px padding |
| 768-1023px | Tablet | 720px |
| 1024-1279px | Small desktop | 960px |
| 1280-1535px | Desktop | 1200px |
| ≥ 1536px | Large desktop | 1400px |

### 7.5 Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | Minimum 4.5:1 for body text, 3:1 for large text |
| Focus indicators | Visible 2px outline, `--color-amber-500` |
| Touch targets | Minimum 44×44px |
| Motion | Honor `prefers-reduced-motion` |
| Font sizing | Use `rem` units, respect user preferences |
| Semantic HTML | Proper heading hierarchy, ARIA labels |

### 7.6 Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-toast: 800;
}
```

---

## 8. ⛔ Do Not Deviate From This System

### 8.1 Critical Invariants

The following rules are **absolute** and must **never** be violated:

| Rule | Violation Consequence |
|------|----------------------|
| Technical specs use monospace | Loss of engineering credibility |
| H1/H2 are uppercase | Brand inconsistency |
| Amber is never body text | Accessibility failure |
| Status colors override brand colors | User confusion, safety risk |
| Navy is primary, not black | Brand dilution |
| 4px spacing grid | Visual chaos, misalignment |
| Minimum 4.5:1 contrast for text | Accessibility violation |

### 8.2 Prohibited Patterns

```
FORBIDDEN = [
  "black_text_color",           // Use navy-deep
  "pure_white_backgrounds",     // Use ice-100 or ice-50
  "rainbow_gradients",          // Not brand-aligned
  "drop_shadows_on_text",       // Reduces legibility
  "justified_body_text",        // Creates rivers
  "centered_body_paragraphs",   // Reduces readability
  "all_caps_body_text",         // Accessibility issue
  "icon_fonts",                 // Use SVG icons
  "pixel_units_for_text",       // Use rem
  "animation_durations_>500ms", // Feels sluggish
  "z_index_>1000",              // Unmaintainable
  "inline_styles",              // Use design tokens
  "hardcoded_color_values"      // Use semantic tokens
]
```

### 8.3 Consistency Checks for AI Implementation

Before applying any style, verify:

1. ✅ Is the color token semantic, not raw hex?
2. ✅ Is the typography using the correct weight for its role?
3. ✅ Is technical data in monospace?
4. ✅ Is spacing derived from the 4px grid?
5. ✅ Does the contrast ratio meet WCAG AA?
6. ✅ Is the functional color appropriate for the context?
7. ✅ Is the border radius consistent with component type?
8. ✅ Is the shadow appropriate for the elevation level?

### 8.4 Version Control Note

```
SPECIFICATION_VERSION: 1.0.0
LAST_UPDATED: 2025-01-16
AUTHORITY: This document supersedes all prior specifications
AMENDMENTS: Must be documented with version increment
```

---

## Appendix A: Quick Reference Card

### Typography at a Glance

| Element | Font | Weight | Case | Tracking |
|---------|------|--------|------|----------|
| H1 | Montserrat | 800 | UPPER | +0.05em |
| H2 | Montserrat | 700 | UPPER | +0.03em |
| H3 | Montserrat | 600 | Title | +0.01em |
| H4 | Montserrat | 600 | Sentence | normal |
| Body | Montserrat | 400 | Sentence | +0.01em |
| Specs | JetBrains Mono | 500 | — | normal |

### Color at a Glance

| Role | Token | Value |
|------|-------|-------|
| Primary | `--color-navy-deep` | #113859 |
| Accent | `--color-amber-500` | #BF8B4B |
| Background | `--color-ice-100` | #F2F2F2 |
| Secondary | `--color-ice-400` | #8EB1BF |
| Warm | `--color-earth-400` | #A69576 |

### Functional Colors

| Function | Color | Hex |
|----------|-------|-----|
| Cloud/Software | Cyan | #2EADD3 |
| Eco/Conversion | Green | #4CAF50 |
| Power/Performance | Orange | #FF6B35 |

---

*End of iEMT Lab Design System Specification v1.0.0*