# DIGEST docs/
## SCOPE
128 tracked files: 111+ Markdown pages (~8,661 lines), `docs/Base.base` (135 lines, YAML), `docs/Canvas.canvas` (321 lines, JSON Canvas), 15 PNGs in `docs/images/`. No code (no `.ts/.js/.yaml/.css`).
A vendored copy of the upstream Quartz v5 documentation, published as a separate site next to the campaign vault.
## KEY FILES
- `docs/configuration.md` (303) - central config reference and the highest inbound-link hub.
- `docs/advanced/making plugins.md` (748) - the plugin-authoring reference.
- `docs/advanced/creating components.md` (266), `docs/layout.md` (248), `docs/hosting.md` (351).
- `docs/plugins/index.md` - plugin catalogue driven by a Bases query; `docs/features/index.md` - feature catalogue.
- `docs/Base.base` - the doc taxonomy (`formula.doc_type`, `formula.section`) and 9 views.
- `docs/cli/build.md`, `docs/cli/plugin.md`, `docs/cli/create.md` - CLI reference.
- `docs/getting-started/authoring-content.md` - the content frontmatter field list.
## EXPORTS
Not code - the doc taxonomy and the frontmatter schema.
Frontmatter keys observed: `title` (every page, line 2), `tags` (75/111 pages), `aliases`, `description`, `image`, `repository`, `enabled`, `required` (plugin pages only), `publish`, `enableToc`, `quartz-properties`.
Tag namespace: `plugin/transformer|filter|emitter|component|pageType`, `feature/transformer|filter|emitter`, bare `component`.
## CONVENTIONS
- Internal links are Obsidian wikilinks (`[[target]]`, `[[target|alias]]`, `[[target#Heading]]`); relative markdown links only for directory listings.
- Code fences always carry a title attribute: ` ```yaml title="quartz.config.yaml" `.
- Callouts are Obsidian-style (`> [!tip]`, `> [!warning]`, `> [!note]`, `> [!info]`); plugin/feature pages repeat a boilerplate pointer to `[[configuration#Plugins|Configuration]]`.
- Titles with punctuation are quoted (`title: "Docker Support"`).
- Filenames are not kebab-case: lowercase (`configuration.md`), lowercase-with-spaces (`features/full-text search.md`) and TitleCase (`plugins/CustomOgImages.md`) coexist.
- Prettier covers `docs/` (only `public`, `node_modules`, `.quartz-cache` are ignored).
## ANTI-PATTERNS
- `docs/advanced/making plugins.md`: never add a plugin's `dist/` to `.gitignore`; never import from `@jackyzha0/quartz` or `vfile` directly (use `@quartz-community/*`); never hardcode user-facing strings.
- `docs/advanced/creating components.md`: always ship an `en-US` locale fallback.
- Frame CSS must be scoped with `.page[data-frame="..."]`.
- `baseUrl` must not contain the protocol or leading/trailing slashes.
- `docs/plugins/Frontmatter.md`: the Frontmatter plugin must not be removed - Quartz breaks without it.
- `docs/cli/create.md`: the template always overwrites `quartz.config.yaml`.
- `docs/features/Docker Support.md`: not for production.
## HOTSPOTS
`docs/advanced/making plugins.md` (748) is the only file above 500 lines and concentrates the anti-patterns. `docs/configuration.md` and `docs/index.md` are the link hubs.
## COMMANDS
`npm run docs` -> `npx quartz build --serve -d docs` (serves this folder as the content root); `npm run check` prettier-checks it; CI builds it with `npx quartz build --bundleInfo -d docs` and `npx quartz build -d docs -v`.
## NOTES
`docs/cli/build.md` defines `-d` as "the directory containing your Quartz project" while `docs/getting-started/installation.md` defines it as the content folder; in this repo `quartz/cli/args.js` sets `directory` default `content` with description "directory to look for content files", and `-d docs` is used to build the docs tree.
