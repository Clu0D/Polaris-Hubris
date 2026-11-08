# CHUNK c3-docs

## INVENTORY

Scope is a single path: `D:/RP/campaigns/Polaris/Polaris-Hubris/docs`. It contains **no code** — a `find` for `*.{ts,tsx,js,jsx,json,yaml,yml,css}` returns zero files. It is a vendored copy of the upstream Quartz v5 documentation set, published alongside the campaign vault in `content/`.

| Path | Files | Lines | Type |
|---|---|---|---|
| `docs/` (root) | 9 md | 1,467 | Markdown |
| `docs/advanced/` | 5 md | 1,224 | Markdown |
| `docs/cli/` | 8 md | 714 | Markdown |
| `docs/features/` | 30 md | 1,760 | Markdown |
| `docs/getting-started/` | 6 md | 786 | Markdown |
| `docs/plugins/` | 51 md | 2,702 | Markdown |
| `docs/tags/` | 2 md | 8 | Markdown |
| `docs/images/` | 12 png | — | Binary assets |

Totals: **111 markdown files, ~8,661 lines**, plus `docs/Base.base` (135 lines, YAML) and `docs/Canvas.canvas` (321 lines, JSON Canvas) as demo fixtures, and 12 PNGs in `docs/images/`.

Frontmatter pattern is uniform: every `.md` opens with `---` on line 1, `title:` on line 2, closing `---` on line 3 (or line 5 when an `aliases:` list sits between).

Filenames are **not** kebab-case. Three styles coexist: lowercase (`configuration.md`, `hosting.md`), lowercase-with-spaces (`advanced/creating components.md`, `features/full-text search.md`, `features/Docker Support.md`), and TitleCase (`features/Obsidian compatibility.md`, `plugins/CustomOgImages.md`, `plugins/EncryptedPages Demo.md`). Spaces and mixed case in filenames are normal here.

## EXPORTS

There are no code exports. The "public surface" of this scope is the **content entity model**, defined by `docs/Base.base` (a Bases query file) and the tag taxonomy:

- **Document kinds** (`formula.doc_type` in `docs/Base.base`): `transformer`, `emitter`, `filter`, `component`, `feature`, `advanced`, `plugin`, `getting-started`, `cli`, fallback `guide`.
- **Sections** (`formula.section`): `plugins`, `features`, `advanced`, `getting-started`, `cli`, `tags`, `core`.
- **Tag namespace**: `plugin/transformer`, `plugin/filter`, `plugin/emitter`, `plugin/component`, `plugin/pageType` (the last appears in `docs/plugins/index.md`), plus `feature/transformer`, `feature/filter`, `feature/emitter`, and bare `component` in `docs/features/*`.

Frontmatter schema keys actually observed:

- Universal: `title`.
- Docs-wide: `tags` (YAML list), `aliases` (YAML list), `description`, `image`.
- Plugin-doc only: `repository` (markdown link string, e.g. `"[quartz-community/backlinks](https://github.com/quartz-community/backlinks)"`), `enabled: true|false`, `required: true|false`.
- One-offs: `publish: true` and `enableToc: true` (`docs/plugins/Frontmatter.md:10-11`), `quartz-properties: true` (same file, line 78), `draft: false` (inside a code sample, `docs/getting-started/authoring-content.md:22`).
- 75 of 111 files carry `tags`; the 36 without are all root-level md, all `cli/`, all `advanced/`, 5 of 6 `getting-started/`, 6 `features/` (`i18n`, `index`, `popover previews`, `RSS Feed`, `social images`, `wikilinks`), both `tags/`, and `plugins/index.md`.

Public API symbols referenced from these docs (the actual exported names other modules import): `ExternalPlugin.X()` vs core `Plugin.X()`, `Component.Flex()`, `defineConfig`, `loadQuartzConfig`, `loadQuartzLayout`, `QuartzTransformerPlugin`, `QuartzComponent`, `simplifySlug`, `resolveRelative`, `pathToRoot`, `htmlToJsx`, `classNames`, `capitalize`, `formatDate`, `getDate`, `byDateAndAlphabetical`, `escapeHTML`, `unescapeHTML`, `getIconCode`, `onNav`, `onRender`, `fetchContentIndex`, `removeAllChildren`, `registerEscapeHandler` — sourced from `@quartz-community/types`, `@quartz-community/utils/{path,dom,jsx,lang,date,sort,escape,emoji}`, `@quartz-community/runtime`.

## CONVENTIONS

