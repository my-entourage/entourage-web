---
date: 2025-12-25T15:39:26+0800
researcher: claude
git_commit: 97d150e128485896ea3526533fdc7506aa39e6f3
branch: feat/ent-48-context-find-command
repository: entourage-web
topic: "ENT-48 Context Find Command Implementation"
tags: [implementation, claude-code, commands, cross-repo]
status: in_progress
last_updated: 2025-12-25
last_updated_by: claude
type: implementation_strategy
---

# Handoff: ENT-48 /context-find command for cross-repo context access

## Task(s)

**Working from plan:** `2025-12-25-context-access-skill-plan.md`

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | **Completed** | Create `/context-find` command file |
| Phase 2 | Pending | Add settings for cross-repo access |
| Phase 3 | Pending (Optional) | Create entourage-context skill |

**Goal:** Create a Claude Code command that searches the sibling `../entourage` repository for relevant discussions, tasks, and plans when building features in entourage-web.

## Critical References

- Implementation plan: `2025-12-25-context-access-skill-plan.md`
- Entourage repo task schema: `../entourage/.claude/skills/task-extractor/SKILL.md`

## Recent changes

- `.claude/commands/context-find.md:1-4` - Added YAML frontmatter with description and argument-hint
- `.claude/commands/context-find.md:26` - Added `$ARGUMENTS` placeholder for topic
- `.claude/commands/context-find.md:38-65` - Updated to reference Grep tool instead of bash grep

## Learnings

1. **Claude Code commands require session restart** to be picked up after creation
2. **YAML frontmatter best practices** for commands:
   - `description` - shown in `/help` output
   - `argument-hint` - shown in autocomplete (e.g., `<topic>`)
3. **$ARGUMENTS placeholder** is required to pass user input to Claude - using `<topic>` as placeholder text doesn't work
4. **Source field in tasks** (e.g., `in-person-2025-12-20-06-31`) maps to transcript files via pattern matching

## Artifacts

- `.claude/commands/context-find.md` - The main command file
- `2025-12-25-context-access-skill-plan.md` - Implementation plan (in project root)
- PR #1: https://github.com/my-entourage/entourage-web/pull/1

## Action Items & Next Steps

1. **Test the command** - Restart Claude Code session and run `/context-find linear` to verify it works
2. **Phase 2** - Add `Read(../entourage/**)` to `.claude/settings.json` permissions for smoother cross-repo access
3. **Phase 3 (Optional)** - Create skill at `.claude/skills/entourage-context/SKILL.md` if command needs more context about data structure
4. **Merge PR** - After testing, merge PR #1

## Other Notes

### Entourage repo structure (for context searching)
```
../entourage/
├── data/
│   ├── in-person-meeting-transcripts/   # MD files with dialogue
│   ├── remote-meeting-transcripts/granola/
│   └── whatsapp/
├── tasks/
│   ├── staging/                         # Task files with YAML frontmatter
│   └── TASKS.md                         # Consolidated checklist
└── thoughts/plans/                      # Implementation plans
```

### Task YAML schema
```yaml
id: task-20251223-1
title: Task title
priority: high|medium|low
status: todo|done
source: platform-YYYY-MM-DD-HH-MM  # Links to transcript
project: mvp|later
```

### Human-in-the-loop
The command includes instructions for Claude to always ask for approval before modifying any tasks, plans, or code based on context found.
