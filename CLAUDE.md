# Heritage Philippines V2 - Claude Project Instructions

## Project Identity

This project is Heritage Philippines V2, a cinematic, premium, story-led travel website and platform for Philippine heritage tourism.

The visual direction should feel warm, elegant, cultural, cinematic, and trustworthy. The project should preserve the Heritage Philippines brand mood: cream, deep green, coffee, gold, warm neutrals, refined typography, readable contrast, and calm premium spacing.

This project is currently public-only for V2. Member and Admin pages may exist in the codebase, but they are parked unless explicitly requested.

## Current Local Development Setup

Frontend:
- React + Vite
- V2 frontend should run on http://localhost:5174

Old V1 reference:
- V1 frontend may run on http://localhost:5173
- Use V1 as the visual and behavior reference when doing parity work

Backend:
- Node/Express backend may run on http://localhost:5000
- Do not assume backend is needed for pure visual work unless the task says so

## Current Branch / Workflow Expectations

Before changing files, always inspect:
- current branch
- git status
- relevant file diff
- exact requested task

Do not do broad refactors unless explicitly requested.

Prefer small, focused patches.

When using Codex or another agent, conserve credits:
- one task per run
- exact file paths only
- no full-repo scans unless requested
- no redesigns unless requested
- short final report only

For broader inspection or planning, Claude Code may be used. For small surgical patches, Codex may be used.

## Current V2 Priority Roadmap

Start from the parked Friday checkpoint.

Expected branch:
- fix/navbar-footer-v1-parity

Known parked state:
- client/src/pages/HomePage.jsx was intentionally modified
- client/public/images has many untracked image assets
- HomePage changes should be reviewed, built, and committed separately from image assets

Priority order:
1. Verify current branch and git status
2. Run client build before committing parked HomePage changes
3. Commit HomePage simplification separately if build passes
4. Review image assets carefully before committing them
5. Continue homepage V1 content parity
6. Footer remaining polish
7. Restore V1-style homepage sections:
   - hero
   - Heritage Destination Tour cards
   - custom/story route section
   - Popular Heritage Tour cards
   - concierge/support CTA
8. Restore Packages V1 behavior:
   - quote/calendar/journey/package logic
   - package cards
   - compact inquiry flow
9. Restore PackageDetailPage and route connection
10. Restore Gallery V1 interaction:
   - photo/video tabs
   - search
   - video embed/play behavior
11. Improve Contact page:
   - real details
   - backend submit later
12. Final navbar/footer parity QA
13. Keep Member/Admin parked/hidden for public-only V2
14. Perform responsive breakpoint testing after each UI patch

## Visual Rules

Always preserve:
- current visual language
- hierarchy
- fonts
- background style
- spacing rhythm
- readable text contrast
- warm premium cinematic feel

Avoid:
- washed-out white text on light backgrounds
- overusing plain white cards
- making sections look too similar to each other
- giant headings that compete with the hero h1
- accidental redesigns
- adding new CTAs that V1 did not have unless requested

When changing UI, check:
- mobile
- tablet
- desktop
- extra-large
- resizing upward and downward

## Heritage V2 Design Notes

The site should feel closer to V1.

Big known V1 parity gaps:
- Home still needs stronger V1-like content structure
- Packages lost V1 quote/calendar/journey/package behavior
- PackageDetailPage needs restoration/routing
- Gallery needs photo/video tabs, search, and video behavior
- Contact needs real details and backend submit later
- Footer needs final polish and live Privacy/Terms later

Navbar:
- Public-only nav should expose:
  - Packages
  - Tour
  - Gallery
  - Stories
  - About
  - Contact Us
- No Login/Dashboard in public navbar for now

Footer:
- Use V1-inspired hierarchy
- Include logo/accreditation/affiliation assets where appropriate
- Privacy Policy and Terms & Conditions may be placeholders until live pages exist
- Do not re-add unwanted brand paragraph unless requested

## Git Safety Rules

Before edits:
- run git status --short
- identify allowed files
- avoid touching unrelated files

After edits:
- run npm run build from client when frontend files change
- show files changed
- show build result
- show manual QA checklist

Never commit:
- secrets
- .env
- node_modules
- local machine-only files
- .claude/settings.local.json unless explicitly instructed

Be careful with:
- client/public/images because many assets may be untracked
- backend/API files used by quote/auth/planner flows
- parked Member/Admin pages

## Backend / Deployment Notes

Keep Hostinger compatibility in mind.

V2 should remain:
- frontend/backend separated
- API-first
- database external-ready
- DATABASE_URL-driven
- not locked into one host

Likely deployment direction:
- Hostinger shared/web hosting may host frontend/static files
- backend/API may need Node-capable hosting such as VPS, Render, Railway, or similar
- database may be managed externally

Do not assume MongoDB is removed unless explicitly decided.
Future V2 may move toward relational databases like PostgreSQL or MySQL when appropriate.

## Response Style for Agent Reports

At the end of coding tasks, report only:

- files changed
- build result
- manual checks
- anything not done
- next recommended step

Do not produce long essays after code patches.

## Use Skills When Relevant

Use the local skills in `.claude/skills` when the task matches:

- heritage-git-safety
- heritage-visual-parity
- heritage-ui-ux-polish
- heritage-responsive-qa