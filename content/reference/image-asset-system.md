---
title: Image Asset System
tags:
  - reference
  - images
  - workflow
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

Examples:

- `assets/images/npcs/raelin-silverleaf/`
- `assets/images/monsters/winter-wolf/`

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

Recommended extensions:

- `.webp` for most art
- `.png` for tokens with transparency
- `.jpg` for photo-like source material
- `.svg` for placeholders/diagrams

Examples:

- `raelin-silverleaf-portrait.webp`
- `raelin-silverleaf-fullbody-v1.webp`
- `baby-unicorn-reference.webp`
- `dark-fey-dryad-token.png`
- `winter-wolf-alpha-reference.webp`
- `winter-wolf-frostbitten-variant-reference.webp`

## 3) Metadata Pattern (Markdown-Native)

Use both layers:

1. **Entity note frontmatter** for fast lookup in play.
2. **Asset folder `index.md`** for reusable image metadata.

### Entity note frontmatter fields

```yaml
image_primary: assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp
image_token: assets/images/npcs/raelin-silverleaf/raelin-silverleaf-token.png
image_gallery:
  - assets/images/npcs/raelin-silverleaf/raelin-silverleaf-fullbody-v1.webp
image_index: assets/images/npcs/raelin-silverleaf/index.md
```

### Asset folder `index.md` fields

```yaml
entity_type: npc | monster
entity_slug: raelin-silverleaf
entity_note: people/raelin-silverleaf
primary_image: assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp
token_image: assets/images/npcs/raelin-silverleaf/raelin-silverleaf-token.png
alternate_images:
  - assets/images/npcs/raelin-silverleaf/raelin-silverleaf-fullbody-v1.webp
source_notes: Prompt/source/license notes for internal tracking
tags:
  - npc
  - fae
  - starlight-enclave
```

Keep metadata concise and contributor-readable.

## 4) Embedding in Obsidian Notes

Preferred embed format:

```md
![[assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp|320]]
```

Fallback Markdown image link:

```md
![Raelin Silverleaf portrait](../../assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp)
```

## 5) Multiple Images and Galleries

Use one primary image, then list alternates in an image section.

- `image_primary` = default visual in note header/overview area.
- `image_token` = VTT token-ready image.
- `image_gallery` = optional alternates, scenes, form changes.
- `image_index` = companion metadata note in asset folder.

## 6) Monster-Builder Ready Conventions

For monsters, keep slug and variant naming parse-friendly:

- base: `winter-wolf`
- form: `winter-wolf-alpha`
- variant: `winter-wolf-frostbitten-variant`

This supports future automation for statblock pages, compendium generation, and Foundry-facing pipelines.

## 7) Contributor Checklist

- Create or reuse entity slug.
- Place image file(s) under matching folder.
- Follow naming pattern and role suffix.
- Update entity note frontmatter + `## Image` section.
- Create/update `assets/images/<type>/<slug>/index.md` metadata.
- Keep source/prompt notes short and practical.

## Related

- [[templates/person-npc-template|Person NPC Template]]
- [[templates/monster-template|Monster Template]]
- [[people/raelin-silverleaf|NPC Image Example]]
- [[monsters/winter-wolf|Monster Image Example]]
