---
description: Run responsive QA for Heritage Philippines V2 across mobile, tablet, desktop, extra-large, and reverse resizing. Use after layout, navbar, footer, card, hero, gallery, package, or form changes.
---

# Heritage Responsive QA

Use this skill after any visual or layout change.

## Required breakpoints

Check:
- small mobile
- large mobile
- tablet
- laptop
- desktop
- extra-large

Also check resizing:
- small to medium
- medium to large
- large to extra-large
- extra-large back to large
- large back to medium
- medium back to small

## Navigation checks

Navbar:
- desktop links readable
- active states visible
- no layout squeeze
- mobile burger opens
- mobile burger closes with X
- mobile menu closes after nav link click
- route change starts at page top

## Page checks

For each changed page:
- hero text readable
- CTA visible
- no overflow
- no clipped text
- no awkward gaps
- cards stack correctly
- images crop safely
- footer remains clean
- spacing still feels premium

## Heritage-specific checks

Protect:
- cinematic feel
- cream/deep green/coffee/gold palette
- readable contrast
- page hierarchy
- no washed-out text
- no accidental white-on-light sections

## Build check

If frontend files changed, run:

`cd client`
`npm run build`

## Report format

End with:
- tested viewport sizes
- layout issues found
- fixes made
- build result
- remaining responsive risks