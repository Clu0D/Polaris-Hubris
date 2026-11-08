# CHUNK c2-code-ui

## INVENTORY

**quartz/components** — 31 files, ~2,785 lines (30 `.ts`/`.tsx` + 1 `.scss`; 5 of them `*.test.ts`).
Layout: 17 files flat at the root, plus subdirs `frames/` (7: 3 frame components, `index.ts` barrel, `registry.ts`, `types.ts`, `frames.test.ts`), `pages/` (`404.tsx`), `scripts/` (5: `popover.inline.ts`, `spa.inline.ts`, `util.ts`, `popover.test.ts`, `search.test.ts`), `styles/` (`popover.scss`).
Entry files: `components/index.ts` (public barrel), `components/renderPage.tsx` (HTML shell + transclusion engine), `components/registry.ts` (component registry), `components/frames/index.ts` (frame resolution).

**quartz/i18n** — 32 files, ~2,819 lines. `index.ts` (90), `locales/definition.ts` (88), and 30 locale files (`ar-SA`…`zh-TW`, 85–107 lines each). Entry: `i18n/index.ts`; schema: `i18n/locales/definition.ts`. No markdown/yaml content here.

**quartz/.github/workflows** — 1 file, 61 lines: `deploy.yml` (YAML; push to branch `v5` → GitHub Pages).

## EXPORTS

`components/index.ts` (plugin-facing surface): values `componentRegistry`, `defineComponent`, `External`, `Head`, `Spacer`, `DesktopOnly`, `MobileOnly`, `NotFound`, `Flex`, `ConditionalRender`; types `ComponentManifest`, `RegisteredComponent`, `QuartzComponent`, `QuartzComponentConstructor`, `QuartzComponentProps`.

Direct module exports (real names): `registry.ts` → `ComponentRegistry` (class), `componentRegistry` (singleton), `defineComponent`, interfaces `ComponentManifest` (name, displayName, description, version, quartzVersion?, author?, homepage?, defaultPosition?, defaultPriority?), `RegisteredComponent` ({component, source, manifest?}). `types.ts` → `QuartzComponentProps`, `QuartzComponent`, `QuartzComponentConstructor`. `external.ts` → `External<Options>(name, options?)`. `renderPage.tsx` → `pageResources`, `renderTranscludes`, `renderPage`. `Date.tsx` → `getDate`, `formatDate`, `Date`, `ValidDateType`. `PageList.tsx` → `SortFn`, `byDateAndAlphabetical`, `byDateAndAlphabeticalFolderFirst`, `PageList`. `frames/index.ts` → `resolveFrame`, `DefaultFrame`, `FullWidthFrame`, `MinimalFrame`, `frameRegistry`, types `PageFrame`, `PageFrameProps`, `RegisteredFrame`. `Body/Header/Spacer/Head/404` default-export a zero-arg constructor; `Flex/ConditionalRender/DesktopOnly/MobileOnly` default-export a config-taking constructor.

i18n: `TRANSLATIONS` (51 locale keys → 30 files), `defaultTranslation = "en-US"`, `i18n(locale)`, types `ValidLocale`, `ValidCallout`; `definition.ts` exports interfaces `Translation` and `CalloutTranslation`.

`Translation` schema keys: `propertyDefaults{title,description}`, `direction?("ltr"|"rtl")`, `components{callout(13), backlinks{title,noBacklinksFound}, themeToggle{lightMode,darkMode}, readerMode{title}, explorer{title}, footer{createdWith}, graph{title}, recentNotes{title,seeRemainingMore}, transcludes{transcludeOf,linkToOriginal}, search{title,searchBarPlaceholder}, tableOfContents{title}, contentMeta{readingTime}}`, `pages{rss{recentNotes,lastFewNotes}, error{title,notFound,home}, folderContent{folder,itemsUnderFolder}, tagContent{tag,tagIndex,itemsUnderTag,showingFirst,totalTags}}`.

## CONVENTIONS

