# Nullspace Icon Mini Style Guide

This guide keeps icons cohesive and readable at 16x16.

## Geometry

- `viewBox="0 0 16 16"` for all icons.
- Rounded joins/caps (`round`) for readability at small sizes.
- Prefer simple silhouettes first, detail second.

## Strokes and Fill

- Base stroke thickness: `1.25`.
- Icon body uses a flat filled shape with a subtle outline.
- Glyphs should remain simple (1-2 primitives when possible).

## Opacity

- Use controlled alpha overlays for depth (`withAlpha(...)` helper).
- Folder tab and body use two close opacities to preserve Material-like layering.

## Color

- All colors must come from `palette.ts`.
- Keep category semantics consistent:
  - TypeScript/JS code: blue/yellow families
  - Config: yellow
  - Styles: cyan
  - Markup: red
  - Images/assets: purple

## Folder Consistency

- Default folder shape and tab must remain identical.
- Special folders differ only by color + minimal glyph.
- Open/closed states keep the same visual language.
