---
title: SRD Integration Workflow
---

# SRD Integration Workflow

## Purpose
- Provide a reusable SRD client layer for future automation.
- Keep a compact, local SRD reference cache for stable lookups.
- Support future workflows for [[player-resources/index|Player Resources]], NPC tools, monsters, and item generation.

## SRD Source
- Source API: D&D 5e SRD API (2014)
- Base URL: `https://www.dnd5eapi.co/api/2014`
- Scope policy: SRD-only content for safe reuse.

## Repository Layout
- `scripts/srd/client.mjs`: reusable SRD API client.
- `scripts/srd/normalize.mjs`: normalization helpers for stable IDs and indexing.
- `scripts/srd/seed-reference.mjs`: reference dataset seeding script.
- `static/data/srd/reference.json`: local compact SRD reference cache.

## Cached Reference Collections
- Full collections:
  - ability scores
  - skills
  - conditions
  - damage types
  - languages
  - equipment categories
- Curated samples:
  - equipment (weapons, armor, tools, utility gear)
  - monsters
  - spells

## Future Codex Usage Pattern
1. Load `static/data/srd/reference.json` first for local lookups.
2. Use stable IDs (`endpoint:index`) for links, matching, and deduplication.
3. If detailed records are needed, use `SrdClient.fetchByIndex()` or `SrdClient.fetchResource()`.
4. Keep additions SRD-only and extend via the seed script.

## Refresh / Expand the Local Dataset
- Run: `npm run srd:seed`
- The seeding script tries live API fetches first and falls back to an embedded SRD-safe compact seed if network access is unavailable.
- To expand:
  1. Edit the `OFFLINE_SEED` collections in `scripts/srd/seed-reference.mjs`.
  2. Re-run `npm run srd:seed`.
  3. Commit updated script + `static/data/srd/reference.json` together.

## Notes
- This layer is intentionally lightweight and script-first.
- It is designed for reuse by future Codex passes without framework lock-in.