- Component factory pattern: every component default-exports `(() => Component) satisfies QuartzComponentConstructor` — a constructor returning the component, not the component itself. Config variants use `((config: X) => {...}) satisfies QuartzComponentConstructor<X>`; `satisfies` replaces explicit return-type annotations throughout.
- Relative imports only (`../i18n`, `../util/path`, `./types`); no path aliases.
- Prettier (root `.prettierrc`): printWidth 100, no semicolons, double quotes, trailing commas `all`, 2-space indent.
- One barrel `index.ts` per directory; `frames/index.ts` keeps a private `builtinFrames` record and a `resolveFrame` fallback chain (plugin registry → built-ins → `DefaultFrame`).
- Locale files are `export default {...} as const satisfies Translation`; plural helpers (`getForm(number, form1, form2, form5)`) are defined locally per file (ru-RU, lt-LT) rather than centralized.
- Region aliases reuse one file: `ar-AE/ar-QA/…/ar-MR` → `ar-SA`, `nl-BE` → `nl-NL`, `ro-MD` → `ro-RO` (30 files → 51 keys).
- `direction: "rtl" as const` appears only in `ar-SA.ts`, `fa-IR.ts`, `he-IL.ts` — explicit per-locale opt-in.
- Browser scripts are named `*.inline.ts` (popover, spa); shared helpers are not (`scripts/util.ts`).
- Tests are colocated `*.test.ts` using `node:test` + `node:assert`.
- `pages/404.tsx` hardcodes Russian prose ("Эту загадку ещё предстоит раскрыть.", "Вернуться на главную", "Обратные ссылки") instead of using `Translation.pages.error` — the only user-facing string bypassing i18n.

## ANTI-PATTERNS

- No literal "DO NOT / NEVER / ALWAYS / DEPRECATED" strings exist in scope; rules are encoded as comments and behavior.
- `registry.ts:21` `/** @internal Exported for testing only. */` on `ComponentRegistry`; `registry.ts:115` `/** @internal For testing only — resets all registry state. */` on `clear()`; `renderPage.tsx:112` same marker on `renderTranscludes` — test seams exported from production modules.
- `registry.ts:108-110` `catch { // Skip components that fail to instantiate }` — instantiation errors are swallowed silently.
- `registry.ts:34-36` and `frames/registry.ts:13-17`: re-registering a name from a different source warns and overwrites (last-wins, never throws).
- `frames/index.ts:43-50`: unknown frame → `console.warn` + fall back to `DefaultFrame`; never throws.
- `external.ts:9-13`: missing component → throws with remediation text ("Make sure the plugin is installed and components are loaded before layouts are evaluated.").
- `renderPage.tsx:124-127` (do not revert): transclusions are walked manually, not via `visit()`, because visit "runs the callback before descending into replaced children, so a Set-based guard there falsely rejects sibling transclusions of the same target."
- `renderPage.tsx:144-160`: circular transclusion → warn `Skipping circular transclusion: {slug} -> {target}` and replace the blockquote with a styled paragraph.
- `renderPage.tsx:304-311`: during `--serve` the dev server serves from root, so `basePath` must be empty to avoid broken links.
- `Date.tsx:11-16`: `getDate` throws when `defaultDateType` is unset (CreatedModifiedDate plugin must be configured).
- `scripts/util.ts:32-36`: canonical redirect is extracted by regex — "probably faster than parsing the entire HTML … even if way less robust".
- `spa.inline.ts`: `window.addCleanup` registry is flushed before each navigation; ctrl/meta clicks are deliberately not hijacked ("dont hijack behaviour").
- `scripts/popover.inline.ts`: never refetches an existing popover; in-popover ids are prefixed `popover-internal-` to avoid duplicates.
- `scripts/search.test.ts:4` duplicates the encoder "from search.inline.ts" — **that file does not exist anywhere in the repo**, so the test exercises a copy, not shipped code.

## HOTSPOTS

