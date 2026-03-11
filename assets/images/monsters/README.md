# Monster Images

Store all monster art under a unique slug folder:

- `assets/images/monsters/<monster-slug>/`

Recommended roles:

- `reference`
- `token`
- `scene`
- `variant`
- `portrait` (optional for humanoid monsters)

Each slug folder should include `index.md` with lightweight metadata for reuse in future monster-builder workflows.

Minimum gallery-friendly frontmatter:

```yaml
entity_type: monster
entity_slug: <monster-slug>
entity_note: monsters/<monster-slug>
image: assets/images/monsters/<monster-slug>/<monster-slug>-reference.webp
imageRole: reference
creatureType: beast
tags:
  - monster
  - beast
status: active
```

See [[reference/monster-image-gallery|Monster Image Gallery]] and [[reference/image-asset-system|Image Asset System]].
