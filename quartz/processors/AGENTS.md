# AGENTS.md - quartz/processors/

5 files, ~433 LOC. The content pipeline: markdown in, HTML pages out. Processors are generic - they know nothing about the campaign and nothing about specific plugins. Repo-wide conventions live in `../../AGENTS.md`.

## KEY FILES

- `parse.ts` - markdown -> AST. Resolves frontmatter, wikilinks, transclusions and the `%%` comment syntax.
- `filter.ts` - decides which parsed pages survive the build (draft removal, ignore patterns, explicit publish).
- `emit.ts` - AST -> HTML page files.
- `links.ts` - link graph construction and resolution.
- `parse.test.ts` - colocated tests for the parsing contract.

## EXPORTS

`parse`, `filter`, `emit`, `linkProcessor` - consumed by `quartz/build.ts`, not by plugins.

## CONVENTIONS

- Processors are pure functions over data: they receive content and return content, they do not touch the filesystem or the network themselves.
- Output must be deterministic. The build cache keys on content hashes, so a processor that depends on wall-clock time or iteration order breaks incremental builds silently.
- Frontmatter handling lives in `parse.ts`; the campaign vault's `draft: "true"` convention is resolved here, not in a plugin.

## ANTI-PATTERNS

- Do not move plugin-specific behaviour into a processor. If a rule only applies to one plugin, it belongs in that plugin's transformer.
- Do not introduce a second frontmatter parser. `parse.ts` is the single place where the frontmatter contract is defined.
- Do not reorder pages by anything but content data - the emitted file set has to be reproducible.

## HOTSPOTS

`parse.ts` is the highest-centrality processor: `build.ts`, the plugin transformers and the component layer all depend on its output shape. It is also the file that decides whether a draft page reaches the published site.

## COMMANDS

- `npm test` - `tsx --test`, covers `parse.test.ts`.
- `npx quartz build` - end-to-end exercise of parse -> filter -> emit.
- `npm run check` - type-check plus Prettier on this tree.
