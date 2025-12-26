# Align Styling Config to Design System

## Overview

Align the actual CSS configuration in `globals.css` and `components.json` to match the design system documentation in `docs/design-system.md`. The design system is the source of truth.

## Current State Analysis

| Setting | Design System (Truth) | Actual Config | Action |
|---------|----------------------|---------------|--------|
| Border radius | 0px | `--radius: 0.625rem` | Change to 0 |
| Dark background | #000000 | `oklch(0.145 0 0)` (~#242424) | Change to pure black |
| Shadow tokens | 5 defined | None | Add to globals.css |
| ShadCN base color | zinc | neutral | Change to zinc |

### Key Discoveries

- `--radius` variable exists but is **not used** - all components already use `rounded-none` explicitly (`src/components/ui/Button.tsx:21-27`)
- Dark background change affects 9 components via `bg-background` semantic class
- Zero shadow usage in components currently - tokens are for future dropdowns/modals/toasts
- ShadCN "neutral" and "zinc" are nearly identical but docs specify zinc

## Desired End State

After implementation:
1. `--radius` set to `0` in globals.css
2. Dark mode `--background` is pure black `oklch(0 0 0)`
3. Shadow CSS variables defined and available for use
4. ShadCN configured with "zinc" base color
5. All changes verified via dev server

## What We're NOT Doing

- Updating design-system.md to use OKLCH format (config aligns to docs, not vice versa)
- Adding shadow classes to existing components (tokens only)
- Modifying any component files (only config changes)

## Implementation Approach

Single-phase approach since all changes are in config files with no dependencies between them.

---

## Phase 1: Config Alignment

### Overview

Update globals.css and components.json to match design system specifications.

### Changes Required

#### 1. Border Radius - Set to Zero

**File**: `src/app/globals.css:9`

**Current**:
```css
--radius: 0.625rem;
```

**Change to**:
```css
--radius: 0;
```

Note: The derived radius variables (`--radius-sm`, `--radius-md`, etc.) at lines 75-78 will automatically compute to 0 or negative values, which is fine since they're unused.

#### 2. Dark Mode Background - Pure Black

**File**: `src/app/globals.css:224`

**Current**:
```css
.dark {
  --background: oklch(0.145 0 0);
```

**Change to**:
```css
.dark {
  --background: oklch(0 0 0);
```

#### 3. Add Shadow Tokens

**File**: `src/app/globals.css`

**Add after line 38** (after `--sidebar-ring` in `:root`):

```css
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-card-hover: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04);
```

**Add after line 254** (after `--sidebar-ring` in `.dark`):

```css
  /* Shadows - darker for dark mode (only 3 specified in design system) */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-card-hover: 0 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.5);
```

Note: Design system only specifies dark mode overrides for card, card-hover, and lg shadows. The sm and xl shadows will inherit light mode values in dark mode.

**Add to `@theme inline` block** (after line 78, before closing brace):

```css
  --shadow-sm: var(--shadow-sm);
  --shadow-card: var(--shadow-card);
  --shadow-card-hover: var(--shadow-card-hover);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
```

#### 4. ShadCN Base Color - Change to Zinc

**File**: `components.json:9`

**Current**:
```json
"baseColor": "neutral",
```

**Change to**:
```json
"baseColor": "zinc",
```

### Success Criteria

#### Automated Verification:
- [x] Dev server starts without errors: `pnpm dev`
- [x] TypeScript compiles: `pnpm build`
- [ ] No CSS parsing errors in browser console

#### Manual Verification:
- [ ] Dark mode background is visibly pure black (not dark gray)
- [ ] All existing components still render correctly
- [ ] No visual regressions on landing page sections

**Implementation Note**: After completing this phase, run the dev server and toggle dark mode to verify the background change is visible.

---

## Testing Strategy

### Automated:
- Build succeeds (`pnpm build`)
- Dev server runs (`pnpm dev`)

### Manual:
1. Open landing page in browser
2. Toggle to dark mode
3. Verify background is pure black
4. Scroll through all sections to check for visual issues
5. Toggle back to light mode to verify no regressions

## References

- Design system: `docs/design-system.md:146-181` (CSS variables)
- Design system: `docs/design-system.md:342-354` (shadow tokens)
- Research: `thoughts/shared/research/2025-12-26-styling-config-vs-design-system.md`
- Current globals.css: `src/app/globals.css`
- ShadCN config: `components.json`
