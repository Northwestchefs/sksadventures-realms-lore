# NPC Images

Store all NPC art under a unique slug folder:

- `assets/images/npcs/<npc-slug>/`

Recommended roles:

- `portrait`
- `fullbody`
- `token`
- `reference`
- `scene`
- `variant`

Each slug folder should include `index.md` with lightweight metadata.

Minimum gallery-friendly frontmatter:

```yaml
entity_type: npc
entity_slug: <npc-slug>
entity_note: people/<npc-slug>
image: assets/images/npcs/<npc-slug>/<npc-slug>-portrait.webp
imageRole: portrait
tags:
  - npc
status: active
```

See [[reference/npc-image-gallery|NPC Image Gallery]] and [[reference/image-asset-system|Image Asset System]].
