---
title: Monster Image Gallery
tags:
  - reference
  - images
  - monsters
  - gallery
status: active
---

# Monster Image Gallery

Visual index for at-a-glance monster art review.

## Use This Page For

- Picking creature visuals quickly during encounter prep.
- Comparing monster silhouettes, mood, and token readiness.
- Browsing by category for roster building.

## Creature Categories (Future-Proof)

Use `creatureType` in image metadata with these values:

- beast
- undead
- fey
- monstrosity
- dragon
- humanoid

## Optional Dataview Gallery (Plugin)

> Use this section only if Dataview is enabled.

```dataview
TABLE WITHOUT ID
link(entity_note, entity_slug) as Monster,
"![[" + image + "|200]]" as Image,
creatureType as "Creature Type",
imageRole as "Image Role",
choice(region, region, "-") as Region,
choice(faction, faction, "-") as Faction,
choice(status, status, "active") as Status
FROM "assets/images/monsters"
WHERE entity_type = "monster" AND image
SORT creatureType ASC, file.name ASC
```

## Manual Gallery (No Plugin Required)

### [[monsters/winter-wolf|Winter Wolf]]

![[assets/images/monsters/winter-wolf/winter-wolf-reference.svg|240]]

- **Type:** Monster (Beast)
- **Image Role:** reference
- **Faction/Pressure:** [[factions/cult-of-the-dragon|Cult of the Dragon]] (occasional pressure)
- **Region:** [[regions/sword-coast|Sword Coast]]
- **Tags:** #monster #beast #winter #sword-coast
- **Status:** active
- **Asset Index:** [[assets/images/monsters/winter-wolf/index|Image Metadata]]

## Add a New Monster Entry

1. Create `assets/images/monsters/<monster-slug>/`.
2. Add at least one image (`<monster-slug>-reference.webp` recommended).
3. Add/update `assets/images/monsters/<monster-slug>/index.md` frontmatter fields:
   - `entity_type: monster`
   - `entity_note: monsters/<monster-slug>`
   - `image: assets/images/monsters/<monster-slug>/<file>`
   - `imageRole: reference` (or token/scene/variant/portrait)
   - `creatureType: beast|undead|fey|monstrosity|dragon|humanoid`
   - `tags: [monster, <creatureType>, ...]`
   - `region:` / `faction:` if relevant
   - `status: active` (or draft/retired)
4. Add canonical fields to the monster note: `image`, `tokenImage`, `alternateImages`, `assetFolder`, and `creatureType`.
5. Add one manual card here for plugin-free browsing.

## Related

- [[reference/image-asset-system|Image Asset System]]
- [[reference/npc-image-gallery|NPC Image Gallery]]
- [[monsters/index|Monsters]]
