# DIGEST quartz/
## SCOPE
The vendored Quartz v5 site generator (144 tracked files). TS core + JS CLI, SCSS styles, plugin loader, processors, components, i18n.
## KEY FILES
- `quartz/build.ts` (430) - build pipeline driver (parse -> filter -> emit).
- `quartz/worker.ts` (37), `quartz/cfg.ts` (106), `quartz.ts` (7) - entry points.
- `quartz.config.yaml` (315) lives at repo root, not here.
## EXPORTS
`quartz/plugins/index.ts` -> `getStaticResourcesFromPlugins`; `quartz/plugins/types.ts` -> `PluginTypes`, transformer/filter/emitter/pageType shapes; `quartz/util/ctx.ts` -> `Argv`, `BuildCtx`, `BuildTimeTrieData`, `HashedResourceNames`.
## CONVENTIONS
ESM only; strict TS with `noUnusedLocals`/`noUnusedParameters`; extensionless relative imports; camelCase filenames, lowercase directories; PascalCase plugin factory functions; colocated `*.test.ts` (node:test + node:assert); YAML config keys camelCase; plugin entries carry numeric `order` (default 50); Prettier not Biome.
## ANTI-PATTERNS
- Plugin `order`: a plugin's dependencies must not run after the plugin that depends on them.
- `--clean` and `--latest` are mutually incompatible.
- `--concurrency` must be >= 1.
- The SPA router script must stay the last script on the page.
- On Windows, plugin paths must be converted to `file://` URLs.
- Singleton packages must resolve to exactly one instance.
- PR titles need a Conventional Commit prefix and an LLM-disclosure sentence.
## HOTSPOTS
`quartz/cli/plugin-git-handlers.js` (1,768 LOC) - largest file in the repo; `quartz/plugins/loader/gitLoader.ts` (1,173); `quartz/plugins/loader/config-loader.ts` (976); `quartz/cli/handlers.js` (801); `quartz/styles/base.scss` (684); `quartz/plugins/emitters/componentResources.ts` (525).
Highest-centrality modules: `quartz/util/path.ts`, `quartz/plugins/index.ts`, `quartz/plugins/loader/config-loader.ts`, `quartz/processors/parse.ts`.
## COMMANDS
`npx quartz build` / `--serve` / `-d docs` / `--bundleInfo`; `npm run check` (tsc --noEmit + prettier --check); `npm test` (tsx --test); `npm run format`; `npx quartz plugin install`; `npm run install-plugins`; `npm run profile` (0x).
## NOTES
`quartz/util/emojimap.json` is a 15.3 MB generated data file - excluded from size budgets.
`quartz/bootstrap-frontmatter.mjs` and `quartz/bootstrap-emojis.mjs` do not exist in this checkout.
