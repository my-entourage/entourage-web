---
date: 2025-12-26T12:00:00-08:00
researcher: Claude
git_commit: c633a82fff76f3c04504ec1f8a64e8939114f488
branch: feat/design-system
repository: entourage-web
topic: "Landing Page Redesign - Current State vs Plan"
tags: [research, landing-page, design-system, phase-status]
status: complete
last_updated: 2025-12-26
last_updated_by: Claude
---

# Research: Landing Page Redesign - Current State vs Plan

**Date**: 2025-12-26T12:00:00-08:00
**Researcher**: Claude
**Git Commit**: c633a82fff76f3c04504ec1f8a64e8939114f488
**Branch**: feat/design-system
**Repository**: entourage-web

## Research Question

What is the current state of the 8-phase landing page redesign? The handoff document indicates we're stuck at Phase 5, but what's actually implemented?

## Summary

The handoff document is **out of date**. Here's the actual status:

| Phase | Description | Handoff Says | Actual Status |
|-------|-------------|--------------|---------------|
| 1 | Navbar Animation | Completed | **Completed** - Header.tsx uses scale transform |
| 2 | RippleGrid Interaction | Completed | **N/A** - RippleGrid was removed/never existed |
| 3 | TeamCredentialsSection | Completed | **Completed** - Pure CSS animations, speed=5 |
| 4 | FlowSection Logo | Completed | **Completed** - LogoMark with proper styling |
| 5 | Company Icons | Pending | **ALREADY DONE** - Icons present in IntegrationsSection |
| 6 | BentoFeatures | Pending | **Not Started** - Component doesn't exist |
| 7 | FAQ Accordion | Pending | **Not Started** - Component doesn't exist |
| 8 | Reorder Sections | Pending | **Not Started** - Still old order |

**Key Finding**: Phase 5 is already complete. The next real work is **Phase 6 (BentoFeatures)**.

## Detailed Findings

### Phase 1 - Navbar Animation (COMPLETE)

**File**: `src/components/Header.tsx:30-39`

The Header component uses Framer Motion's scale transform:
```tsx
animate={{
  scale: isScrolled ? 0.85 : 1,
}}
transition={{
  duration: 0.3,
  ease: [0.32, 0.72, 0, 1],
}}
```

- Transform origin set to `"center top"` (line 38)
- No separate height/width/maxWidth animations
- Border and background handled via CSS transitions

### Phase 2 - RippleGrid (NOT APPLICABLE)

**Finding**: `RippleGrid.tsx` does not exist in the codebase.

The Hero component (`src/components/Hero.tsx`) uses a simple design:
- Dashed border box with plus corners (lines 44-51)
- No grid/ripple background
- PlusCorner helper component for consistency

This phase may have been superseded by the simpler Hero design. The commit `c5c62a1` removed deprecated components including `BlueprintGrid.tsx` (similar concept).

### Phase 3 - TeamCredentialsSection (COMPLETE)

**Files**:
- `src/components/TeamCredentialsSection.tsx`
- `src/components/ui/InfiniteSlider.tsx`

InfiniteSlider was rewritten to use pure CSS animations:
- No Framer Motion (removed glitching issue)
- Uses `animate-scroll` and `animate-scroll-reverse` CSS classes
- Speed formula: `effectiveDuration = 100 / speed`

TeamCredentialsSection uses:
- `speed={5}` (line 52) = 20 second duration
- Real company logos from `/logos/` directory
- Grayscale with hover color effect

### Phase 4 - FlowSection Logo (COMPLETE)

**File**: `src/components/FlowSection.tsx:131-139`

The center logo section uses LogoMark directly:
```tsx
<div className="relative z-10 flex flex-col items-center">
  <LogoMark size={48} className="text-black dark:text-white" />
  <span className="mt-3 text-sm font-semibold text-black dark:text-white">
    Entourage
  </span>
  ...
</div>
```

- No black box wrapper
- Proper dark mode support via className
- Pulse rings animate around the logo

### Phase 5 - Company Icons (ALREADY COMPLETE)

**File**: `src/components/IntegrationsSection.tsx`

Despite the handoff marking this as pending, the component already uses icons:

