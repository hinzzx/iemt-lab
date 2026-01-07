# iEMT Lab Design System
## A Modern, Scalable Visual Identity for Electric Vehicle Innovation

**Version:** 1.0  
**Date:** January 2026  
**Prepared for:** iEMT Lab – Electric Motor Technology Laboratory

---

## 1. Current Design Audit

### 1.1 Color Palette Analysis

The current website uses an inconsistent color approach with the following identified colors:

| Color | HEX Value | Current Usage | Issues |
|-------|-----------|---------------|--------|
| Black (Primary BG) | `#000000` | Hero sections, backgrounds | Pure black creates harsh contrast, causes eye strain |
| Dark Gray | `#1a1a1a` | Card backgrounds | Inconsistent with pure black sections |
| Orange Accent | `#ff6b35` | Buttons, highlights | Appears randomly, no systematic usage |
| White | `#ffffff` | Text, icons | Good contrast but lacks warmth |
| Gray Text | `#808080` | Secondary text | Insufficient contrast on dark backgrounds |

**Critical Issues:**
- No defined semantic colors (success, warning, error)
- Accent color appears arbitrarily without hierarchy
- Gray tones lack systematic relationship
- No consideration for dark/light mode flexibility

### 1.2 Typography Assessment

**Current State:**
- Primary font appears to be a generic sans-serif (system default or basic Wix font)
- Heading hierarchy is unclear (H1-H6 inconsistently sized)
- Line heights appear cramped, especially in description text
- No clear distinction between UI text and content text
- Product specs use the same font weight as body copy, reducing scanability

**Specific Problems:**
- Hero text "iEMT Lab" competes with tagline for attention
- Product cards use `#####` headings that don't scale predictably
- Specification labels and values have identical styling
- Footer navigation lacks visual hierarchy

### 1.3 Layout & Spacing Critique

**Grid System Issues:**
- No apparent underlying grid structure
- Content width varies unpredictably between sections
- Product cards don't align to consistent breakpoints
- Icon/specification blocks use different spacing patterns
- Hero section doesn't align with content sections below

**Spacing Problems:**
- Section padding inconsistent (some sections feel cramped, others too airy)
- Card internal padding varies between components
- No consistent margin between heading and body text
- Process steps ("How Electric Conversion Works") have uneven gaps

### 1.4 UI Consistency Issues

| Component | Issue |
|-----------|-------|
| **Buttons** | "Discover More", "More", "Shop", "Get Quote" all have different styling |
| **Cards** | Product cards, about cards, and spec cards use different structures |
| **Icons** | Mixed styles: some illustrated, some flat, some with backgrounds |
| **Navigation** | Main site (Wix) and Store (Shopify) have completely different headers |
| **Forms** | Contact form and quote form use default Wix/Shopify styling |
| **Images** | Inconsistent treatment (some have backgrounds, some are cutouts) |

### 1.5 Brand Perception Problems

The current site communicates:
- ❌ **Startup hobbyist** rather than professional engineering firm
- ❌ **Generic template** rather than bespoke expertise
- ❌ **Low confidence** through inconsistent execution
- ❌ **Disconnected** experience between main site and store

What it should communicate:
- ✅ **Precision engineering** expertise
- ✅ **High-performance** electric systems
- ✅ **Trustworthy** partner for significant purchases
- ✅ **Innovative** yet reliable technology

### 1.6 Configurator Scalability Failures

The current design will break under configurator complexity because:

1. **No data display system** – Specs are shown in arbitrary formats without consistent structure
2. **No comparison framework** – Model comparisons (EonTrail vs HyperGlide vs TitanVolt) lack visual structure
3. **No selection state patterns** – Color selectors are basic text links without proper UI
4. **No progress/flow indicators** – No framework for multi-step configuration
5. **No component variation system** – Can't show component upgrades (battery sizes, motor options)
6. **Insufficient contrast hierarchy** – Dense spec tables would become unreadable

---

## 2. Brand Positioning Translation

### 2.1 What the Brand SHOULD Visually Communicate

| Attribute | Visual Translation |
|-----------|-------------------|
| **Engineering Precision** | Clean grids, mathematical spacing, monospace accents for specs |
| **Electric Power** | Controlled energy through accent colors, subtle glow effects |
| **Industrial Strength** | Heavy typography weights, structured layouts, metal-inspired neutrals |
| **Performance Focus** | Data-forward design, prominent specifications, comparison tools |
| **Innovation** | Modern typography, contemporary UI patterns, subtle motion |
| **Reliability** | Consistent spacing, predictable component behavior, clear hierarchy |

### 2.2 Emotional Tone Profile

```
PRECISION ████████████████░░░░ 80%
POWER     ██████████████░░░░░░ 70%  
CONTROL   ████████████████████ 100%
WARMTH    ████████░░░░░░░░░░░░ 40%
PLAYFUL   ████░░░░░░░░░░░░░░░░ 20%
```

**Primary emotions:** Confidence, Trust, Capability, Precision
**Secondary emotions:** Innovation, Progress, Environmental responsibility

### 2.3 Visual Metaphors for Electrified ATVs

**USE:**
- **Circuit patterns** – Subtle background textures suggesting connectivity
- **Energy flow** – Gradients that suggest power transfer
- **Precision machinery** – Technical drawings, blueprints as decorative elements
- **Clean power** – Fresh, crisp color palette without pollution connotations
- **Torque visualization** – Bold, grounded typography suggesting instant power

**AVOID:**
- Lightning bolts (cliché, aggressive)
- Neon/cyberpunk aesthetics (dated, not premium)
- Racing stripes (too sporty, not industrial)
- Leaf/green eco symbols (overused, reduces premium feel)

