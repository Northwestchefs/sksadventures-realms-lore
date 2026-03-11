---
title: Image Asset System
tags:
  - reference
  - images
  - workflow
status: active
---

# Image Asset System

A lightweight, scalable image workflow for Obsidian + Quartz lore notes.

## 1) Where Images Go

Top-level asset storage:

- `assets/images/npcs/`
- `assets/images/monsters/`
- `assets/images/locations/`
- `assets/images/items/`
- `assets/images/factions/`
- `assets/images/misc/`

Use one slug folder per NPC or monster:

- `assets/images/npcs/<slug>/`
- `assets/images/monsters/<slug>/`

## 2) Naming Convention

Use lowercase kebab-case filenames.

Pattern:

- `<entity-slug>-<role>.<ext>`
- `<entity-slug>-<role>-v<version>.<ext>`
- `<entity-slug>-<variant>-<role>.<ext>`

Roles:

- `portrait`
- `fullbody`
- `token`
- `reference`
- `scene`
- `variant`

## 3) Frontmatter Conventions (Gallery-Friendly)

Use these fields on asset folder `index.md` notes so visual galleries can generate consistently.

```yaml
entity_type: npc | monster
entity_slug: raelin-silverleaf
entity_note: people/raelin-silverleaf
image: assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp
imageRole: portrait
tags:
  - npc
  - scout
faction: harpers
region: sword-coast
status: active
creatureType: beast # monsters only
```

### Field notes

- `image`: primary gallery image to embed.
- `imageRole`: what that image is for (`portrait`, `reference`, `token`, etc.).
- `tags`: compact discoverability labels.
- `faction`: optional faction tie.
- `region`: optional primary region.
- `status`: `active`, `draft`, or `retired`.
- `creatureType`: monster category (`beast`, `undead`, `fey`, `monstrosity`, `dragon`, `humanoid`).

Legacy fields like `primary_image`, `token_image`, and `alternate_images` can remain for compatibility.

## 4) Entity Note Fields

On NPC/monster entity pages, keep these fields for in-note rendering:

```yaml
image_primary: assets/images/.../main-image.webp
image_token: assets/images/.../token.png
image_gallery:
  - assets/images/.../alt-image.webp
image_index: assets/images/.../index.md
```

## 5) Embedding in Obsidian Notes

Preferred embed format:

```md
![[assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp|320]]
```

Fallback Markdown format:

```md
![Raelin Silverleaf portrait](../../assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp)
```

## 6) Visual Browsing Pages

Use these indexes for image-first browsing:

- [[reference/npc-image-gallery|NPC Image Gallery]]
- [[reference/monster-image-gallery|Monster Image Gallery]]

Both pages include:

- Optional Dataview examples.
- Manual Markdown fallback cards (plugin-light workflow).

## 7) Quick Add Workflow

### Add a new NPC image set

1. Create `assets/images/npcs/<npc-slug>/`.
2. Add art files with role-based names.
3. Create/update `assets/images/npcs/<npc-slug>/index.md` with gallery frontmatter fields.
4. Update `content/people/<npc-slug>.md` image frontmatter and `## Image` section.
5. Add the NPC card to [[reference/npc-image-gallery|NPC Image Gallery]] if maintaining manual view.

### Add a new monster image set

1. Create `assets/images/monsters/<monster-slug>/`.
2. Add art files with role-based names.
3. Create/update `assets/images/monsters/<monster-slug>/index.md` with gallery frontmatter fields.
4. Set `creatureType` for category browsing.
5. Update `content/monsters/<monster-slug>.md` image frontmatter and `## Image` section.
6. Add the monster card to [[reference/monster-image-gallery|Monster Image Gallery]] if maintaining manual view.

## Related

- [[templates/person-npc-template|Person NPC Template]]
- [[templates/monster-template|Monster Template]]
- [[people/raelin-silverleaf|NPC Image Example]]
- [[monsters/winter-wolf|Monster Image Example]]