No file exceeds 500 lines. Largest by far:
- `quartz/components/renderPage.tsx` (381) — concentrated logic: `pageResources` (baseDir prefixing, inline→external extraction, contentIndex), `renderTranscludes` (page/block/header transclusion + cycle detection), `renderPage` (html lang/dir, basePath resolution, frame dispatch).
- `quartz/components/renderPage.test.ts` (327), `quartz/components/scripts/spa.inline.ts` (251), `quartz/components/scripts/popover.inline.ts` (141), `quartz/components/registry.ts` (142; instance cache keyed by constructor identity + `JSON.stringify(options)`, cleared on option-override change), `quartz/components/pages/404.tsx` (131, mostly inline client script), `quartz/i18n/locales/lt-LT.ts` (107), `ru-RU.ts` (99).
- High-centrality modules: `components/types.ts` (types imported by 9 in-repo files incl. `cfg.ts`, `plugins/types.ts`, `plugins/pageTypes/dispatcher.ts`), `components/registry.ts` (`componentRegistry` used by `plugins/loader/{componentLoader,config-loader,gitLoader}`, `plugins/emitters/componentResources.ts`), `components/renderPage.tsx` (`pageResources`/`renderPage` used by `plugins/pageTypes/dispatcher.ts`), `quartz/i18n` (imported by `cfg.ts`, `components/Date.tsx`, `components/Head.tsx`, `components/renderPage.tsx`, `plugins/pageTypes/404.ts`).

## COMMANDS

Root `package.json` scripts:
- `npm run check` → `tsc --noEmit && npx prettier . --check` (typecheck + format lint over all scoped TS/TSX).
- `npm test` → `tsx --test` (node:test runner; runs the 5 `*.test.ts` files under `quartz/components`).
- `npm run format` → `npx prettier . --write`.
- `npm run docs` → `npx quartz build --serve -d docs` (dev server).
- `npm run quartz -- <args>` → `./quartz/bootstrap-cli.mjs` (CLI entry).
- `prebuild` → `install-plugins` → `npx tsx ./quartz/plugins/loader/install-plugins.ts` (auto-runs before build).
- `npm run profile` → `0x -D prof ./quartz/bootstrap-cli.mjs build --concurrency=1`.
- Engines: node ≥22, npm ≥10.9.2 (CI pins Node 24).

`quartz/.github/workflows/deploy.yml` (push to `v5`): `npm ci` → `npx quartz plugin install` → `npx quartz build` → upload `public/` via `actions/upload-pages-artifact@v3` → `actions/deploy-pages@v4`.

Root `.github/workflows/ci.yaml` (read only to explain commands): on PR/push to `v5`, matrix `windows/macos/ubuntu-latest`, gated by `github.repository == 'jackyzha0/quartz'` — **it never runs in this fork**. Steps: `npm install` → `npx quartz plugin install` → `npm run check` → `npm test` → `npx quartz build --bundleInfo -d docs`.

<results>
<files>
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/index.ts - public barrel; the exported surface plugin authors import
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/registry.ts - ComponentRegistry, componentRegistry, defineComponent, ComponentManifest, RegisteredComponent
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/types.ts - QuartzComponent / QuartzComponentProps / QuartzComponentConstructor; most-imported type module
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/external.ts - External(name, options) lookup with actionable error
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/renderPage.tsx - pageResources, renderTranscludes, renderPage; largest/hottest file (381 LOC)
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/frames/index.ts - resolveFrame, built-in frame list, fallback rules
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/frames/registry.ts - frameRegistry, RegisteredFrame, overwrite warning
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/frames/types.ts - PageFrame / PageFrameProps contracts
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/frames/DefaultFrame.tsx - three-column default shell
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/frames/FullWidthFrame.tsx - sidebarless frame
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/frames/MinimalFrame.tsx - chrome-free frame
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/pages/404.tsx - hardcoded-Russian 404 with inline client script
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/Date.tsx - getDate / formatDate / Date / ValidDateType
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/PageList.tsx - SortFn, byDateAndAlphabetical, PageList
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/Head.tsx - head/meta/OG generation, i18n defaults
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/Flex.tsx - FlexConfig layout wrapper
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/ConditionalRender.tsx - conditional wrapper component
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/DesktopOnly.tsx - desktop-only wrapper
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/MobileOnly.tsx - mobile-only wrapper
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/Header.tsx - header shell used by frames
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/Body.tsx - #quartz-body shell
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/Spacer.tsx - spacer element
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/scripts/spa.inline.ts - micromorph SPA router, route announcer, cleanup registry
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/scripts/popover.inline.ts - floating-ui hover popovers
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/scripts/util.ts - registerEscapeHandler, removeAllChildren, fetchCanonical
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/styles/popover.scss - popover styling
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/registry.test.ts - registry/cache/override tests
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/renderPage.test.ts - transclusion + pageResources tests
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/frames/frames.test.ts - resolveFrame tests
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/scripts/popover.test.ts - popover scroll/heading regression tests
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/components/scripts/search.test.ts - inlined encoder copy; references a non-existent search.inline.ts
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/i18n/index.ts - TRANSLATIONS (51 keys), i18n(), ValidLocale, ValidCallout
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/i18n/locales/definition.ts - Translation and CalloutTranslation schema
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/i18n/locales/ru-RU.ts - Russian locale with getForm plural helper
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/i18n/locales/ar-SA.ts - RTL locale (direction: "rtl")
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/i18n/locales/fa-IR.ts - RTL locale
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/i18n/locales/he-IL.ts - RTL locale
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/i18n/locales/en-US.ts - default translation source of truth
- D:/RP/campaigns/Polaris/Polaris-Hubris/quartz/.github/workflows/deploy.yml - scoped CI: Pages deploy on v5
- D:/RP/campaigns/Polaris/Polaris-Hubris/package.json - scripts: check, test, format, docs, profile, prebuild
</files>