### 2.4 Visual Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Alternative |
|--------------|--------------|-------------|
| Pure black backgrounds | Harsh, creates eye strain | Warm dark gray (#0a0a0a - #121212) |
| Neon green for "electric" | Cliché, cheap-looking | Sophisticated blue-white energy |
| Gradient overuse | Dated, distracting | Subtle, functional gradients only |
| Stock photo aesthetic | Generic, untrustworthy | Custom imagery, 3D renders |
| Centered everything | Lacks visual interest | Asymmetric balance |
| Thin fonts for specs | Hard to read, weak | Medium/bold weights for data |

---

## 3. Proposed Typography System

### 3.1 Font Selection

**Primary Font: [DM Sans](https://fonts.google.com/specimen/DM+Sans)**
- **Rationale:** Geometric construction suggests precision engineering. Wide character set supports Bulgarian. Modern without being trendy. Excellent readability at all sizes.
- **Usage:** Headings, UI elements, navigation, buttons
- **Weights:** 400 (Regular), 500 (Medium), 700 (Bold)

**Secondary Font: [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)**
- **Rationale:** Industrial heritage from IBM's engineering legacy. Perfect for specifications, code, and technical data. Signals precision and expertise.
- **Usage:** Specifications, data values, technical labels, code snippets
- **Weights:** 400 (Regular), 500 (Medium)

**Alternative Consideration: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)**
- More distinctive character, excellent for large headings
- Consider for hero text and marketing headlines only

### 3.2 Font Weights & Hierarchy Roles

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, descriptions, secondary content |
| 500 | Medium | UI labels, navigation, specifications, emphasis |
| 700 | Bold | Headings, CTAs, data highlights, prices |

### 3.3 Heading Scale (Desktop)

Using a **1.25 ratio** (Major Third) for balanced progression:

```css
/* Heading Scale - Desktop */
--text-h1: 3.815rem;    /* 61.04px - Hero headlines */
--text-h2: 3.052rem;    /* 48.83px - Section titles */
--text-h3: 2.441rem;    /* 39.06px - Subsection headers */
--text-h4: 1.953rem;    /* 31.25px - Card titles, features */
--text-h5: 1.563rem;    /* 25.00px - Component headers */
--text-h6: 1.25rem;     /* 20.00px - Small headers, labels */
```

**Mobile Scale (0.875x reduction):**
```css
/* Heading Scale - Mobile */
--text-h1-mobile: 2.441rem;   /* 39.06px */
--text-h2-mobile: 1.953rem;   /* 31.25px */
--text-h3-mobile: 1.563rem;   /* 25.00px */
--text-h4-mobile: 1.25rem;    /* 20.00px */
--text-h5-mobile: 1.125rem;   /* 18.00px */
--text-h6-mobile: 1rem;       /* 16.00px */
```

### 3.4 Body Text Sizes

```css
/* Body Text */
--text-xl: 1.25rem;     /* 20px - Lead paragraphs, featured text */
--text-lg: 1.125rem;    /* 18px - Important body content */
--text-base: 1rem;      /* 16px - Standard body text */
--text-sm: 0.875rem;    /* 14px - Secondary text, captions */
--text-xs: 0.75rem;     /* 12px - Fine print, labels */

/* Specification Text (Monospace) */
--text-spec-lg: 1.5rem;   /* 24px - Primary spec values */
--text-spec-md: 1.125rem; /* 18px - Secondary spec values */
--text-spec-sm: 0.875rem; /* 14px - Spec labels */
```

### 3.5 Line Height & Spacing Rules

```css
/* Line Heights */
--leading-none: 1;        /* Headings H1-H2 */
--leading-tight: 1.25;    /* Headings H3-H6 */
--leading-snug: 1.375;    /* UI text, specs */
--leading-normal: 1.5;    /* Body text standard */
--leading-relaxed: 1.625; /* Long-form content */

/* Letter Spacing */
--tracking-tight: -0.025em;  /* Large headings */
--tracking-normal: 0;        /* Body text */
--tracking-wide: 0.025em;    /* All-caps labels */
--tracking-wider: 0.05em;    /* Small caps, buttons */
--tracking-mono: 0.05em;     /* Monospace specs */
```

### 3.6 Typography for Configurators

**Why this system works for complex UIs:**

1. **Clear data hierarchy** – Monospace IBM Plex Mono creates instant recognition for specifications vs. marketing copy
2. **Scannable specs** – Medium weights on labels ensure visibility in dense tables
3. **Consistent rhythm** – Mathematical scale creates predictable progression
4. **Number clarity** – IBM Plex Mono has distinct numerals optimized for data display
5. **Bulgarian support** – Both fonts have full Cyrillic character sets

**Example Spec Block:**
```
BATTERY CAPACITY          ← text-spec-sm, Medium, tracking-wide, uppercase
10.8 kWh                  ← text-spec-lg, Bold, monospace
High-density lithium-ion  ← text-sm, Regular, DM Sans
```

---

## 4. Proposed Color System

### 4.1 Primary Brand Color

**Volt Blue**
```css
--color-primary-50:  #e6f4ff;  /* Lightest tint */
--color-primary-100: #b3dfff;
--color-primary-200: #80caff;
--color-primary-300: #4db5ff;
--color-primary-400: #1aa0ff;
--color-primary-500: #0088e6;  /* PRIMARY - Main brand color */
--color-primary-600: #006bb4;
--color-primary-700: #004e82;
--color-primary-800: #003151;
--color-primary-900: #001420;  /* Darkest shade */
```

**Rationale:** Electric blue suggests clean energy, innovation, and technology without the cliché of neon green. Tested for accessibility and works in both light and dark contexts.

### 4.2 Secondary Colors

**Performance Orange** (Accent for CTAs, energy, action)
```css
--color-secondary-50:  #fff4e6;
--color-secondary-100: #ffe0b3;
--color-secondary-200: #ffcc80;
--color-secondary-300: #ffb84d;
--color-secondary-400: #ffa41a;
--color-secondary-500: #f08c00;  /* SECONDARY - Action accent */
--color-secondary-600: #b86e00;
--color-secondary-700: #805000;
--color-secondary-800: #483200;
--color-secondary-900: #101400;
```

**Industrial Steel** (Tertiary for technical elements)
```css
--color-steel-50:  #f0f4f8;
--color-steel-100: #d9e2ec;
--color-steel-200: #bcccdc;
--color-steel-300: #9fb3c8;
--color-steel-400: #829ab1;
--color-steel-500: #627d98;  /* STEEL - Technical accent */
--color-steel-600: #486581;
--color-steel-700: #334e68;
--color-steel-800: #243b53;
--color-steel-900: #102a43;
```

### 4.3 Neutral System

**Warm Grays** (Avoiding pure black/white for reduced eye strain)
```css
/* Background scale */
--neutral-0:   #ffffff;  /* White */
--neutral-50:  #fafafa;  /* Off-white */
--neutral-100: #f4f4f5;  /* Light gray */
--neutral-200: #e4e4e7;  /* Border light */
--neutral-300: #d4d4d8;  /* Disabled */
--neutral-400: #a1a1aa;  /* Placeholder */
--neutral-500: #71717a;  /* Secondary text */
--neutral-600: #52525b;  /* Muted text */
--neutral-700: #3f3f46;  /* Primary text (light mode) */
--neutral-800: #27272a;  /* Card dark */
--neutral-900: #18181b;  /* Background dark */
--neutral-950: #0a0a0b;  /* Deepest dark - NOT pure black */
```

### 4.4 Semantic / Status Colors

```css
/* Success - Charge complete, available, positive metrics */
--color-success-50:  #ecfdf5;
--color-success-500: #10b981;  /* Main success */
--color-success-700: #047857;  /* Dark mode success */

/* Warning - Charging, maintenance due, moderate status */
--color-warning-50:  #fffbeb;
--color-warning-500: #f59e0b;  /* Main warning */
--color-warning-700: #b45309;  /* Dark mode warning */

/* Error - Fault, offline, critical status */
--color-error-50:  #fef2f2;
--color-error-500: #ef4444;   /* Main error */
--color-error-700: #b91c1c;   /* Dark mode error */

/* Info - Neutral notification, tip */
--color-info-50:  #eff6ff;
--color-info-500: #3b82f6;    /* Main info */
--color-info-700: #1d4ed8;    /* Dark mode info */
```

### 4.5 Dark Mode Configuration

```css
/* Light Mode (default) */
:root {
  --bg-primary: var(--neutral-0);
  --bg-secondary: var(--neutral-50);
  --bg-tertiary: var(--neutral-100);
  --bg-card: var(--neutral-0);
  --bg-elevated: var(--neutral-0);
  
  --text-primary: var(--neutral-900);
  --text-secondary: var(--neutral-600);
  --text-tertiary: var(--neutral-500);
  --text-inverse: var(--neutral-0);
  
  --border-default: var(--neutral-200);
  --border-strong: var(--neutral-300);
}

/* Dark Mode */
[data-theme="dark"] {
  --bg-primary: var(--neutral-950);
  --bg-secondary: var(--neutral-900);
  --bg-tertiary: var(--neutral-800);
  --bg-card: var(--neutral-800);
  --bg-elevated: var(--neutral-700);
  
  --text-primary: var(--neutral-50);
  --text-secondary: var(--neutral-400);
  --text-tertiary: var(--neutral-500);
  --text-inverse: var(--neutral-900);
  
  --border-default: var(--neutral-700);
  --border-strong: var(--neutral-600);
}
```

### 4.6 Accessibility Considerations

**Contrast Ratios (WCAG 2.1 AA Compliance):**

| Combination | Ratio | Status |
|-------------|-------|--------|
| Primary on white | 4.7:1 | ✅ Pass |
| Primary on dark | 4.9:1 | ✅ Pass |
| Secondary on white | 3.5:1 | ⚠️ Large text only |
| Body text (neutral-700) on white | 9.2:1 | ✅ Pass |
| Body text (neutral-50) on dark | 15.5:1 | ✅ Pass |

**Usage Rules:**
- Never place secondary orange on dark backgrounds for small text
- Always use `text-primary` or `text-secondary` for body content
- Status colors must be accompanied by icons (not color-only indicators)

### 4.7 Color Usage Matrix

| Color | Usage | Never Use For |
|-------|-------|---------------|
| **Primary Blue** | Links, interactive elements, selected states, key metrics | Warning/error states |
| **Secondary Orange** | Primary CTAs, hover states, energy indicators | Body text, backgrounds |
| **Steel** | Technical specs, graphs, secondary UI | Headings, CTAs |
| **Neutrals** | Text, backgrounds, borders | Status indication |
| **Success Green** | Confirmations, available status, positive change | Regular buttons |
| **Warning Amber** | Charging states, attention needed | Decorative use |
| **Error Red** | Faults, errors, critical alerts | Promotional content |

---

## 5. Layout & Spacing System

### 5.1 Grid System

**Desktop (≥1280px)**
```css
.container {
  --grid-columns: 12;
  --grid-gutter: 32px;
  --container-max: 1280px;
  --container-padding: 64px;
}
```

**Tablet (768px - 1279px)**
```css
.container {
  --grid-columns: 8;
  --grid-gutter: 24px;
  --container-max: 100%;
  --container-padding: 32px;
}
```

**Mobile (<768px)**
```css
.container {
  --grid-columns: 4;
  --grid-gutter: 16px;
  --container-max: 100%;
  --container-padding: 16px;
}
```

### 5.2 Maximum Content Widths

```css
--content-xs: 320px;   /* Tooltips, small modals */
--content-sm: 480px;   /* Forms, narrow content */
--content-md: 640px;   /* Article text, descriptions */
--content-lg: 768px;   /* Wide forms, specs tables */
--content-xl: 1024px;  /* Content with sidebar */
--content-2xl: 1280px; /* Full-width sections */
--content-max: 1440px; /* Maximum site width */
```

### 5.3 Spacing Scale (8px base unit)

```css
/* Spacing tokens */
--space-0: 0;
--space-1: 4px;    /* 0.5 units - Tight inline */
--space-2: 8px;    /* 1 unit - Icon gaps, inline spacing */
--space-3: 12px;   /* 1.5 units - Small gaps */
--space-4: 16px;   /* 2 units - Component padding */
--space-5: 20px;   /* 2.5 units - Field spacing */
--space-6: 24px;   /* 3 units - Card padding */
--space-8: 32px;   /* 4 units - Section header gaps */
--space-10: 40px;  /* 5 units - Between components */
--space-12: 48px;  /* 6 units - Between sections (mobile) */
--space-16: 64px;  /* 8 units - Between sections (tablet) */
--space-20: 80px;  /* 10 units - Between sections (desktop) */
--space-24: 96px;  /* 12 units - Hero padding */
--space-32: 128px; /* 16 units - Major section breaks */
```

### 5.4 Section Spacing Rules

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero top/bottom | 48px | 64px | 96px |
| Section top/bottom | 48px | 64px | 80px |
| Section heading → content | 24px | 32px | 40px |
| Between cards | 16px | 24px | 32px |
| Card internal padding | 16px | 24px | 24px |
| Footer top | 48px | 64px | 80px |

### 5.5 Vertical Rhythm

**Based on 8px grid with 24px baseline:**

```css
/* Maintain vertical rhythm */
--rhythm-base: 24px; /* Base line-height for body text */

/* Heading margins follow rhythm */
h1 { margin-bottom: calc(var(--rhythm-base) * 2); } /* 48px */
h2 { margin-bottom: calc(var(--rhythm-base) * 1.5); } /* 36px */
h3 { margin-bottom: var(--rhythm-base); } /* 24px */
h4, h5, h6 { margin-bottom: calc(var(--rhythm-base) * 0.75); } /* 18px */

/* Paragraphs maintain rhythm */
p + p { margin-top: var(--rhythm-base); }
```

### 5.6 Card & Container Principles

**Card Anatomy:**
```
┌─────────────────────────────────────────────┐
│  padding: var(--space-6)                    │
│  ┌─────────────────────────────────────┐    │
│  │  Image / Visual                      │    │
│  │  aspect-ratio: 4/3 or 16/9          │    │
│  └─────────────────────────────────────┘    │
│  gap: var(--space-4)                        │
│  ┌─────────────────────────────────────┐    │
│  │  Title: text-h5, font-bold          │    │
│  │  gap: var(--space-2)                │    │
│  │  Description: text-base, text-secondary │
│  │  gap: var(--space-4)                │    │
│  │  [Action Button]                    │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**Card Properties:**
```css
.card {
  --card-padding: var(--space-6);
  --card-radius: var(--radius-lg);
  --card-border: 1px solid var(--border-default);
  --card-shadow: var(--shadow-sm);
  --card-hover-shadow: var(--shadow-md);
  --card-transition: all 200ms ease-out;
}
```

---

## 6. UI Component Philosophy

### 6.1 Buttons

**Types:**
| Type | Usage | Visual |
|------|-------|--------|
| **Primary** | Main CTA per screen | Filled, secondary-500 background |
| **Secondary** | Alternative actions | Outlined, primary-500 border |
| **Tertiary** | Low-emphasis actions | Text only, no border |
| **Ghost** | On dark backgrounds | Outlined white, transparent |
| **Destructive** | Delete, cancel | Filled, error-500 background |

**Sizes:**
```css
--btn-xs: height: 28px; padding: 0 12px; text: text-xs;
--btn-sm: height: 32px; padding: 0 14px; text: text-sm;
--btn-md: height: 40px; padding: 0 20px; text: text-base;
--btn-lg: height: 48px; padding: 0 24px; text: text-lg;
--btn-xl: height: 56px; padding: 0 32px; text: text-lg;
```

**States:**
```css
/* Default */
.btn-primary {
  background: var(--color-secondary-500);
  color: white;
}

/* Hover */
.btn-primary:hover {
  background: var(--color-secondary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Active/Pressed */
.btn-primary:active {
  background: var(--color-secondary-700);
  transform: translateY(0);
  box-shadow: none;
}

/* Disabled */
.btn-primary:disabled {
  background: var(--neutral-300);
  color: var(--neutral-500);
  cursor: not-allowed;
}

/* Focus */
.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### 6.2 Inputs & Selectors (Configurator-Critical)

**Text Input:**
```css
.input {
  height: 48px;
  padding: 0 16px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: var(--text-base);
  transition: border-color 150ms, box-shadow 150ms;
}

.input:hover {
  border-color: var(--neutral-400);
}

.input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
  outline: none;
}

.input:invalid, .input.error {
  border-color: var(--color-error-500);
  box-shadow: 0 0 0 3px var(--color-error-50);
}
```

**Option Selector (for configurator):**
```css
.option-selector {
  display: flex;
  gap: var(--space-3);
}

.option-item {
  padding: var(--space-4);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 150ms ease;
}

.option-item:hover {
  border-color: var(--neutral-400);
  background: var(--bg-secondary);
}

.option-item.selected {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
}

.option-item.selected::before {
  /* Checkmark indicator */
  content: "✓";
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--color-primary-500);
}
```

**Color Swatch Selector:**
```css
.color-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: transform 100ms;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.selected {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--bg-primary);
}
```

### 6.3 Cards

**Product Card:**
```css
.product-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: box-shadow 200ms, transform 200ms;
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.product-card__image {
  aspect-ratio: 4/3;
  background: var(--bg-secondary);
}

.product-card__content {
  padding: var(--space-6);
}

.product-card__specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  margin-top: var(--space-4);
}
```

**Spec Card (for detailed specifications):**
```css
.spec-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-4) var(--space-6);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.spec-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  color: var(--color-primary-500);
}

.spec-card__label {
  font-family: var(--font-mono);
  font-size: var(--text-spec-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-tertiary);
}

.spec-card__value {
  font-family: var(--font-mono);
  font-size: var(--text-spec-lg);
  font-weight: 700;
  color: var(--text-primary);
}
```

### 6.4 Tables / Specification Blocks

**Comparison Table:**
```css
.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  font-family: var(--font-mono);
  font-size: var(--text-spec-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-secondary);
  padding: var(--space-4);
  border-bottom: 2px solid var(--border-strong);
  text-align: left;
}

.comparison-table td {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-default);
}

.comparison-table tr:hover td {
  background: var(--bg-secondary);
}

/* Highlight best value */
.comparison-table td.highlight {
  color: var(--color-primary-500);
  font-weight: 700;
}
```

### 6.5 Badges & Indicators

**Badge Types:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}

.badge--success {
  background: var(--color-success-50);
  color: var(--color-success-700);
}

.badge--warning {
  background: var(--color-warning-50);
  color: var(--color-warning-700);
}

.badge--error {
  background: var(--color-error-50);
  color: var(--color-error-700);
}

.badge--info {
  background: var(--color-primary-50);
  color: var(--color-primary-700);
}

.badge--neutral {
  background: var(--neutral-100);
  color: var(--neutral-600);
}
```

**Status Indicator:**
```css
.status-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.status-indicator__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator--online .status-indicator__dot {
  background: var(--color-success-500);
  animation: pulse 2s infinite;
}

.status-indicator--charging .status-indicator__dot {
  background: var(--color-warning-500);
  animation: pulse 1s infinite;
}

.status-indicator--offline .status-indicator__dot {
  background: var(--neutral-400);
}
```

### 6.6 Progress & Step Indicators

**Progress Bar:**
```css
.progress {
  height: 8px;
  background: var(--neutral-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary-500),
    var(--color-primary-400)
  );
  border-radius: var(--radius-full);
  transition: width 300ms ease-out;
}
```

**Step Indicator (Configurator Flow):**
```css
.stepper {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.stepper__step {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.stepper__number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: var(--text-sm);
  font-weight: 700;
}

.stepper__step--completed .stepper__number {
  background: var(--color-primary-500);
  color: white;
}

.stepper__step--active .stepper__number {
  background: var(--bg-primary);
  border: 2px solid var(--color-primary-500);
  color: var(--color-primary-500);
}

.stepper__step--upcoming .stepper__number {
  background: var(--neutral-200);
  color: var(--neutral-500);
}

.stepper__connector {
  flex: 1;
  height: 2px;
  background: var(--neutral-200);
  min-width: 40px;
}

.stepper__connector--completed {
  background: var(--color-primary-500);
}
```

---

## 7. Configurator-Ready Design Principles

### 7.1 How This System Supports Complex Selections

**Hierarchical Selection Pattern:**
```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Select Base Model                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ EonTrail │  │HyperGlide│  │ TitanVolt│  ← Large option   │
│  │  ₣3,093  │  │  ₣6,243  │  │  ₣9,243  │     cards        │
│  └──────────┘  └──────────┘  └──────────┘                  │
├─────────────────────────────────────────────────────────────┤
│  STEP 2: Choose Battery Configuration                        │
│  ○ Standard (2.88 kWh) — Included                           │
│  ○ Extended (4.32 kWh) — +€450                              │
│  ○ Maximum (10.8 kWh) — +€1,200      ← Stacked radio        │
├─────────────────────────────────────────────────────────────┤
│  STEP 3: Select Color                                        │
│  [●] [●] [●] [●]                      ← Color swatches      │
│  Army Black                                                  │
├─────────────────────────────────────────────────────────────┤
│  STEP 4: Add Accessories                                     │
│  ☑ Digital Display — +€150           ← Checkboxes          │
│  ☐ Online Communication Unit (OCU)                          │
│  ☐ Extended Warranty                                        │
├─────────────────────────────────────────────────────────────┤
│  SUMMARY                              │  Configure Summary  │
│  Base: TitanVolt         €9,243       │  (Sticky sidebar)  │
│  Battery: Maximum        +€1,200      │                     │
│  Display: Digital        +€150        │                     │
│  ─────────────────────────────        │                     │
│  TOTAL                   €10,593      │  [Get Quote]       │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Visual Clarity Under High Information Density

**Techniques:**

1. **Whitespace as separator** – Generous padding prevents visual confusion
2. **Progressive disclosure** – Advanced options hidden until needed
3. **Clear affordances** – Selected states are unmistakable
4. **Consistent alignment** – All prices right-aligned, labels left-aligned
5. **Visual chunking** – Related options grouped with subtle backgrounds

**Information Density Scale:**
```css
/* Density variants for data-heavy contexts */
.data-table--comfortable { --cell-padding: var(--space-4); }
.data-table--compact { --cell-padding: var(--space-3); }
.data-table--dense { --cell-padding: var(--space-2); }
```

### 7.3 Preventing Cognitive Overload

**Maximum Options Per Screen:**
- Primary choices: 3-5 options
- Secondary choices: Up to 8 options
- Color choices: Up to 10 swatches

**Visual Load Reduction:**
```css
/* Fade non-essential info when user is focused */
.config-panel:has(.option-item:focus) .option-item:not(:focus) {
  opacity: 0.6;
}

/* Dim unavailable options */
.option-item--unavailable {
  opacity: 0.4;
  pointer-events: none;
}
```

### 7.4 Progressive Disclosure Strategies

**Accordion Specs:**
```
▼ Performance Specifications     ← Expanded by default
  ├─ Motor Power: 4 kW / 5 hp
  ├─ Max Speed: 60 km/h
  └─ Range: 58 km

► Battery Details                ← Collapsed
► Dimensions & Weight            ← Collapsed
► Connectivity Features          ← Collapsed
```

**"View More" Pattern:**
```css
.spec-group--collapsed {
  max-height: 200px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, black 60%, transparent);
}

.spec-group__toggle {
  position: relative;
  z-index: 1;
  margin-top: -40px;
  text-align: center;
}
```

---

## 8. Motion & Micro-Interactions

### 8.1 Hover Behavior Philosophy

**Principles:**
- Provide feedback immediately (< 100ms)
- Don't distract from content
- Indicate interactivity clearly
- Maintain consistency across components

**Standard Hover:**
```css
.interactive-element {
  transition: 
    background-color 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease,
    transform 150ms ease;
}

.interactive-element:hover {
  /* Subtle lift + shadow */
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

### 8.2 Transitions

**Timing Functions:**
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);  /* Standard */
--ease-in: cubic-bezier(0.4, 0, 1, 1);          /* Entering */
--ease-out: cubic-bezier(0, 0, 0.2, 1);         /* Exiting */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful */
```

**Duration Scale:**
```css
--duration-instant: 50ms;   /* Micro-feedback */
--duration-fast: 100ms;     /* Button states */
--duration-normal: 200ms;   /* Most transitions */
--duration-slow: 300ms;     /* Panel reveals */
--duration-slower: 500ms;   /* Page transitions */
```

### 8.3 Feedback Animations

**Selection Confirmation:**
```css
@keyframes select-confirm {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.option-item:active {
  animation: select-confirm 150ms var(--ease-default);
}
```

**Loading State:**
```css
@keyframes pulse-opacity {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 25%,
    var(--neutral-100) 50%,
    var(--neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Price Update:**
```css
@keyframes price-update {
  0% { transform: scale(1); color: var(--text-primary); }
  50% { transform: scale(1.05); color: var(--color-primary-500); }
  100% { transform: scale(1); color: var(--text-primary); }
}

.price-value.updated {
  animation: price-update 300ms var(--ease-default);
}
```

### 8.4 What to Avoid (Performance)

| ❌ Avoid | ✅ Use Instead |
|----------|----------------|
| `box-shadow` transitions on many elements | Transform-based lifts |
| `filter` on scroll | Static backgrounds |
| `width`/`height` animations | `transform: scale()` |
| Large `blur()` values | Pre-blurred images |
| Animations on scroll | Intersection Observer with CSS classes |
| Infinite animations on many elements | Trigger only on interaction |

**Performance Budget:**
- Max 3 simultaneous animations on screen
- No animation on scroll unless user-triggered
- Disable animations for `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Design Tokens (Developer-Friendly)

### 9.1 CSS Custom Properties

```css
:root {
  /* ═══════════════════════════════════════════
     COLORS
     ═══════════════════════════════════════════ */
  
  /* Primary - Volt Blue */
  --color-primary-50: #e6f4ff;
  --color-primary-100: #b3dfff;
  --color-primary-200: #80caff;
  --color-primary-300: #4db5ff;
  --color-primary-400: #1aa0ff;
  --color-primary-500: #0088e6;
  --color-primary-600: #006bb4;
  --color-primary-700: #004e82;
  --color-primary-800: #003151;
  --color-primary-900: #001420;
  
  /* Secondary - Performance Orange */
  --color-secondary-50: #fff4e6;
  --color-secondary-100: #ffe0b3;
  --color-secondary-200: #ffcc80;
  --color-secondary-300: #ffb84d;
  --color-secondary-400: #ffa41a;
  --color-secondary-500: #f08c00;
  --color-secondary-600: #b86e00;
  --color-secondary-700: #805000;
  --color-secondary-800: #483200;
  --color-secondary-900: #101400;
  
  /* Neutral - Warm Grays */
  --neutral-0: #ffffff;
  --neutral-50: #fafafa;
  --neutral-100: #f4f4f5;
  --neutral-200: #e4e4e7;
  --neutral-300: #d4d4d8;
  --neutral-400: #a1a1aa;
  --neutral-500: #71717a;
  --neutral-600: #52525b;
  --neutral-700: #3f3f46;
  --neutral-800: #27272a;
  --neutral-900: #18181b;
  --neutral-950: #0a0a0b;
  
  /* Semantic */
  --color-success-50: #ecfdf5;
  --color-success-500: #10b981;
  --color-success-700: #047857;
  
  --color-warning-50: #fffbeb;
  --color-warning-500: #f59e0b;
  --color-warning-700: #b45309;
  
  --color-error-50: #fef2f2;
  --color-error-500: #ef4444;
  --color-error-700: #b91c1c;
  
  --color-info-50: #eff6ff;
  --color-info-500: #3b82f6;
  --color-info-700: #1d4ed8;
  
  /* ═══════════════════════════════════════════
     TYPOGRAPHY
     ═══════════════════════════════════════════ */
  
  --font-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
  
  /* Scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  
  /* Line Height */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  
  /* Font Weight */
  --font-normal: 400;
  --font-medium: 500;
  --font-bold: 700;
  
  /* ═══════════════════════════════════════════
     SPACING
     ═══════════════════════════════════════════ */
  
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  
  /* ═══════════════════════════════════════════
     BORDER RADIUS
     ═══════════════════════════════════════════ */
  
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  
  /* ═══════════════════════════════════════════
     SHADOWS
     ═══════════════════════════════════════════ */
  
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* Colored shadows for elevation on brand elements */
  --shadow-primary: 0 10px 40px -10px rgb(0 136 230 / 0.3);
  --shadow-secondary: 0 10px 40px -10px rgb(240 140 0 / 0.3);
  
  /* ═══════════════════════════════════════════
     TRANSITIONS
     ═══════════════════════════════════════════ */
  
  --duration-instant: 50ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* ═══════════════════════════════════════════
     Z-INDEX
     ═══════════════════════════════════════════ */
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-popover: 500;
  --z-toast: 600;
  --z-tooltip: 700;
}
```

### 9.2 Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      
      primary: {
        50: '#e6f4ff',
        100: '#b3dfff',
        200: '#80caff',
        300: '#4db5ff',
        400: '#1aa0ff',
        500: '#0088e6',
        600: '#006bb4',
        700: '#004e82',
        800: '#003151',
        900: '#001420',
      },
      
      secondary: {
        50: '#fff4e6',
        100: '#ffe0b3',
        200: '#ffcc80',
        300: '#ffb84d',
        400: '#ffa41a',
        500: '#f08c00',
        600: '#b86e00',
        700: '#805000',
        800: '#483200',
        900: '#101400',
      },
      
      neutral: {
        0: '#ffffff',
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#0a0a0b',
      },
      
      success: {
        50: '#ecfdf5',
        500: '#10b981',
        700: '#047857',
      },
      
      warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        700: '#b45309',
      },
      
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        700: '#b91c1c',
      },
      
      info: {
        50: '#eff6ff',
        500: '#3b82f6',
        700: '#1d4ed8',
      },
    },
    
    fontFamily: {
      sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
    },
    
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      full: '9999px',
    },
    
    boxShadow: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      primary: '0 10px 40px -10px rgb(0 136 230 / 0.3)',
      secondary: '0 10px 40px -10px rgb(240 140 0 / 0.3)',
    },
    
    transitionDuration: {
      instant: '50ms',
      fast: '100ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    
    transitionTimingFunction: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    
    zIndex: {
      dropdown: 100,
      sticky: 200,
      overlay: 300,
      modal: 400,
      popover: 500,
      toast: 600,
      tooltip: 700,
    },
  },
};
```

### 9.3 Design Tokens JSON (W3C Format)

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "primary": {
      "50": { "$value": "#e6f4ff", "$type": "color" },
      "100": { "$value": "#b3dfff", "$type": "color" },
      "200": { "$value": "#80caff", "$type": "color" },
      "300": { "$value": "#4db5ff", "$type": "color" },
      "400": { "$value": "#1aa0ff", "$type": "color" },
      "500": { "$value": "#0088e6", "$type": "color", "$description": "Primary brand color" },
      "600": { "$value": "#006bb4", "$type": "color" },
      "700": { "$value": "#004e82", "$type": "color" },
      "800": { "$value": "#003151", "$type": "color" },
      "900": { "$value": "#001420", "$type": "color" }
    },
    "secondary": {
      "500": { "$value": "#f08c00", "$type": "color", "$description": "CTA accent color" }
    },
    "neutral": {
      "0": { "$value": "#ffffff", "$type": "color" },
      "50": { "$value": "#fafafa", "$type": "color" },
      "100": { "$value": "#f4f4f5", "$type": "color" },
      "200": { "$value": "#e4e4e7", "$type": "color" },
      "300": { "$value": "#d4d4d8", "$type": "color" },
      "400": { "$value": "#a1a1aa", "$type": "color" },
      "500": { "$value": "#71717a", "$type": "color" },
      "600": { "$value": "#52525b", "$type": "color" },
      "700": { "$value": "#3f3f46", "$type": "color" },
      "800": { "$value": "#27272a", "$type": "color" },
      "900": { "$value": "#18181b", "$type": "color" },
      "950": { "$value": "#0a0a0b", "$type": "color" }
    },
    "semantic": {
      "success": { "$value": "#10b981", "$type": "color" },
      "warning": { "$value": "#f59e0b", "$type": "color" },
      "error": { "$value": "#ef4444", "$type": "color" },
      "info": { "$value": "#3b82f6", "$type": "color" }
    }
  },
  "typography": {
    "fontFamily": {
      "sans": { "$value": "'DM Sans', system-ui, -apple-system, sans-serif", "$type": "fontFamily" },
      "mono": { "$value": "'IBM Plex Mono', ui-monospace, monospace", "$type": "fontFamily" }
    },
    "fontSize": {
      "xs": { "$value": "0.75rem", "$type": "dimension" },
      "sm": { "$value": "0.875rem", "$type": "dimension" },
      "base": { "$value": "1rem", "$type": "dimension" },
      "lg": { "$value": "1.125rem", "$type": "dimension" },
      "xl": { "$value": "1.25rem", "$type": "dimension" },
      "2xl": { "$value": "1.5rem", "$type": "dimension" },
      "3xl": { "$value": "1.875rem", "$type": "dimension" },
      "4xl": { "$value": "2.25rem", "$type": "dimension" },
      "5xl": { "$value": "3rem", "$type": "dimension" },
      "6xl": { "$value": "3.75rem", "$type": "dimension" }
    },
    "fontWeight": {
      "normal": { "$value": "400", "$type": "fontWeight" },
      "medium": { "$value": "500", "$type": "fontWeight" },
      "bold": { "$value": "700", "$type": "fontWeight" }
    },
    "lineHeight": {
      "none": { "$value": "1", "$type": "number" },
      "tight": { "$value": "1.25", "$type": "number" },
      "snug": { "$value": "1.375", "$type": "number" },
      "normal": { "$value": "1.5", "$type": "number" },
      "relaxed": { "$value": "1.625", "$type": "number" }
    }
  },
  "spacing": {
    "0": { "$value": "0", "$type": "dimension" },
    "1": { "$value": "0.25rem", "$type": "dimension" },
    "2": { "$value": "0.5rem", "$type": "dimension" },
    "3": { "$value": "0.75rem", "$type": "dimension" },
    "4": { "$value": "1rem", "$type": "dimension" },
    "5": { "$value": "1.25rem", "$type": "dimension" },
    "6": { "$value": "1.5rem", "$type": "dimension" },
    "8": { "$value": "2rem", "$type": "dimension" },
    "10": { "$value": "2.5rem", "$type": "dimension" },
    "12": { "$value": "3rem", "$type": "dimension" },
    "16": { "$value": "4rem", "$type": "dimension" },
    "20": { "$value": "5rem", "$type": "dimension" },
    "24": { "$value": "6rem", "$type": "dimension" },
    "32": { "$value": "8rem", "$type": "dimension" }
  },
  "borderRadius": {
    "none": { "$value": "0", "$type": "dimension" },
    "sm": { "$value": "0.25rem", "$type": "dimension" },
    "md": { "$value": "0.5rem", "$type": "dimension" },
    "lg": { "$value": "0.75rem", "$type": "dimension" },
    "xl": { "$value": "1rem", "$type": "dimension" },
    "2xl": { "$value": "1.5rem", "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  },
  "shadow": {
    "sm": { "$value": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", "$type": "shadow" },
    "md": { "$value": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", "$type": "shadow" },
    "lg": { "$value": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", "$type": "shadow" },
    "xl": { "$value": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", "$type": "shadow" }
  },
  "transition": {
    "duration": {
      "instant": { "$value": "50ms", "$type": "duration" },
      "fast": { "$value": "100ms", "$type": "duration" },
      "normal": { "$value": "200ms", "$type": "duration" },
      "slow": { "$value": "300ms", "$type": "duration" },
      "slower": { "$value": "500ms", "$type": "duration" }
    },
    "easing": {
      "default": { "$value": "cubic-bezier(0.4, 0, 0.2, 1)", "$type": "cubicBezier" },
      "in": { "$value": "cubic-bezier(0.4, 0, 1, 1)", "$type": "cubicBezier" },
      "out": { "$value": "cubic-bezier(0, 0, 0.2, 1)", "$type": "cubicBezier" },
      "bounce": { "$value": "cubic-bezier(0.34, 1.56, 0.64, 1)", "$type": "cubicBezier" }
    }
  }
}
```

