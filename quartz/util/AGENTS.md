# AGENTS.md - quartz/util/

21 files, ~6,746 LOC - of which 4,713 lines are the generated `emojimap.json`. These helpers are imported by plugins, processors, components and the CLI, so a change here is a repo-wide change. Repo-wide conventions live in `../../AGENTS.md`; the layer-specific rules are below.

## KEY FILES

- `path.ts` - the slug and URL contract of the whole site. Re-exports the path helpers of `@quartz-community/utils`, exports the `QUARTZ` build-root constant and `normalizeRelativeURLs`.
- `ctx.ts` - the build context contract: `Argv`, `BuildCtx`, `BuildTimeTrieData`, `HashedResourceNames`.
- `glob.ts` - file matching over the content tree.
- `emojimap.json` - generated shortcode-to-emoji map (15.3 MB). Never hand-edited.

## EXPORTS

`QUARTZ`, `normalizeRelativeURLs`, `Argv`, `BuildCtx`, `BuildTimeTrieData`, `HashedResourceNames`, plus the `@quartz-community/utils` re-exports of `path.ts`.

## CONVENTIONS

- Path and slug logic is re-exported from `@quartz-community/utils`, never reimplemented here.
- `ctx.ts` types are the seam between the CLI, the plugin loader and the processors - widening a field there touches all three.
- `HashedResourceNames` exists so cache keys stay stable across builds; renaming the scheme invalidates the whole `.quartz-cache`.

## ANTI-PATTERNS

- Do not add local slug normalization: two implementations of `normalizeRelativeURLs` will disagree, and the disagreement only shows up as broken links in the published site.
- Do not commit an edit to `emojimap.json` - it is generated and dwarfs every other file in the repository.
- Do not add path aliases (`@/…`): imports in this tree are relative and extensionless, and the CLI is loaded without a bundler.

## HOTSPOTS

`path.ts` is the most-imported module in the repository. `ctx.ts` is the contract every plugin sees at build time. `emojimap.json` is the largest artifact by bytes and carries no logic.

## COMMANDS

No local tooling; changes are covered by `npm run check` and `npm test`, and by `npx quartz build` for the end-to-end path.
