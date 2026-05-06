# Nullspace Visual QA (Quick Pass)

## Scope

Quick visual validation for theme readability and icon mapping relevance across common stacks:

- Next.js / React / Node
- Python
- General config-heavy repositories

## Readability Checks

- UI contrast remains stable in explorer, tabs, side panels, and terminal.
- Syntax token families remain clearly separated (keywords, strings, functions, types, numbers).
- Tree status decorations remain visible with both icon variants.

## Icon Coverage Checks

Core file types validated:

- `ts`, `tsx`, `js`, `jsx`, `json`, `md`
- `css`, `scss`, `html`, `svg`
- `png`, `jpg`, `pdf`, `zip`, `txt`
- `py`, `rs`, `go`, `java`, `php`, `sql`, `graphql`, `prisma`, `wasm`

Priority config mappings added:

- `next.config.{js,ts,mjs,cjs}`
- `vite.config.{js,ts,mjs,cjs}`
- `tailwind.config.{js,ts,mjs,cjs}`
- `postcss.config.{js,cjs,mjs}`
- `eslint.config.{js,mjs,cjs}`
- `.eslintrc*`, `.prettierrc*`
- lock files (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)

Special folders tuned:

- `src`, `app`, `components`, `pages`, `api`
- `node_modules`, `dist`, `out`, `scripts`, `server`
- `styles`, `assets`, `public`, `tests`, `docs`
- `.git`, `.github`, `.vscode`

## Next QA Iteration (Optional)

- Add framework-specific directories (`routes`, `stores`, `composables`, `migrations`)
- Add language-specific configs (`pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml`)
- Run side-by-side screenshot diff (vivid vs muted) before first public release
