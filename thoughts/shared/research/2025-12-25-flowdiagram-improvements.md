# FlowDiagram Improvements Research

**Date**: December 25, 2025
**Goal**: Make the FlowDiagram instantly understandable - simpler is better

---

## Current State Analysis

The FlowDiagram shows:
```
Meetings + Chat + Email + Voice
           ↓
      [AI circle]
           ↓
     Human Review
           ↓
    Task Cards (Add/Edit/Done)
```

### Problems Identified

1. **"Voice" is ambiguous** - Could mean voice memos, calls, or in-person conversations
2. **AI node has no context** - Shows "AI / Entourage" but doesn't explain what it does
3. **Task cards are too detailed** - Shows UI-level details instead of outcome
4. **No problem-solution framing** - Visitors don't instantly understand the value
5. **Logo missing from AI node** - Should use E-Block logo, not "AI" text

---

## Recommended Changes

### 1. Clearer Input Source Labels

| Current | Suggested | Rationale |
|---------|-----------|-----------|
| Voice | **Transcripts** | Explicit - covers meeting recordings, voice memos, in-person notes |
| Chat | **Messages** | Broader - covers Slack, Teams, iMessage, etc. |
| Meetings | Meetings | Clear as-is |
| Email | Email | Clear as-is |

### 2. AI Node Redesign

**Current:**
```
┌─────────────┐
│     AI      │
│  Entourage  │
└─────────────┘
```

**Proposed:**
```
┌─────────────┐
│  [E-Block]  │  ← Logo mark
└─────────────┘
   Entourage
"Analyzes & organizes
 into actionable tasks"
```

**Key changes:**
- Replace "AI" text with actual E-Block logo mark
- Add "Entourage" text below the circle
- Add brief explanation of what the processing does

### 3. Simplified Output Section

**Current:** 3 detailed task cards with icons, colors, and placeholder content

**Proposed Options:**

**Option A - Minimal text:**
```
Your Tasks
• New items added
• Existing updated
• Completed marked
```

**Option B - Single output label:**
```
         ↓
   [Your Task List]
    Always current
```

**Option C - Keep cards but add context:**
```
"Updates your task list automatically"
[Simplified task cards]
```

### 4. Add Introductory Copy

Before the diagram, add a single sentence:
> "Your communications flow in. Organized tasks flow out."

This frames the diagram and sets expectations.

---

## Visual Hierarchy Improvements

### Typography Fixes (per design guide)
- Current labels use `text-[11px]` and `text-[8px]` - below minimum
- Update to `text-xs` (12px) for accessibility compliance
- Keep monospace font for technical aesthetic

### Icon Consistency
- Standardize all icons to 1.5px stroke weight
- Current waveform icon uses 2px (inconsistent)

### Flow Direction
- Mobile: Vertical flow (current - good)
- Desktop: Horizontal flow (current - good)
- Consider arrows instead of dashed lines for clearer direction

---

## Messaging Principles

1. **Instant comprehension** - 3 seconds to understand
2. **Problem-solution fit** - Show the transformation
3. **Reduce cognitive load** - Fewer elements, clearer meaning
4. **Brand integration** - E-Block logo as the "processing engine"

---

## Implementation Priority

1. **High**: Replace input labels (Voice → Transcripts, Chat → Messages)
2. **High**: Redesign AI node with logo + explanation
3. **Medium**: Simplify task output section
4. **Medium**: Add intro copy
5. **Low**: Typography/icon cleanup

---

## Reference Examples

**Clearbit:** "Data in → Enrichment → Decisions" (3 clear steps)
**Calendly:** "Share link → They pick → Meeting scheduled" (outcome-focused)
**Linear:** Simple flow diagrams with clear icons and minimal text

---

## Files to Modify

- `src/components/FlowDiagram.tsx` - Main changes
- `src/components/Logo.tsx` - Ensure LogoMark is available for AI node
- `src/components/Header.tsx` - Consider adding LogoFull for consistency

---

## Success Criteria

- [ ] New visitor understands Entourage in <5 seconds
- [ ] Input sources are unambiguous
- [ ] AI processing step is explained, not a black box
- [ ] Output is clear: "your tasks get updated"
- [ ] Typography meets 12px minimum
- [ ] E-Block logo appears in flow diagram
