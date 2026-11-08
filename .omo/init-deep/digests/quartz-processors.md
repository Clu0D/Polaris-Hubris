# DIGEST quartz/processors/
## SCOPE
5 files, ~433 LOC. The content pipeline: markdown in, HTML pages out.
## KEY FILES
- `processors/parse.ts` - markdown -> AST (HAST), resolves frontmatter, wikilinks, transclusions.
- `processors/filter.ts` - decides which pages survive (draft removal, ignore patterns).
- `processors/emit.ts` - AST -> HTML page files.
- `processors/links.ts` - link graph resolution.
- `processors/parse.test.ts` - colocated tests.
## EXPORTS
`parse`, `filter`, `emit`, `linkProcessor` (named exports used by `quartz/build.ts`).
## CONVENTIONS
- Pure functions over data: no direct filesystem writes inside processors, no plugin imports.
- Output is deterministic - the same content tree always produces the same page set, because incremental builds rely on it.
- Tests are colocated `*.test.ts` using `node:test` + `node:assert`.
## ANTI-PATTERNS
- Do not move plugin-specific behaviour into a processor; processors are generic and plugin-agnostic.
- Do not make a processor depend on build order or wall-clock time - the build cache keys on content hashes.
## HOTSPOTS
`parse.ts` is the highest-centrality processor in the repo (imported by build.ts, plugins and components); it also owns the frontmatter contract that the content vault depends on.
## COMMANDS
`npm test` (tsx --test) covers the processors; `npx quartz build` is the end-to-end exercise.