**Top Row Icons** (lines 196-220):
- Linear: `simple-icons:linear`
- Slack: `simple-icons:slack`
- Google Drive: `simple-icons:googledrive`
- Gmail: `mdi:gmail`
- WhatsApp: `simple-icons:whatsapp`

**Bottom Row Icons** (lines 228-262):
- Outlook: `simple-icons:microsoftoutlook`
- Notion: `simple-icons:notion`
- ChatGPT: `simple-icons:openai`
- Fireflies: `/icons/fireflies.svg`
- Granola: `/icons/granola.svg`

**Center Logo** (lines 266-299):
- LogoMark at 22px size
- "ENTOURAGE" text label
- Dotted border with plus corner decorations

### Phase 6 - BentoFeatures (NOT STARTED)

**Finding**: `BentoFeatures.tsx` does not exist.

Current page structure still uses separate sections:
- `IntegrationsSection` - Circuit board visualization
- `DataFolderSection` - Data vault feature
- `ValueProps` - Feature highlights

These would need to be consolidated into a bento grid layout.

### Phase 7 - FAQ Accordion (NOT STARTED)

**Finding**: Neither `FAQ.tsx` nor `src/components/ui/accordion.tsx` exist.

Would need to:
1. Install shadcn accordion: `pnpm dlx shadcn@canary add accordion`
2. Create FAQ component with questions/answers

### Phase 8 - Section Reordering (NOT STARTED)

**File**: `src/app/page.tsx`

**Current order**:
1. Header
2. Hero
3. TeamCredentialsSection
4. IntegrationsSection
5. FlowSection
6. DataFolderSection
7. ValueProps
8. SecondaryCTA
9. Footer

**Desired order**:
1. Header
2. Hero
3. TeamCredentialsSection
4. FlowSection
5. BentoFeatures (new - replaces Integrations/DataFolder/ValueProps)
6. FAQ (new)
7. SecondaryCTA
8. Footer

## Code References

- `src/components/Header.tsx:30-39` - Scale animation implementation
- `src/components/Hero.tsx` - Simple dashed box design (no RippleGrid)
- `src/components/ui/InfiniteSlider.tsx` - Pure CSS scroll animation
- `src/components/TeamCredentialsSection.tsx:52` - Speed parameter
- `src/components/FlowSection.tsx:131-139` - LogoMark center display
- `src/components/IntegrationsSection.tsx:192-299` - Icon badges and center logo
- `src/app/page.tsx:1-24` - Current section order

## Architecture Documentation

### Component Organization
- Main sections in `src/components/`
- UI primitives in `src/components/ui/`
- ShadCN components (read-only) in `src/components/ui/`
- Custom wrappers created for brand customization

### Animation Patterns
- Framer Motion for complex transforms (Header, FlowSection pulse rings)
- Pure CSS for infinite loops (InfiniteSlider)
- SVG animations for circuit signals (IntegrationsSection)

### Design Patterns
- Plus corner decorations on dashed border boxes
- Monospace font for labels (`font-mono`)
- Zinc color palette for grays
- Green accent for success/completion states

## Historical Context (from thoughts/)

- `thoughts/shared/handoffs/general/2025-12-26_04-02-07_landing-page-redesign.md` - Original handoff document (now outdated)
- `thoughts/shared/plans/2025-12-26-landing-page-redesign.md` - Full 8-phase implementation plan
- `thoughts/shared/handoffs/general/2025-12-25_16-30-54_design-system-flowdiagram-improvements.md` - Earlier design system work

## Next Steps

1. **Skip Phase 5** - Already complete
2. **Start Phase 6** - Create BentoFeatures component:
   - Create `src/components/BentoFeatures.tsx`
   - Consolidate Integrations, DataFolder, ValueProps into bento grid
   - Extract PlusCornerCard as reusable component
3. **Then Phase 7** - FAQ accordion
4. **Then Phase 8** - Update page.tsx section order

## Open Questions

1. Should the RippleGrid concept be revived, or is the simpler Hero design preferred?
2. Are there additional FAQ questions to include beyond the 4 in the plan?
3. Should deprecated components (IntegrationsSection, DataFolderSection, ValueProps) be deleted after BentoFeatures is complete?
