# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Rollup watch mode for local development
npm run build        # Clean dist/ and build CJS + ESM outputs
npm run clean        # Remove dist/
```

## Build Output

Rollup produces three artifacts in `dist/`:
- `index.cjs` — CommonJS bundle
- `index.js` — ESM bundle
- `index.d.ts` — Bundled type declarations (via rollup-plugin-dts)

React, react-hook-form, react-router-dom, GSAP, and Luxon are external (peer dependencies, not bundled).

## Architecture

### Component Organization

Components live under `src/components/`, grouped by category. Each variation gets its own subfolder:

```
src/components/
├── provider/       # ThemeProvider + ThemeContext
├── button/
│   └── variations/ # fill-out/, link/, light/, download/
├── form/           # Form.tsx wraps react-hook-form; 9 input types via FieldConfig[]
├── animation/      # GSAP-based timeline, text, and state animators
├── svg/            # SvgDraw, SvgMorph animation utilities
├── carousel/       # BasicCarousel with pluggable indicator/toggle components
├── dialog/         # Modal dialog
├── tab/            # TabMenu
└── interaction/    # FlippingCard and similar interactive components
src/hooks/
└── useIsMobile.ts  # Responsive breakpoint hook
```

`src/index.ts` is the public entry point — everything exported here becomes part of the library API.

### Theme System

The theme is runtime-switchable (not compile-time). The flow:

1. `ThemeProvider` wraps the app and exposes `useTheme()` → `{ theme, setTheme }`
2. On mount, `themeToCSSVariables()` injects the full theme as CSS custom properties on `:root`
3. Components consume `var(--colors-*)`, `var(--spacing-*)`, etc. in their CSS modules
4. `theme.style` toggles between `'classic'` (gradient + border) and `'morphism'` (glassmorphism + `backdrop-filter`) — components branch on this at render time

Theme tokens: colors (neutral 8-shade scale, accent, action, status), typography (Inter font, 6 sizes xs–xxl), spacing (6 scales, 4px–128px), border-radius, motion (duration + easing), z-index, and shadows.

### Styling Conventions

- **CSS Modules** (`.module.css`) colocated with each component
- CSS custom properties from the theme are consumed directly in modules (e.g., `var(--colors-action-primary)`)
- Class composition via filtered array join: `[styles.base, condition && styles.modifier].filter(Boolean).join(' ')`
- `ComponentSize` (`'xs' | 'sm' | 'md' | 'lg' | 'xl'`) is used consistently across components
- CSS `@property` is used for animatable custom properties in some components

### Component Pattern

```typescript
// Props extend HTML attributes
interface FooProps extends React.HTMLAttributes<HTMLElement> {
  size?: ComponentSize
  // ...
}

// Hooks handle internal state and class composition
// useTheme() for style branching (classic vs morphism)
// Colocated hooks/ subfolder per component category
```

### TypeScript

Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`. CSS module types are declared globally in `global.d.ts`.