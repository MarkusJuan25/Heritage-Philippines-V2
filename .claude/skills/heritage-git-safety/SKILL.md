---
description: Protect Heritage Philippines V2 changes with focused git checks, small patch scope, build verification, and safe commit reporting. Use before edits, after edits, before commits, or when reviewing changed files.
---

# Heritage Git Safety

Use this skill whenever work touches files, branches, commits, build checks, or cleanup.

## Rules

Before changing files:
- Confirm the current branch.
- Run `git status --short`.
- Identify the exact allowed files.
- Avoid broad refactors.
- Avoid touching unrelated files.
- Do not edit parked Member/Admin areas unless explicitly requested.
- Do not touch backend/API files unless the task requires it.

Never commit:
- `.env`
- secrets
- `node_modules`
- `.claude/settings.local.json`
- generated build output unless explicitly requested
- unrelated image assets mixed with code changes

Be careful with:
- `client/public/images`, because many assets may be untracked.
- `client/src/pages/HomePage.jsx`, because it has parked intentional edits.
- backend quote/auth/planner flows, because they may still be needed later.

## Standard workflow

1. Run:
   - `git branch --show-current`
   - `git status --short`
2. Inspect only relevant diffs.
3. Make the smallest safe change.
4. If frontend files changed, run:
   - `cd client`
   - `npm run build`
5. Report:
   - files changed
   - build result
   - manual checks
   - anything not done
   - next recommended step

## Commit guidance

Commit separate concerns separately:
- HomePage code changes separately.
- Image assets separately.
- Claude project instructions separately.
- Backend changes separately.