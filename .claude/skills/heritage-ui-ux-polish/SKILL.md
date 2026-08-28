---
description: Apply premium UI/UX polish for Heritage Philippines V2 while preserving the current design direction. Use for forms, cards, empty states, loading states, CTAs, hierarchy, spacing, and interaction feedback.
---

# Heritage UI/UX Polish

Use this skill for focused UI/UX refinement without accidental redesign.

## Design personality

The interface should feel:
- premium
- cinematic
- calm
- warm
- trustworthy
- readable
- story-led

## Priority checks

For every UI patch, check:
- text contrast
- heading hierarchy
- card spacing
- button clarity
- section rhythm
- mobile readability
- empty/loading/error states
- whether the change still matches Heritage V2 visual language

## Empty states

Avoid dead blank states.

Bad:
- `No packages found.`

Better:
- Explain what happened.
- Give a next action.
- Keep tone aligned with travel/heritage.

Example:
`No heritage journeys match this filter yet. Try Luzon, Visayas, or Mindanao, or request a custom route.`

## Loading states

Prefer structure over plain spinners:
- package card skeletons
- gallery image skeletons
- form submitting state
- dashboard row skeletons later

## Form feedback

Every important form should eventually show:
- idle
- submitting
- success
- error
- retry state

This applies later to:
- Contact Us
- package inquiry
- quote modal
- login/register
- document upload
- admin actions

## Avoid

Do not:
- redesign the whole page unless requested
- introduce random colors
- use weak contrast
- make all sections white
- create duplicate-looking sections
- add heavy animations that hurt performance
- change backend behavior during visual-only tasks

## Report format

End with:
- files changed
- UX improvement made
- build result
- manual checks
- remaining polish items