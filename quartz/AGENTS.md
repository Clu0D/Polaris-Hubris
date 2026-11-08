# AGENTS.md - quartz/

Vendored Quartz v5 site generator (144 tracked files) that renders this repo's campaign vault. Upstream code from `jackyzha0/quartz` v5 - treat it as a dependency snapshot, not as campaign code. Repo-wide conventions (ESM, strict TS, Prettier, Node version) live in the root `AGENTS.md`.

## STRUCTURE

| Path | Files | Role |
|---|---|---|
| `build.ts` | 1 | Build driver: parse -> filter -> emit -> write |
| `worker.ts` | 1 | Worker pool entry for parallel page processing |
| `cfg.ts` | 1 | Runtime config assembly (`Argv`, `BuildCtx`, locale) |
| `processors/` | 5 | Content pipeline (see `processors/AGENTS.md`) |
| `plugins/` | 30 | Plugin runtime + loader (see `plugins/AGENTS.md`) |
| `components/` | 31 | React rendering, component registry, page frames (see `components/AGENTS.md`) |
| `i18n/` | 32 | Locale schema + 30 locales (see `i18n/AGENTS.md`) |
| `cli/` | 11 | yargs CLI surface (see `cli/AGENTS.md`) |
| `util/` | 21 | Path/slug/context helpers (see `util/AGENTS.md`) |
| `styles/` | 5 | SCSS, `@use` based, no underscore partials |
| `static/` | 4 | Copied verbatim to `public/` |

## CODE MAP

- `quartz/build.ts` - orchestrates the pipeline, writes `public/`.
- `quartz/cfg.ts` - merges `quartz.config.yaml` with CLI argv into `BuildCtx`.
- `quartz/plugins/index.ts` - `getStaticResourcesFromPlugins`; the single entry the build uses to collect plugin assets.
- `quartz/plugins/loader/config-loader.ts` - resolves the plugin list from `quartz.config.yaml` and instantiates plugin components.
- `quartz/processors/parse.ts` - markdown -> AST; owns the frontmatter contract the campaign depends on.
- `quartz/components/renderPage.tsx` - `pageResources`, `renderTranscludes`, `renderPage`; produces every HTML page.
- `quartz/cli/args.js` - argv definitions; `-d` defaults to `content` ("directory to look for content files").

## CONVENTIONS

- The site config lives at the repo root (`quartz.config.yaml`), not in this directory; `quartz/plugins/quartz-plugins.schema.json` is the schema it references.
- Plugin entries are `{source, enabled, options, order}`; `order` defaults to 50 and is the only ordering mechanism.
- Components and plugins are registered by name through the singleton `componentRegistry`; nothing imports a page layout directly.
- Comments explain *why* (e.g. the manual transclusion walk in `renderPage.tsx`), not what.

## ANTI-PATTERNS

- Never edit `quartz/util/emojimap.json` - it is generated and is 15.3 MB of the repository.
- Never add campaign-specific logic to `quartz/`: campaign changes belong in `content/` or `quartz.config.yaml`.
- Do not rename the files `quartz/bootstrap-frontmatter.mjs` / `quartz/bootstrap-emojis.mjs` - they do not exist in this checkout, unlike upstream Quartz v4.
- Do not convert `cli/` to TypeScript: `cli/` is loaded directly by `quartz/bootstrap-cli.mjs` without a compile step.
- Do not add an `index.ts` barrel to a directory that has none; the barrels that exist (`plugins/index.ts`, `components/index.ts`, `util/path.ts`) are part of the public surface.

## HOTSPOTS

- `cli/plugin-git-handlers.js` (1,768 LOC) - largest file in the repository.
- `plugins/loader/gitLoader.ts` (1,173), `plugins/loader/config-loader.ts` (976), `cli/handlers.js` (801), `styles/base.scss` (684), `plugins/emitters/componentResources.ts` (525).
- Highest centrality: `util/path.ts`, `plugins/index.ts`, `plugins/loader/config-loader.ts`, `processors/parse.ts`.

## COMMANDS

- `npx quartz build` - build the site (default `-d content`, i.e. the campaign vault).
- `npx quartz build --serve` - local preview of the campaign.
- `npx quartz build -d docs` / `--bundleInfo` - build the `docs/` tree instead.
- `npx quartz plugin install` - install git/npm plugins listed in `quartz.config.yaml`.
- `npm run install-plugins` - same via `tsx`, and it is the `prebuild` hook.
- `npm run profile` - `0x` profile of a `--concurrency=1` build.