- Markdown-only docs; `.base`/`.canvas` exist purely as Obsidian-vault demos embedded via `![[Base.base]]` and `![[...]]`.
- Internal links use Obsidian wikilinks: `[[target]]`, `[[target|alias]]`, `[[target#Heading]]`. Relative markdown links (`./features/`) appear only for directory-style listings. Both styles appear in the same file (`docs/index.md`).
- Code fences always carry a title attribute: `` ```yaml title="quartz.config.yaml" ``, `` ```ts title="quartz.ts" ``, `` ```md title="content/note.md" ``, `` ```shell ``.
- Callouts are Obsidian-style: `> [!tip]`, `> [!warning]`, `> [!note]`, `> [!info]`. Every plugin/feature page repeats the same boilerplate note pointing at `[[configuration#Plugins|Configuration]]`.
- Bases query blocks use `filters.and` / `or` / `not`, `formulas`, `properties`, `views` with `type: table|list|cards|gallery|board`.
- Prettier (`.prettierrc`) governs docs: `printWidth 100`, `tabWidth 2`, `semi false`, `trailingComma all`, `quoteProps as-needed`, with overrides parsing `*.canvas` as JSON and `*.base` as YAML. `.prettierignore` excludes only `public`, `node_modules`, `.quartz-cache` — so `docs/` **is** prettier-formatted.
- Titles containing punctuation are quoted: `title: "Advanced"`, `title: "Docker Support"`, `title: "Quartz Showcase"`, `title: "Migrating to Quartz 5"`.
- Image values are inconsistent by design in the plugin set: empty (`image:`), wikilinks (`image: "[[social-image-preview-dark.png]]"`), external Unsplash URLs, and hex colors (`image: "#7852ee"`, `image: "#0052cc"`).

## ANTI-PATTERNS

- `docs/advanced/making plugins.md:556` — "**Do NOT add `dist/` to `.gitignore`**"; prebuilt `dist/` must be committed and CI verifies it is up to date.
- `docs/advanced/making plugins.md` (import table) — "Do **not** import from `@jackyzha0/quartz` or from `vfile` directly. Use the community packages instead."
- `docs/advanced/making plugins.md` (i18n) — "Do **not** hardcode strings in components"; plugins ship their own translations.
- `docs/advanced/creating components.md:127` — "Always provide at least an `en-US` locale as the fallback."
- `docs/advanced/making plugins.md:432` and `docs/layout.md:222` — frame CSS must be scoped with `.page[data-frame="my-frame"]` / `[data-frame="name"]` selectors to avoid conflicts.
- `docs/configuration.md:44` — `baseUrl`: "Do not include the protocol (i.e. `https://`) or any leading or trailing slashes."
- `docs/plugins/Frontmatter.md:24` — "This plugin must not be removed, otherwise Quartz will break."
- `docs/plugins/ObsidianFlavoredMarkdown.md:37` — "Don't remove this plugin if you're using Obsidian to author the content!"
- `docs/cli/create.md:21` — the selected template "always overwrites `quartz.config.yaml`, even if one already exists."
- `docs/cli/plugin.md:259-271` — "Migration from Deprecated Commands": old commands survive as hidden aliases that print a deprecation warning.
- `docs/features/Docker Support.md:15` — `> [!warning] Not to be used for production`.
- `docs/getting-started/index.md:15` — warning callout on Node/npm version prerequisites.

## HOTSPOTS

Only one file exceeds 500 lines: **`docs/advanced/making plugins.md` (748)** — the concentrated plugin-authoring reference (manifest, bundling, `dist/` shipping, native deps, import table, i18n setup, plugin resolver). Next largest: `docs/plugins/CustomOgImages.md` (383), `docs/hosting.md` (351), `docs/configuration.md` (303), `docs/features/explorer.md` (294), `docs/cli/plugin.md` (281), `docs/advanced/creating components.md` (266), `docs/layout.md` (248), `docs/getting-started/migrating.md` (228), `docs/plugins/Fonts.md` (226).

High-centrality hubs (most inbound `[[...]]`): `docs/configuration.md` — referenced from effectively every plugin and feature page via the boilerplate "see the [[configuration#Plugins|Configuration]] page" note; `docs/index.md` (home page linking every section); `docs/features/index.md` (feature catalogue, 5 grouped bullet sections); `docs/plugins/index.md` (Base-backed plugin table with 6 category views); `docs/layout.md`; `docs/getting-started/index.md`.

Concentrated logic: `docs/configuration.md` (general config: `pageTitle`, analytics providers, theme fonts/colors, plugin list, `layout.byPageType`) and `docs/Base.base` (the doc taxonomy formulas plus 9 views) are the two files that define the docs' structure.

## COMMANDS

- `npm run docs` → `npx quartz build --serve -d docs` (`package.json` `scripts.docs`) — builds and serves the docs tree locally.
- `npm run check` → `tsc --noEmit && npx prettier . --check` — prettier covers `docs/`.
- `npm run format` → `npx prettier . --write`.
- `.github/workflows/ci.yaml`: `npx quartz plugin install` → `npm run check` → `npm test` (`tsx --test`) → `npx quartz build --bundleInfo -d docs`.
- `.github/workflows/build-preview.yaml`: `npx quartz plugin install` → `npm run check` → `npx quartz build -d docs -v`, artifact `public` uploaded; `deploy-preview.yaml` then publishes that artifact to Cloudflare Pages.
- `.github/workflows/deploy-v5.yaml`: `npx quartz build` (no `-d`) → GitHub Pages deploy. `docker-build-push.yaml` does not touch docs.
- Note on `-d`: `docs/cli/build.md:13` defines `--directory` as "the directory containing your Quartz project" (default: current dir) while `docs/getting-started/installation.md:151` defines it as "the content folder... normally just `content`". In this repo `-d docs` is used as the docs content root, so treat the two doc statements as an unresolved inconsistency.

