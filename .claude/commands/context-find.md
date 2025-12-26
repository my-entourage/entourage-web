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
