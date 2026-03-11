# ZIP staging

Place one or more image ZIP files in this folder, then run:

```bash
npm run images:import-zips
```

## ZIP formats supported

### 1) Structured ZIP (recommended)

Use approved top-level folders inside the archive:

- `npcs/`
- `monsters/`
- `locations/`
- `items/`
- `factions/`
- `misc/`

### 2) Flat ZIP (quick import)

If the ZIP contains image files at the root (no folders), they will be imported to:

- `assets/images/misc/<zip-name-slug>/` (default: one folder per ZIP)

Optional target/path override:

```bash
npm run images:import-zips -- --target npcs --path core/drow/female/dark-elf-fantasy-pack-01
```

If you pass `--target` and `--path`, flat ZIPs still create a `<zip-name-slug>/` folder by default:

- `assets/images/<target>/<path>/<zip-name-slug>/`

Optional override to import flat ZIP files directly into the path (without the extra ZIP slug folder):

```bash
npm run images:import-zips -- --target npcs --path core/drow/female/dark-elf-fantasy-pack-01 --flat-direct
```

## Troubleshooting

If you see an error about "invalid top-level folder(s)" for a ZIP that only has image files at the root:

1. Make sure `scripts/assets/import-image-zips.mjs` has no merge conflict markers.
2. Re-run the importer:

```bash
npm run images:import-zips
```
