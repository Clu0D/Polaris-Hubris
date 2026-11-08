# DIGEST quartz/components/
## SCOPE
31 files, ~2,785 LOC (30 `.ts`/`.tsx` + 1 SCSS, 5 of them `*.test.ts`). The React rendering layer, the component registry, and the page-frame layout system.
## KEY FILES
- `components/index.ts` - public barrel: `componentRegistry`, `defineComponent`, `External`, `Head`, `Spacer`, `DesktopOnly`, `MobileOnly`, `NotFound`, `Flex`, `ConditionalRender`, plus the component types.
- `components/renderPage.tsx` (381) - `pageResources`, `renderTranscludes`, `renderPage`: the HTML shell and transclusion engine.
- `components/registry.ts` (142) - `ComponentRegistry`, `componentRegistry` singleton, `defineComponent`, `ComponentManifest`.
- `components/types.ts` - `QuartzComponent`, `QuartzComponentProps`, `QuartzComponentConstructor` (the most-imported type module).
- `components/frames/` - `index.ts` (`resolveFrame`), `registry.ts` (`frameRegistry`), `types.ts`, `DefaultFrame.tsx`, `FullWidthFrame.tsx`, `MinimalFrame.tsx`.
- `components/pages/404.tsx` - hardcoded-Russian 404 page with an inline client script.
- `components/scripts/` - `spa.inline.ts` (251), `popover.inline.ts` (141), `util.ts`.
- `components/Date.tsx` (`getDate`, `formatDate`), `components/PageList.tsx` (`byDateAndAlphabetical`, `PageList`), `components/Head.tsx`, `components/Body.tsx`, `components/Header.tsx`.
## EXPORTS
`componentRegistry`, `defineComponent`, `External`, `resolveFrame`, `frameRegistry`, `pageResources`, `renderTranscludes`, `renderPage`, `getDate`, `formatDate`, `byDateAndAlphabetical`, `ComponentRegistry`, `ComponentManifest`, `QuartzComponent`.
## CONVENTIONS
- Every component default-exports a constructor `(() => Component) satisfies QuartzComponentConstructor`; config variants take `(config: X) => ...`.
- `satisfies` replaces explicit return-type annotations throughout the layer.
- Relative imports only (`../i18n`, `../util/path`), no path aliases.
- Browser scripts are named `*.inline.ts`; shared helpers are not (`scripts/util.ts`).
- Frames: plugin-registered frame wins, then built-ins (`default`, `full-width`, `minimal`), then `DefaultFrame`.
## ANTI-PATTERNS
- `renderPage.tsx` walks transclusions manually instead of using `visit()` - a Set-based guard inside `visit()` would wrongly reject sibling transclusions of the same target. Do not "simplify" this back.
- `registry.ts` swallows component instantiation errors (`catch { /* skip */ }`) and lets a re-registered name overwrite the previous one with only a warning.
- Unknown frame names warn and fall back to `DefaultFrame`; they never throw.
- During `--serve`, `basePath` must stay empty or links break.
- `getDate` throws when `defaultDateType` is unset - the CreatedModifiedDate plugin must stay configured.
- `pages/404.tsx` hardcodes Russian strings instead of using `Translation.pages.error` - the only user-facing string that bypasses i18n.
- `scripts/search.test.ts` duplicates an encoder whose source (`search.inline.ts`) does not exist in this checkout - the test exercises a copy, not shipped code.
## HOTSPOTS
`renderPage.tsx` (381) is the densest file; `registry.ts` is the integration seam with the plugin loader (`config-loader.ts`, `gitLoader.ts`, `componentResources.ts`).
## COMMANDS
`npm test` runs the 5 colocated `*.test.ts` files; `npm run check` type-checks and prettier-checks the layer.
