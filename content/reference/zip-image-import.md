---
title: ZIP Image Import
tags:
  - reference
  - images
  - workflow
status: active
---

# ZIP Image Import

Fast workflow for importing bulk image packs into `assets/images/`.

## Staging

- Drop ZIP archives into `imports/zips/`.
- Keep each ZIP scoped to approved top-level asset folders:
  - `npcs/`
  - `monsters/`
  - `locations/`
  - `items/`
  - `factions/`
  - `misc/`

## Run Import

- Command: `npm run images:import-zips`
- The importer extracts validated ZIPs into `assets/images/`.

## Safety Checks

- Blocks unsafe paths (path traversal).
- Blocks empty archives.
- Blocks unexpected top-level folders.

## After Import

- Add/update descriptor `index.md` files for each imported entity set.
- Link assets from lore pages like [[people/index|People]] and [[monsters/index|Monsters]].
- Refresh gallery pages:
  - [[reference/npc-image-gallery|NPC Image Gallery]]
  - [[reference/monster-image-gallery|Monster Image Gallery]]
