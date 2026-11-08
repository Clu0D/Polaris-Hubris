# AGENTS.md - quartz/components/

31 files, ~2,785 LOC (30 `.ts`/`.tsx` + 1 SCSS, 5 of them tests). The React rendering layer: the component registry, the page-frame layout system and the inline browser scripts. Repo-wide conventions live in `../../AGENTS.md`.

## KEY FILES

- `index.ts` - public barrel: `componentRegistry`, `defineComponent`, `External`, `Head`, `Spacer`, `DesktopOnly`, `MobileOnly`, `NotFound`, `Flex`, `ConditionalRender` plus the component types.
- `renderPage.tsx` (381) - `pageResources`, `renderTranscludes`, `renderPage`: the HTML shell, the baseDir prefixing and the transclusion engine.
- `registry.ts` (142) - `ComponentRegistry`, the `componentRegistry` singleton, `defineComponent`, `ComponentManifest`.
- `types.ts` - `QuartzComponent`, `QuartzComponentProps`, `QuartzComponentConstructor`; the most-imported type module in the repository.
- `frames/` - `index.ts` (`resolveFrame`), `registry.ts` (`frameRegistry`), `types.ts`, `DefaultFrame.tsx`, `FullWidthFrame.tsx`, `MinimalFrame.tsx`.
- `pages/404.tsx` - 404 page with an inline client script.
- `scripts/` - `spa.inline.ts` (251), `popover.inline.ts` (141), `util.ts` (`registerEscapeHandler`, `removeAllChildren`, `fetchCanonical`).
- `Date.tsx` (`getDate`, `formatDate`), `PageList.tsx` (`byDateAndAlphabetical`, `PageList`), `Head.tsx`, `Body.tsx`, `Header.tsx`.

## EXPORTS

`componentRegistry`, `defineComponent`, `External`, `resolveFrame`, `frameRegistry`, `pageResources`, `renderTranscludes`, `renderPage`, `getDate`, `formatDate`, `byDateAndAlphabetical`, `ComponentRegistry`, `ComponentManifest`, `QuartzComponent`.

## CONVENTIONS

- A component default-exports a constructor: `(() => Component) satisfies QuartzComponentConstructor`. Config variants take `(config: X) => ...`. `satisfies` replaces explicit return-type annotations in this layer.
- Relative imports only (`../i18n`, `../util/path`, `./types`); no path aliases.
- Browser scripts are named `*.inline.ts`; shared helpers are not (`scripts/util.ts`).
- Frame resolution order: plugin-registered frame, then built-ins (`default`, `full-width`, `minimal`), then `DefaultFrame`.
- The registry caches component instances by constructor identity plus serialized options.

## ANTI-PATTERNS

- `renderPage.tsx` walks transclusions manually instead of using `visit()`: a Set-based guard inside `visit()` runs before descending and would falsely reject sibling transclusions of the same target. Do not "simplify" this back.
- `registry.ts` swallows component instantiation failures (`catch { /* skip */ }`) and lets a re-registered name overwrite the previous one with only a warning - a broken component disappears silently instead of failing the build.
- Unknown frame names warn and fall back to `DefaultFrame`; they never throw.
- Circular transclusions are warned about (`Skipping circular transclusion`) and replaced by a styled paragraph.
- During `--serve` the dev server serves from the root, so `basePath` must stay empty or links break.
- `getDate` throws when `defaultDateType` is unset - the CreatedModifiedDate plugin has to stay configured.
- `pages/404.tsx` hardcodes Russian strings instead of using `Translation.pages.error`; it is the only user-facing string that bypasses i18n.
- `scripts/search.test.ts` duplicates an encoder whose source (`search.inline.ts`) does not exist in this checkout - the test exercises a copy, not shipped code.

## HOTSPOTS

`renderPage.tsx` (381) is the densest file: it owns resource URL prefixing, transclusion and the HTML shell. `registry.ts` is the integration seam with the plugin loader (`config-loader.ts`, `gitLoader.ts`, `componentResources.ts`).

## COMMANDS

- `npm test` - `tsx --test`, runs the 5 colocated `*.test.ts` files in this directory.
- `npm run check` - type-check plus Prettier over the layer.
- `npx quartz build --serve` - exercise the SPA router and popover scripts in a browser.