<results>
<files>
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/Base.base - Obsidian Bases query defining the doc taxonomy (doc_type/section formulas) and 9 views; the de-facto schema spec for this chunk.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/plugins/index.md - Plugin catalogue; embeds a Base query with filters/formulas/views and states the plugin-vs-feature taxonomy.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/configuration.md - Central config reference; highest inbound-link hub, defines plugin types and the repeated `[[configuration#Plugins|Configuration]]` link target.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/advanced/making plugins.md - Largest file (748 lines); concentrates anti-patterns (do not gitignore dist, no hardcoded strings, import from @quartz-community/*).
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/advanced/creating components.md - Component plugin authoring rules, i18n fallback rule, frame CSS scoping.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/getting-started/authoring-content.md - Declares the user-facing frontmatter field list (title, description, permalink, aliases, tags, draft, date).
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/getting-started/index.md - Section landing page; shows the 4-step getting-started sequence and Node/npm prerequisites.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/features/index.md - Feature catalogue grouped into Content / Navigation & Discovery / Appearance & Reading / Publishing & Deployment.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/layout.md - Layout slots and page-frame model; frame CSS scoping rule.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/layout-components.md - Flex/group layout component reference with YAML + TS override examples.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/cli/build.md - Authoritative CLI flag table for `quartz build` (including the `--directory`/`-d` semantics that the repo's docs scripts rely on).
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/cli/plugin.md - Plugin CLI reference including the deprecated-command migration section.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/plugins/Frontmatter.md - Shows `publish`, `enableToc`, `quartz-properties` frontmatter keys and the "must not be removed" rule.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/plugins/Backlinks.md - Canonical plugin-page frontmatter template (title/description/tags/image/repository/enabled/required).
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/features/Bases.md - Feature page using bare `component` tag and `![[Base.base]]` embed.
- D:/RP/campaigns/Polaris/Polaris-Hubris/docs/Canvas.canvas - JSON Canvas demo fixture (321 lines) for the CanvasPage plugin.
- D:/RP/campaigns/Polaris/Polaris-Hubris/package.json - Defines `docs`, `check`, `format`, `test` scripts that operate on this path.
- D:/RP/campaigns/Polaris/Polaris-Hubris/.github/workflows/ci.yaml - CI commands that build docs (`npx quartz build --bundleInfo -d docs`).
- D:/RP/campaigns/Polaris/Polaris-Hubris/.github/workflows/build-preview.yaml - PR preview build of docs (`npx quartz build -d docs -v`).
</files>

<answer>
`docs/` is a pure-content chunk with no code: 111 markdown files (~8,661 lines), one Obsidian Bases file, one JSON Canvas file, and 12 PNGs. Its contract is defined by frontmatter, not by exports. Every page has `title` on line 2; 75 pages add a `tags` list drawn from a fixed namespace (`plugin/transformer|filter|emitter|component|pageType`, `feature/transformer|filter|emitter`, bare `component`); plugin pages uniquely add `repository`, `enabled`, `required`; a handful of pages add `aliases`, `description`, `image`, `publish`, `enableToc`, `quartz-properties`. `docs/Base.base` encodes the taxonomy and section mapping, so new docs should live in the matching folder and pick a tag from that namespace to appear in the Bases tables. Writing conventions to copy: Obsidian wikilinks (`[[target|alias]]`, `[[target#Heading]]`), `> [!warning]`-style callouts, fenced code blocks with a `title="..."` attribute, and the boilerplate line pointing readers to `[[configuration#Plugins|Configuration]]`. Hard rules found in-source: never gitignore a plugin's `dist/`, never import from `@jackyzha0/quartz` or `vfile`, never hardcode user-facing strings, always provide an `en-US` locale fallback, scope frame CSS with `[data-frame="..."]`, and keep `baseUrl` free of protocol and slashes. The docs are built by `npm run docs` (`npx quartz build --serve -d docs`), by CI via `npx quartz build --bundleInfo -d docs` and `npx quartz build -d docs -v`, and are prettier-formatted (docs is not in `.prettierignore`).
</answer>

<next_steps>
Ready to proceed - no follow-up needed. If you need to author or extend docs, mirror `docs/plugins/Backlinks.md` for plugin pages and `docs/features/Bases.md` for feature pages, add the page to the relevant `docs/features/index.md` or `docs/plugins/index.md` category, and verify with `npm run check` plus `npx quartz build -d docs`.
</next_steps>
</results>

[task_id: st_01a181d9 - continue with task_send(to="st_01a181d9", message="...")]