# Nullspace Theme Pack

Nullspace is a VS Code theme pack with:

- a dark Cursor-inspired color theme (`Nullspace`)
- an icon theme based on official Material Icon Theme assets (`Nullspace Icons (Material)`)
- utility commands to apply defaults and toggle between Material and Seti

## Install

### Local development

```bash
npm install
npm run build
npm run compile
```

Then press `F5` in VS Code and test in the Extension Development Host.

### Package a VSIX

```bash
npm run package
```

## Commands

- `Nullspace: Apply Recommended Settings`
  - applies color theme + current Nullspace icon variant
  - applies lightweight UI defaults for this theme pack
- `Nullspace: Toggle Icon Saturation`
  - toggles between `Nullspace Icons (Material)` and `Seti (Visual Studio Code)`

## Icon Theme

- **Material**: default, powered by official Material Icon Theme mappings and SVG assets.

Set manually in settings:

```json
{
  "nullspace.iconVariant": "material"
}
```

## Recommended Settings Snippet

```json
{
  "workbench.colorTheme": "Nullspace",
  "workbench.iconTheme": "nullspace-icons",
  "editor.guides.indentation": true,
  "editor.minimap.enabled": false,
  "workbench.tree.renderIndentGuides": "always",
  "workbench.editor.highlightModifiedTabs": true
}
```

## Profiles

### Web

```json
{
  "workbench.colorTheme": "Nullspace",
  "workbench.iconTheme": "nullspace-icons",
  "nullspace.iconVariant": "vivid",
  "editor.minimap.enabled": false
}
```

### Backend

```json
{
  "workbench.colorTheme": "Nullspace",
  "workbench.iconTheme": "nullspace-icons",
  "nullspace.iconVariant": "material",
  "editor.guides.indentation": true
}
```

### Minimal

```json
{
  "workbench.colorTheme": "Nullspace",
  "workbench.iconTheme": "vs-seti",
  "editor.minimap.enabled": false,
  "workbench.editor.showTabs": true
}
```

## Screenshots

- Add screenshots under `docs/screenshots/` and reference them here for Marketplace-ready previews.
- Current local references used during iteration are outside the repository.

## Visual QA and Icon Rules

- QA checklist and mapping updates: `docs/qa-visual.md`
- Icon mini style guide: `docs/icon-style-guide.md`

## Roadmap

- refine folder-open dedicated variants per special folder
- add framework-focused icons (`nuxt`, `svelte`, `terraform`, `k8s`)
- ship a high-contrast Nullspace variant
