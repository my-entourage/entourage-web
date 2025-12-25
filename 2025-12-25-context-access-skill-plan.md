# Entourage Context Access - Implementation Plan

## Overview

Create a Claude Code command `/context-find` for entourage-web that finds relevant discussions and tasks from the sibling `../entourage` repository when building features.

## Current State Analysis

### Source Repository Structure (`../entourage`)
```
entourage/
├── data/
│   ├── in-person-meeting-transcripts/    # Conversational dialogue
│   ├── remote-meeting-transcripts/
│   │   ├── granola/                      # Granola app transcripts
│   │   └── notion/                       # Notion transcripts
│   └── whatsapp/                         # Chat exports
├── tasks/
│   ├── staging/                          # Individual task files (YAML + MD)
│   └── TASKS.md                          # Consolidated checklist
└── thoughts/
    └── plans/                            # Implementation plans
```

### Task File Format
```yaml
---
id: task-20251223-1
title: Get lapel mics for team transcription
assignee: unassigned
priority: high
status: todo
source: in-person-2025-12-20-06-31      # Links to transcript
project: mvp
---
```

### Source → Transcript Mapping
The `source` field maps to transcript files:
- `in-person-2025-12-20-06-31` → `data/in-person-meeting-transcripts/2025-12-20T06_31*.md`
- `granola-2025-12-23-01-50` → `data/remote-meeting-transcripts/granola/2025-12-23T01_50*.md`

## Desired End State

**Command**: `/context-find <topic>`

```
/context-find landing page
/context-find linear integration
/context-find supabase setup
```

**Output**:
1. Matching tasks with status/priority
2. Relevant discussion excerpts from transcripts
3. Source attribution for follow-up

## What We're NOT Doing

- Proactive suggestions (on-demand only)
- MCP server or embeddings
- Multiple complex subcommands (start simple)

---

## Phase 1: Create Command File ✅

### Overview
Create the `/context-find` command that searches entourage repo for relevant context.

### Changes Required

**File**: `.claude/commands/context-find.md`

```markdown
# Find Context

Search the entourage repository for discussions and tasks related to a topic.

## Usage

```
/context-find <topic>
```

## Examples

```
/context-find landing page
/context-find linear
/context-find supabase
```

## Instructions for Claude

### Step 1: Verify Access

```bash
ls ../entourage/data ../entourage/tasks 2>/dev/null || echo "ERROR: Cannot access ../entourage"
```

### Step 2: Search Tasks

Search task files for the topic:

```bash
grep -r -i -l "<topic>" ../entourage/tasks/staging/
```

For each matching task file:
1. Read the full file
2. Extract: id, title, priority, status, source, project
3. Note the source field for transcript lookup

### Step 3: Search Transcripts

Search all transcripts:

```bash
grep -r -i -l "<topic>" ../entourage/data/
```

For each matching transcript:
1. Get relevant excerpts (5 lines context around match):
   ```bash
   grep -i -B5 -A5 "<topic>" <file>
   ```
2. Identify the source label from path

### Step 4: Search Plans

Check for related implementation plans:

```bash
grep -r -i -l "<topic>" ../entourage/thoughts/
```

### Step 5: Format Output

Present results in this structure:

```
## Context for "<topic>"

### Related Tasks
| ID | Title | Priority | Status | Project |
|----|-------|----------|--------|---------|
| task-20251223-2 | Build web UI | high | todo | mvp |

### Discussions

**granola-2025-12-23** (remote meeting):
> [Relevant excerpt about the topic]
> [With speaker context]

**in-person-2025-12-21** (in-person):
> [Another relevant excerpt]

### Implementation Plans
- `thoughts/plans/2025-12-22-landing-page-prd.md`

### Source Files
- Tasks: `../entourage/tasks/staging/task-20251223-2.md`
- Transcript: `../entourage/data/remote-meeting-transcripts/granola/2025-12-23T01_50_00Z.md`

---

### Suggested Actions (requires approval)

