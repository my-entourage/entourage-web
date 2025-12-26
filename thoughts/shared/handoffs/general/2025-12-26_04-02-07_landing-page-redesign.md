---
date: 2025-12-26T04:02:07Z
researcher: Claude
git_commit: 3d6ef2f475f4ec5f72054f1dcc7e4d53de4a9e35
branch: feat/design-system
repository: entourage-web
topic: "Landing Page Redesign Implementation"
tags: [implementation, landing-page, animation, ui-components]
status: in_progress
last_updated: 2025-12-26
last_updated_by: Claude
type: implementation_strategy
---

# Handoff: Landing Page Redesign - Phases 1-4 Complete, Awaiting Validation

## Task(s)

Implementing an 8-phase landing page redesign based on user feedback. Currently paused after Phase 4, awaiting manual verification before proceeding.

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Fix Navbar Animation | ✅ Completed |
| 2 | Fix RippleGrid Interaction | ✅ Completed |
| 3 | Slow TeamCredentialsSection Scroll | ✅ Completed |
| 4 | Fix FlowSection Logo | ✅ Completed |
| 5 | Add Company Icons to Integrations | 🔲 Pending |
| 6 | Create BentoFeatures Section | 🔲 Pending |
| 7 | Create FAQ Accordion | 🔲 Pending |
| 8 | Reorder Page Sections | 🔲 Pending |

## Critical References

- **Implementation Plan**: `thoughts/shared/plans/2025-12-26-landing-page-redesign.md`
- **Design Guide**: `entourage_design_guide.md`
- **Original Handoff**: `thoughts/shared/handoffs/general/2025-12-25_16-30-54_design-system-flowdiagram-improvements.md`

## Recent changes

### Phase 1 - Navbar Animation
- `src/components/Header.tsx:30-39`: Changed from multi-property animation (height/width/maxWidth) to single scale transform (`scale: isScrolled ? 0.85 : 1`)

### Phase 2 - RippleGrid Interaction
- `src/components/RippleGrid.tsx:17-18`: Increased cell size from 48px to 56px
- `src/components/RippleGrid.tsx:65-68`: Added hover background color (`hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80`)
- `src/app/globals.css:102-115`: Updated keyframes for more prominent background animation (0.03 → 0.08 opacity)

### Phase 3 - TeamCredentialsSection
- `src/components/ui/InfiniteSlider.tsx`: Complete rewrite - removed Framer Motion, now uses pure CSS animations to fix glitching
- `src/components/TeamCredentialsSection.tsx:52`: Reduced speed from 40 to 5
- `src/components/TeamCredentialsSection.tsx:13-21`: Added actual company logos from `/public/logos/`
- `src/app/globals.css:270-295`: Added CSS scroll animations (@keyframes scroll, scroll-reverse)

### Phase 4 - FlowSection Logo
- `src/components/FlowSection.tsx:33`: Changed SVG viewBox from `0 0 200 100` to `0 0 200 50` to reduce gap
- `src/components/FlowSection.tsx:327`: LogoMark uses size={48} with proper dark mode support

## Learnings

1. **InfiniteSlider Glitching**: Framer Motion-based animation with useMeasure caused glitching on page load and hover. Fixed by rewriting to pure CSS animations with `@keyframes scroll` and duplicated children.

2. **FlowSection Over-engineering Warning**: User explicitly wanted minimal changes - just fix the gap. I initially rewrote the entire section as a single SVG which the user hated. Reverted and only changed viewBox. **Lesson: Make minimal targeted changes, don't over-engineer.**

3. **SVG ViewBox for Gap Control**: Cropping viewBox from `0 0 200 100` to `0 0 200 50` effectively removes whitespace in SVG diagrams.

4. **Speed Parameter**: InfiniteSlider uses `speed` parameter where higher = faster. Formula: `effectiveDuration = 100 / speed`. Speed of 5 = 20s duration.

## Artifacts

- `thoughts/shared/plans/2025-12-26-landing-page-redesign.md` - Full 8-phase implementation plan
- `src/components/Header.tsx` - Updated navbar with scale animation
- `src/components/RippleGrid.tsx` - Updated with hover background
- `src/components/ui/InfiniteSlider.tsx` - Rewritten with pure CSS
- `src/components/TeamCredentialsSection.tsx` - Brand styling with logos
- `src/components/FlowSection.tsx` - Gap fixed via viewBox
- `src/app/globals.css` - Added scroll animations
- `public/logos/` - Company logos (bain.svg, boeing.svg, deepmind.svg, google.svg, harvard.svg, mckinsey.svg, aalto.png)

## Action Items & Next Steps

1. **Await Manual Verification** - User needs to confirm Phases 1-4 look correct:
   - Navbar animation is smooth
   - RippleGrid hover shows background
   - Credentials scroll at readable pace without glitching
   - FlowSection gap is acceptable

2. **Phase 5**: Add company icons to IntegrationsSection using Iconify (`simple-icons:*`)

3. **Phase 6**: Create BentoFeatures component combining Integrations, Data Vault, Never Miss Task, Human-in-the-Loop

4. **Phase 7**: Install shadcn accordion (`pnpm dlx shadcn@canary add accordion`) and create FAQ component

5. **Phase 8**: Update `src/app/page.tsx` to reorder sections: Hero → Credentials → Flow → BentoFeatures → FAQ → CTA → Footer

## Other Notes

- **Build Status**: ✅ Passes (`pnpm build`)
- **ShadCN Pattern**: Never modify files in `src/components/ui/` directly - create wrappers in `src/components/`
- **Icon Usage**: Use `<Icon icon="simple-icons:slack" />` from `src/components/Icon.tsx` which wraps Iconify
- **Plus-Corner Pattern**: Already implemented in FlowSection and DataFolderSection - can extract as reusable `PlusCornerCard` component
- **Dark Mode**: All components support dark mode with `dark:` Tailwind variants
