# DIGEST quartz/util/
## SCOPE
21 files, ~6,746 LOC (4,713 of them in the generated `util/emojimap.json`). Utilities shared by every plugin, processor and component.
## KEY FILES
- `util/path.ts` - the slug/path contract of the whole site: re-exports `@quartz-community/utils` path helpers, the `QUARTZ` constant, `normalizeRelativeURLs`.
- `util/ctx.ts` - `Argv`, `BuildCtx`, `BuildTimeTrieData`, `HashedResourceNames`.
- `util/glob.ts` - file matching for the content tree.
- `util/emojimap.json` - generated emoji shortcode map (15.3 MB) - never hand-edit.
## EXPORTS
`QUARTZ` (build root constant), `normalizeRelativeURLs`, `Argv`/`BuildCtx` (build context contract), `HashedResourceNames` (cache-key naming).
## CONVENTIONS
- Every helper re-exports from `@quartz-community/utils` instead of reimplementing path/slug logic.
- TS, strict, extensionless relative imports, no path aliases.
- Public helpers are exported from a single module and re-exported through the directory's `index.ts` where one exists.
## ANTI-PATTERNS
- Do not add slug/URL normalization logic locally - extend or wrap `util/path.ts` so every plugin agrees on slug shape.
- Do not edit `util/emojimap.json`; it is generated and dominates repository size.
## HOTSPOTS
`util/path.ts` is the most-imported module in the repository (imported by plugins, processors and components alike). `util/emojimap.json` is the largest artifact by bytes but carries no logic.
## COMMANDS
none local; verified through `npm run check` and `npm test`.
