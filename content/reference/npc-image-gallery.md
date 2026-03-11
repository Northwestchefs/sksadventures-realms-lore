---
title: NPC Image Gallery
tags:
  - reference
  - images
  - npc
  - gallery
status: active
---

# NPC Image Gallery

Visual-first browser for NPC art references.

## Use This Page For

- Quick portrait and token review before sessions.
- Fast handout selection at the table.
- Scanning NPCs by faction or region tags.

## Optional Dataview Gallery (Plugin)

> Use this section only if Dataview is enabled.

```dataview
TABLE WITHOUT ID
link(entity_note, entity_slug) as NPC,
"![[" + image + "|180]]" as Image,
imageRole as "Image Role",
choice(faction, faction, "-") as Faction,
choice(region, region, "-") as Region,
choice(status, status, "active") as Status
FROM "assets/images/npcs"
WHERE entity_type = "npc" AND image
SORT file.name ASC
```

## Manual Gallery (No Plugin Required)

Use this fallback section for guaranteed compatibility.

### [[people/raelin-silverleaf|Raelin Silverleaf]]

![[assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.svg|220]]

- **Type:** NPC (Scout)
- **Image Role:** portrait
- **Faction:** [[factions/harpers|Harpers]] (friendly tie)
- **Region:** [[regions/sword-coast|Sword Coast]]
- **Tags:** #npc #scout #sword-coast
- **Status:** active
- **Asset Index:** [[assets/images/npcs/raelin-silverleaf/index|Image Metadata]]

## Add a New NPC Entry

1. Create `assets/images/npcs/<npc-slug>/`.
2. Add at least one art file (`<npc-slug>-portrait.webp` recommended).
3. Add/update `assets/images/npcs/<npc-slug>/index.md` frontmatter fields:
   - `entity_type: npc`
   - `entity_note: people/<npc-slug>`
   - `image: assets/images/npcs/<npc-slug>/<file>`
   - `imageRole: portrait` (or token/reference/scene/fullbody/variant)
   - `tags: [npc, ...]`
   - `faction:` and `region:` when useful
   - `status: active` (or draft/retired)
4. Add canonical fields to the NPC note: `image`, `tokenImage`, `alternateImages`, and `assetFolder`.
5. Add one manual card here (until Dataview is relied on full-time).

## Related

- [[reference/image-asset-system|Image Asset System]]
- [[reference/monster-image-gallery|Monster Image Gallery]]
- [[people/index|People]]