<answer>
The UI layer of this Quartz v5 fork is a self-contained component registry plus a pluggable "page frame" system.

Flow: plugins register components into the singleton `componentRegistry` (`quartz/components/registry.ts`) keyed by name, optionally with a `ComponentManifest`. `quartz/plugins/loader/config-loader.ts` resolves a registered entry, merges YAML options with `componentRegistry.getOptionOverrides(pluginName)`, and calls `componentRegistry.instantiate(ctor, opts)`; the registry caches by constructor identity + JSON-serialized options so the same component never emits duplicate `afterDOMLoaded` scripts across page-type layouts (the cache is cleared whenever option overrides change).

Rendering: `quartz/plugins/pageTypes/dispatcher.ts` calls `pageResources(baseDir, staticResources, ctx)` to build CSS/JS URLs (baseDir-prefixed in production, empty in `--serve` mode) and then `renderPage(cfg, slug, componentData, components, pageResources, treeTransforms)`. `renderPage` clones the HAST tree, runs `renderTranscludes` (page/block/header transclusion with cycle detection that deliberately avoids `visit()` so sibling embeds of the same target work), applies plugin tree transforms, then emits `<html lang dir>` + `<head>` + `<body data-slug data-basepath>` + `<div id="quartz-root" class="page" data-frame=...>` and delegates the inner layout to `resolveFrame(frameName)`.

Frames are the layout abstraction: `default` (three-column, original Quartz), `full-width` (no sidebars), `minimal` (body + footer only). Plugin frames registered in `frameRegistry` take priority; an unknown name warns and falls back to `default` rather than throwing.

i18n: `i18n/locales/definition.ts` is the schema (`Translation`, `CalloutTranslation`); each of30 locale files is `export default {...} as const satisfies Translation`; `i18n/index.ts` maps 51 locale keys onto those 30 files via aliases. Only `ar-SA`, `fa-IR`, `he-IL` set `direction: "rtl"`.

CI: `quartz/.github/workflows/deploy.yml` builds on push to `v5` with `npm ci` → `npx quartz plugin install` → `npx quartz build` → Pages deploy. The root `ci.yaml` that runs `npm run check` and `npm test` is gated on `github.repository == 'jackyzha0/quartz'`, so it never executes in this fork — locally run `npm run check` and `npm test` yourself.

Notable deviations from stock Quartz: `pages/404.tsx` hardcodes Russian strings instead of using `Translation.pages.error`; `components/index.ts` does not re-export `Header` or `PageList`; `components/scripts/search.test.ts` tests an inlined copy of an encoder whose source (`search.inline.ts`) is absent from the repo.
</answer>

<next_steps>
Ready to proceed - no follow-up needed. If deeper coverage of the loader side is wanted next, the natural next chunk is `quartz/plugins/loader/*` (config-loader.ts and componentLoader.ts are the actual producers for the registry and frame APIs documented above).
</next_steps>
</results>

[task_id: st_01a181db - continue with task_send(to="st_01a181db", message="...")]