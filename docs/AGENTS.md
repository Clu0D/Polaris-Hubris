# AGENTS.md - docs/

128 tracked files: 111+ Markdown pages (~8,661 lines), `Base.base` (135 lines, YAML), `Canvas.canvas` (321 lines, JSON Canvas) and 15 PNGs. A vendored copy of the upstream Quartz v5 documentation - it documents the generator, it is not campaign material. Repo-wide conventions live in the root `AGENTS.md`.

## WHAT THIS FOLDER IS FOR

`docs/` is published as a *second* site: `npx quartz build -d docs` treats this folder as the content root. The campaign site is built from `content/` instead. Do not mix the two: campaign notes never belong here, and upstream documentation pages never belong in `content/`.

## STRUCTURE

| Path | Files | Role |
|---|---|---|
| `configuration.md` | 1 | Central config reference, the link hub of the whole tree |
| `advanced/` | 5 | `making plugins.md` (748), `creating components.md` (266), `layout.md`, `hosting.md`, `migrating.md` |
| `cli/` | 8 | `build.md`, `plugin.md`, `create.md` and friends |
| `features/` | 30 | Feature catalogue, one page per feature |
| `getting-started/` | 6 | Installation, authoring content, migration |
| `plugins/` | 51 | One page per plugin, plus `index.md` catalogue |
| `tags/` | 2 | Tag index pages |
| `images/` | 15 | PNG assets |

## EXPORTS

No code. The contract is frontmatter plus a tag taxonomy:
- `title` on line 2 of every page.
- `tags` on 75 of 111 pages, drawn from `plugin/transformer|filter|emitter|component|pageType`, `feature/transformer|filter|emitter`, bare `component`.
- Plugin pages add `repository`, `enabled`, `required`; a few pages add `aliases`, `description`, `image`, `publish`, `enableToc`, `quartz-properties`.
- `Base.base` encodes the taxonomy (`formula.doc_type`, `formula.section`) and 9 views; the `plugins/index.md` and `features/index.md` tables are driven by it.

## CONVENTIONS

- Internal links are Obsidian wikilinks: `[[target]]`, `[[target|alias]]`, `[[target#Heading]]`. Relative markdown links are used only for directory listings.
- Every code fence carries a title attribute: ` ```yaml title="quartz.config.yaml" `.
- Callouts are Obsidian style (`> [!tip]`, `> [!warning]`, `> [!note]`, `> [!info]`).
- Plugin and feature pages repeat a boilerplate pointer to `[[configuration#Plugins|Configuration]]`.
- Titles with punctuation are quoted: `title: "Docker Support"`.
- Filenames are not kebab-case - `configuration.md`, `features/full-text search.md` and `plugins/CustomOgImages.md` all exist and that is expected.
- Prettier covers this folder (`printWidth 100`, `semi false`, `trailingComma all`, `quoteProps as-needed`).

## ANTI-PATTERNS

- `advanced/making plugins.md`: never add a plugin's `dist/` to `.gitignore`; never import from `@jackyzha0/quartz` or `vfile` directly (use `@quartz-community/*`); never hardcode user-facing strings.
- `advanced/creating components.md`: always provide an `en-US` locale as fallback; scope frame CSS with `.page[data-frame="..."]`.
- `configuration.md`: `baseUrl` must not contain the protocol or leading/trailing slashes.
- `plugins/Frontmatter.md`: the Frontmatter plugin must not be removed - Quartz breaks without it.
- `plugins/ObsidianFlavoredMarkdown.md`: do not remove it while authoring content in Obsidian.
- `cli/create.md`: the template always overwrites `quartz.config.yaml`.
- `features/Docker Support.md`: not for production.

## HOTSPOTS

`advanced/making plugins.md` (748) is the only page above 500 lines and concentrates the plugin-authoring rules. `configuration.md` and `index.md` are the inbound-link hubs.

## COMMANDS

- `npm run docs` - `npx quartz build --serve -d docs`, serves this tree locally.
- `npx quartz build --bundleInfo -d docs` / `npx quartz build -d docs -v` - the CI build variants.
- `npm run check` - Prettier-checks this folder.

## NOTES

`cli/build.md` defines `-d` as the project directory while `getting-started/installation.md` defines it as the content folder; `quartz/cli/args.js` sets the default to `content` ("directory to look for content files"), and the repo uses `-d docs` to point the build at this tree.