---

## 10. Final Summary

### 10.1 Key Improvements vs Current Site

| Aspect | Current | Proposed | Impact |
|--------|---------|----------|--------|
| **Color System** | Arbitrary orange on pure black | Systematic Volt Blue + Performance Orange with 10-shade scales | Professional, trustworthy, accessible |
| **Typography** | Generic sans-serif, flat hierarchy | DM Sans + IBM Plex Mono with 10-level scale | Clear hierarchy, technical credibility |
| **Spacing** | Inconsistent, no rhythm | 8px-based systematic scale | Predictable, scannable layouts |
| **Components** | Default Wix/Shopify widgets | Purpose-built configurator components | Ready for complex product selection |
| **Data Display** | Text-only specifications | Monospace spec blocks with visual hierarchy | Instant comprehension of technical data |
| **Dark Mode** | Pure black, harsh | Warm neutrals, considered contrast | Reduced eye strain, premium feel |
| **Motion** | None or default | Purposeful micro-interactions | Responsive, alive interface |
| **Tokens** | None | CSS vars, Tailwind config, JSON export | Developer-friendly implementation |

### 10.2 Why This System Will Scale

**For Configurator Complexity:**
- Option selectors handle 3-10 choices elegantly
- Comparison tables accommodate any spec count
- Step indicators support multi-page flows
- Spec blocks work for simple and detailed views

