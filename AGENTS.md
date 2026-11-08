# AGENTS.md - Polaris-Hubris

A Quartz v5 static site generator fork (`@jackyzha0/quartz` 5.0.0) wired to a Russian-language Obsidian campaign vault for the Daggerheart TTRPG. The published site is "Гордыня Поляриса" (`baseUrl: clu0d.github.io/Polaris-Hubris`, `locale: ru-RU`), deployed to GitHub Pages on every push to branch `v5`.

The repository has three halves, and they must not be mixed:
- `content/` - the campaign vault. This is what the live site shows.
- `quartz/` - the vendored generator. Campaign-specific behaviour does not belong here.
- `docs/` - the vendored upstream Quartz v5 documentation, built as a separate site.

## STRUCTURE

```
quartz.config.yaml     315-line plugin + theme config (the site's source of truth)
quartz.ts              entry point re-exporting the build
quartz/                144 files - generator code (components, plugins, processors, util, cli, i18n, styles, static)
content/               59 Markdown notes + 45 images - the campaign vault
docs/                  128 files - upstream Quartz documentation
.github/workflows/     deploy-v5.yaml is the only workflow that runs in this fork
```

## WHERE TO LOOK

| Path | Read it for |
|---|---|
| `quartz/AGENTS.md` | Layout of the generator, build flow, plugin model |
| `quartz/plugins/AGENTS.md` | Plugin loading, config entries, ordering |
| `quartz/components/AGENTS.md` | React rendering, component registry, page frames |
| `quartz/processors/AGENTS.md` | parse -> filter -> emit pipeline |
| `quartz/cli/AGENTS.md` | `quartz` command surface, argv flags |
| `quartz/util/AGENTS.md` | Path/slug helpers, build context types |
| `quartz/i18n/AGENTS.md` | Locale schema, `ru-RU`, 51 locale keys |
| `docs/AGENTS.md` | Upstream documentation tree and its taxonomy |
| `content/AGENTS.md` | The vault contract: `draft`, wikilinks, `%%`, filenames |
| `content/statblocks/AGENTS.md` | Daggerheart statblock schema (JSON + Markdown) |
| `content/Приключение/AGENTS.md` | Chapters, GM prep notes, standing DM rules |
| `content/Персонажи/AGENTS.md` | NPC dossiers and their GM blocks |
| `content/Главные герои/AGENTS.md` | Playable character sheet layout |
| `content/Локации/AGENTS.md` | Shards, districts, the dungeon tree |

## CODE MAP

- `quartz.config.yaml` - plugin list, theme, locale, `baseUrl`, `ignorePatterns`. Edit this to change the site, not the code.
- `quartz/build.ts` - the build driver: parse, filter, emit, write `public/`.
- `quartz/cfg.ts` - merges the YAML config with the CLI argv into the build context.
- `quartz/worker.ts` - worker pool used for parallel page processing.
- `quartz/plugins/index.ts` - `getStaticResourcesFromPlugins`, the entry the build uses to collect plugin assets.
- `quartz/plugins/loader/config-loader.ts` - resolves `quartz.config.yaml` plugin entries and instantiates their components.
- `quartz/components/renderPage.tsx` - `pageResources`, `renderTranscludes`, `renderPage`: produces every HTML page.
- `quartz/util/path.ts` - the slug/URL contract; the most-imported module in the repo.
- `quartz/cli/args.js` - argv definitions; `-d` defaults to `content` ("directory to look for content files").
- `content/index.md` - vault home and link hub.
- `content/statblocks/adversaries_ru.json` - the statblock library (129 adversaries) that other files cite by name.

## CONVENTIONS

- ESM everywhere; strict TypeScript with `noUnusedLocals` / `noUnusedParameters`; relative extensionless imports; no path aliases.
- Naming: camelCase files, lowercase directories, PascalCase plugin factories, `*.test.ts` colocated next to the file under test.
- Tests use `node:test` + `node:assert`, run through `tsx --test`.
- Prettier, not Biome: `printWidth 100`, `tabWidth 2`, `semi false`, `trailingComma all`, `quoteProps as-needed`. `.prettierignore` excludes only `public`, `node_modules`, `.quartz-cache`.
- Config keys are camelCase in YAML; plugin entries are `{source, enabled, options, order}`.
- Engines: Node >= 22, npm >= 10.9.2 (CI runs Node 24).

## ANTI-PATTERNS

- A plugin's `order` must place it after every plugin it depends on; collisions resolve silently.
- `--clean` and `--latest` are mutually exclusive, and `--concurrency` must be >= 1.
- The SPA router script must stay the last script on the page.
- On Windows, plugin paths must be converted to `file://` URLs before they reach the loader.
- Shared packages must resolve to a single instance across plugins.
- PR titles need a Conventional Commit prefix and a sentence disclosing LLM-generated changes.
- Never commit `.quartz-cache/` or `public/` build output.

## UNIQUE STYLES

- Upstream Quartz v5, not v4: the plugin/CLI architecture, the component registry and the page-frame layout are v5-only. Upstream v4 helpers (`quartz/bootstrap-frontmatter.mjs`, `quartz/bootstrap-emojis.mjs`) do not exist here.
- The campaign is authored as Obsidian-flavoured Markdown - wikilinks, `%%` hidden blocks, callouts, `![[image]]` embeds - and Quartz renders it through the Obsidian plugin stack.
- `npx quartz build` builds `content/` (the campaign). `npx quartz build -d docs` builds the documentation tree instead; `npm run docs` serves that tree, not the campaign.
- The inherited CI workflows (`ci.yaml`, `build-preview.yaml`, `deploy-preview.yaml`) are gated on `github.repository == 'jackyzha0/quartz'` and therefore never run in this fork. `deploy-v5.yaml` is the only live workflow. Nothing enforces `npm run check` or `npm test` here - run them yourself.
- Mechanics inside Russian prose stay half-English (`Mark a Stress`, `Spend a Fear`, `range: Melee`), and the vault mixes Russian and English statblock copies on purpose.

## COMMANDS

| Command | Effect |
|---|---|
| `npx quartz build` | Build the campaign site into `public/` |
| `npx quartz build --serve` | Local preview of the campaign |
| `npx quartz build -d docs` | Build the documentation tree instead |
| `npx quartz plugin install` | Install the plugins named in `quartz.config.yaml` |
| `npm run install-plugins` | Same via `tsx`; also the `prebuild` hook |
| `npm run check` | `tsc --noEmit` + `prettier --check` (covers `content/` and `docs/`) |
| `npm test` | `tsx --test` (node:test) |
| `npm run format` | `prettier --write` - rewrites Markdown too, review the diff |
| `npm run docs` | `quartz build --serve -d docs` - serves the docs tree |
| `npm run quartz -- <args>` | The `quartz` CLI (`quartz/bootstrap-cli.mjs`) |
| `npm run profile` | `0x` profile of a `--concurrency=1` build |

## NOTES

- `npm run check` currently fails on `content/statblocks/flumph_combat_ru.json`: a trailing comma before `]` on line 58 makes the file invalid JSON, and Prettier's JSON parser rejects it. Fix the comma before expecting a green check.
- `docs/cli/build.md` and `docs/getting-started/installation.md` disagree on what `-d` means; `quartz/cli/args.js` is the authority (`content` by default).
- `quartz/util/emojimap.json` is 15.3 MB of generated data and dominates the repository size.
- The published campaign notes reference a handful of files that do not exist (for example `Pasted image 20260907133950.png`); `disableBrokenWikilinks: true` turns those into silent plain text.