Based on this context, I could:
1. [ ] Mark task-20251223-2 as "in_progress" (you're working on web UI)
2. [ ] Add note to task about Supabase integration requirement

**Proceed with any of these? Reply with numbers to approve, or 'skip' to continue without changes.**
```

## Notes

- Always provide file paths so user can read full context
- If no matches found, say so clearly
- For large result sets, summarize and offer to show more

## Human-in-the-Loop

**CRITICAL**: After presenting context, if any action is proposed:

1. **Never auto-modify** plans, tasks, or code based on findings
2. **Always present** what was found and what could be done
3. **Ask for approval** before:
   - Updating task status in entourage repo
   - Modifying implementation plans
   - Making code changes based on context
   - Adding new tasks

**Approval format**:
```
Based on this context, I could:
1. Update task-20251223-2 status to "in_progress"
2. Add implementation notes from the discussion

Proceed with these changes? [Y/n/select specific]
```

If user approves:
- Make the changes
- Report what was modified

If user declines or wants changes:
- Wait for specific instructions
- Do not proceed with modifications
```

### Success Criteria

#### Automated Verification:
- [x] Command file exists at `.claude/commands/context-find.md`
- [x] `ls ../entourage/data` succeeds from entourage-web directory

#### Manual Verification:
- [x] `/context-find linear` returns Linear-related tasks and discussions
- [ ] `/context-find landing` returns landing page context
- [x] Output includes source file paths

---

## Phase 2: Add Settings for Cross-Repo Access ✅

### Overview
Configure Claude Code settings to allow reading from entourage repo.

### Changes Required

**File**: `.claude/settings.json` (update existing)

Add entourage to allowed directories:

```json
{
  "permissions": {
    "allow": [
      "Read(../entourage/**)"
    ]
  }
}
```

### Success Criteria

#### Manual Verification:
- [x] Claude can read entourage files without confirmation prompts

---

## Phase 3: Add Skill Context (Deferred)

> **Status**: Deferred to separate Linear ticket. See ticket details below.

### Overview
Create a skill that provides background knowledge about the entourage data structure.

### Changes Required

**File**: `.claude/skills/entourage-context/SKILL.md`

```markdown
---
name: entourage-context
description: Knowledge about the entourage project context repository structure. Use when accessing meeting transcripts, tasks, or discussions.
---

# Entourage Context Repository

The `../entourage` repository contains project context:

## Data Sources

| Directory | Format | Content |
|-----------|--------|---------|
| `data/in-person-meeting-transcripts/` | MD | In-person meeting transcripts |
| `data/remote-meeting-transcripts/granola/` | MD | Granola app transcripts |
| `data/remote-meeting-transcripts/notion/` | MD | Notion transcripts |
| `data/whatsapp/` | TXT | WhatsApp chat exports |

## Task Schema

Tasks in `tasks/staging/*.md` have YAML frontmatter:
- `id`: task-YYYYMMDD-N
- `title`: Brief description
- `priority`: high/medium/low
- `status`: todo/done
- `source`: Platform-date label linking to transcript
- `project`: mvp/later

## Source Label → File Mapping

Parse source label to find original transcript:
- `in-person-2025-12-20-06-31` → `data/in-person-meeting-transcripts/2025-12-20T06_31*.md`
- `granola-2025-12-23` → `data/remote-meeting-transcripts/granola/2025-12-23*.md`

## Common Commands

- `/context-find <topic>` - Find discussions/tasks about a topic
```

### Success Criteria

#### Manual Verification:
- [ ] Skill provides useful context when referenced

---

## Testing Strategy

### Test Cases
1. `/context-find linear` - Should find Linear integration discussions
2. `/context-find landing` - Should find landing page planning
3. `/context-find nonexistent` - Should handle no results gracefully

### Edge Cases
- Topics spanning multiple transcripts
- Tasks with missing source transcripts
- Very long excerpts

## References

- Existing entourage commands: `../entourage/.claude/commands/`
- Task extractor skill: `../entourage/.claude/skills/task-extractor/SKILL.md`
- Current skill pattern: `.claude/skills/add-shadcn-component/SKILL.md`