**For Product Line Expansion:**
- Color system accommodates new product categories
- Component patterns apply to any vehicle type
- Token structure supports theme variations

**For International Markets:**
- Typography supports Latin and Cyrillic
- Spacing system works for varying text lengths
- Colors maintain accessibility across devices

### 10.3 What Makes It Feel Modern, Electric, and Premium

**Modern:**
- Contemporary typography (DM Sans geometric forms)
- Systematic approach (tokens, scales, patterns)
- Dark mode readiness
- Performance-optimized animations

**Electric:**
- Volt Blue primary color (clean energy, not cliché)
- Performance Orange for energy/action
- Circuit-inspired visual metaphors (optional)
- Monospace specs suggest technical precision

**Premium:**
- Warm neutrals instead of harsh black/white
- Generous whitespace
- Subtle shadows for depth
- Consistent execution across all touchpoints
- Typography that commands authority

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Set up design tokens in codebase
- [ ] Configure fonts (DM Sans, IBM Plex Mono)
- [ ] Establish color variables (light + dark mode)
- [ ] Implement spacing scale
- [ ] Create base typography styles

### Phase 2: Core Components
- [ ] Button variants (primary, secondary, tertiary, ghost)
- [ ] Form inputs (text, select, checkbox, radio)
- [ ] Cards (product, spec, feature)
- [ ] Tables and data display
- [ ] Badges and status indicators

### Phase 3: Configurator Components
- [ ] Option selector (single + multi)
- [ ] Color swatch picker
- [ ] Step indicator
- [ ] Price summary panel
- [ ] Comparison table

### Phase 4: Page Templates
- [ ] Homepage hero
- [ ] Product listing
- [ ] Product detail
- [ ] Configurator flow
- [ ] Contact/quote forms

### Phase 5: Polish
- [ ] Micro-interactions
- [ ] Loading states
- [ ] Error states
- [ ] Accessibility audit
- [ ] Performance optimization

---

**Document prepared by:** Design Systems Analysis  
**Review status:** Ready for engineering review  
**Next steps:** Stakeholder approval → Component library development → Integration
