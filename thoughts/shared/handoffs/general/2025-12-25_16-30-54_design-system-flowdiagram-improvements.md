---
date: 2025-12-25T16:30:54+0800
researcher: claude
git_commit: 7dde6cee35d2212b6bf14c0084d3526261d3d327
branch: feat/design-system
repository: entourage-web
topic: "Design System & FlowDiagram Improvements"
tags: [implementation, design-system, flowdiagram, dark-mode, vercel-aesthetic]
status: in_progress
last_updated: 2025-12-25
last_updated_by: claude
type: implementation_strategy
---

# Handoff: Design System & FlowDiagram Improvements

## Task(s)

### 1. Branch Recovery & Management (Completed)
- Recovered orphaned commit `911c301` containing design system work (Iconify icons, E-Block logo)
- Created `feat/design-system` branch from recovered commit
- Applied stashed dark mode infrastructure work
- Committed all recovered work

### 2. Vercel-Style Design Language (In Progress)
Working from: `thoughts/plans/2025-12-25-vercel-style-design-language.md`

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Sharp corners (remove rounded) | Not started |
| Phase 2 | Blueprint grid in Hero | Infrastructure created, not wired |
| Phase 3 | Dark mode toggle | Infrastructure created, not wired |
| Phase 4 | FlowDiagram fixes | Not started |
| Phase 5 | Component dark mode classes | Not started |
| Phase 6 | Verification | Not started |

### 3. FlowDiagram Improvements (Planned)
Working from: `thoughts/shared/research/2025-12-25-flowdiagram-improvements.md`

User feedback: FlowDiagram needs to be instantly understandable. Simpler is better. Key issues:
- "Voice" label is ambiguous → change to "Transcripts"
- "Chat" is too specific → change to "Messages"
- AI node needs explanation text below logo
- Remove circle around E-Block logo
- Task cards too detailed for marketing page

## Critical References

1. `thoughts/plans/2025-12-25-vercel-style-design-language.md` - 6-phase implementation plan
2. `thoughts/shared/research/2025-12-25-flowdiagram-improvements.md` - FlowDiagram research with specific recommendations
3. `entourage_design_guide.md` - Brand guidelines (Iconify icons, typography, colors)

## Recent changes

```
7dde6ce - feat: add dark mode infrastructure and blueprint grid
  - src/components/BlueprintGrid.tsx (new)
  - src/components/Button.tsx (new - sharp corners wrapper)
  - src/components/ThemeProvider.tsx (new)
  - src/components/ThemeToggle.tsx (new)
  - thoughts/plans/2025-12-25-vercel-style-design-language.md (new)
  - thoughts/shared/research/2025-12-25-flowdiagram-improvements.md (new)

911c301 - feat: implement design system with Iconify icons and E-Block logo
  - src/components/Icon.tsx (new - Iconify wrapper)
  - src/components/Logo.tsx (new - E-Block mark)
  - src/components/FlowDiagram.tsx (updated with Iconify icons)
  - src/components/Header.tsx (updated with responsive logo)
  - src/components/ValueProps.tsx (updated with icons)
```

## Learnings

1. **Never modify `src/components/ui/` files** - Create wrapper components in `src/components/` instead. The user was explicit about this constraint.

2. **Branch was orphaned** - Commit `911c301` was reset away but recoverable via `git reflog`. Always check reflog for lost work.

3. **Infrastructure vs Integration** - Components like ThemeProvider, BlueprintGrid, Button wrapper are created but NOT wired into the app yet. They exist as files but aren't used.

4. **FlowDiagram current state** - Has Iconify icons and LogoMark but:
   - Still has `rounded-full` circle around logo (line 55)
   - Still has `rounded-md` on TaskCards (line 86)
   - Legend uses colored dots instead of icons (lines 113-123)
   - No explanation text below AI node
   - Typography uses `text-[8px]` which is below 12px minimum

## Artifacts

- `src/components/BlueprintGrid.tsx` - Blueprint grid component (not integrated)
- `src/components/Button.tsx` - Sharp corners wrapper (not used)
- `src/components/ThemeProvider.tsx` - Dark mode context (not integrated)
- `src/components/ThemeToggle.tsx` - Theme toggle button (not integrated)
- `src/components/Icon.tsx` - Iconify wrapper (in use)
- `src/components/Logo.tsx` - E-Block logo (in use)
- `thoughts/plans/2025-12-25-vercel-style-design-language.md` - Implementation plan
- `thoughts/shared/research/2025-12-25-flowdiagram-improvements.md` - FlowDiagram research

## Action Items & Next Steps

### Immediate (Wire up infrastructure)
1. Add `ThemeProvider` wrapper in `src/app/layout.tsx`
2. Add `ThemeToggle` to `src/components/Header.tsx`
3. Add `BlueprintGrid` to `src/components/Hero.tsx`
4. Replace `ui/Button` imports with custom `Button` wrapper where sharp corners needed

### FlowDiagram improvements
1. Update input labels: `Voice` → `Transcripts`, `Chat` → `Messages`
2. Update AINode (line 52-59):
   - Remove `rounded-full border-2` from container
   - Add "Entourage" text below logo
   - Add explanation: "Analyzes & organizes into actionable tasks"
3. Update TaskCard (line 86): Remove `rounded-md`
4. Update Legend (lines 111-124): Replace colored dots with Icon components
5. Fix typography: Replace `text-[8px]` and `text-[11px]` with `text-xs` (12px)

### Apply dark mode classes
- Add `dark:` variants to all components per Phase 5 of the plan

### Verification
- Run `grep -r "rounded-full\|rounded-md" src/components/` to verify no rounded corners remain
- Test dark mode toggle functionality
- Visual review of FlowDiagram for instant comprehension

## Other Notes

- Build passes: `pnpm build` succeeds on current branch
- The plan document is marked "Status: Implemented" but this is incorrect - infrastructure is created but not integrated
- User emphasized: "The simpler the better. We want to make sure that people who navigate the website instantly know what we are about."
- Reference sites for aesthetic: [Vercel Font Page](https://vercel.com/font), Clearbit, Calendly
