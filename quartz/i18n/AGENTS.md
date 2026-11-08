# AGENTS.md - quartz/i18n/

32 files, ~2,819 LOC. Localization: one schema, 30 locale files, 51 locale keys. This site renders the `ru-RU` locale. Repo-wide conventions live in `../../AGENTS.md`.

## KEY FILES

- `index.ts` (90) - `TRANSLATIONS` maps 51 locale keys onto 30 files, `defaultTranslation = "en-US"`, `i18n(locale)` resolves a locale, types `ValidLocale` and `ValidCallout`.
- `locales/definition.ts` (88) - the `Translation` and `CalloutTranslation` interfaces; the schema every locale file must satisfy.
- `locales/ru-RU.ts` (99) - the locale this site uses, including a local `getForm(number, form1, form2, form5)` plural helper.
- `locales/en-US.ts` - fallback and source of truth.
- `locales/ar-SA.ts`, `locales/fa-IR.ts`, `locales/he-IL.ts` - the only RTL locales.

## EXPORTS

`TRANSLATIONS`, `defaultTranslation`, `i18n`, `ValidLocale`, `ValidCallout`; each locale file default-exports an object satisfying `Translation`.

## CONVENTIONS

- Every locale file ends with `export default {...} as const satisfies Translation`. The `satisfies` clause is the schema check - it fails the type-check, not the build.
- Region aliases point at one file: the `ar-*` family and others map to `ar-SA`, `nl-BE` -> `nl-NL`, `ro-MD` -> `ro-RO`. That is how 30 files cover 51 keys.
- `direction: "rtl" as const` is opt-in per locale and appears only in `ar-SA`, `fa-IR`, `he-IL`.
- Plural helpers are defined locally in the locale file that needs them rather than in a shared module.
- `Translation` keys are grouped: `propertyDefaults`, `direction`, `components` (callout, backlinks, themeToggle, readerMode, explorer, footer, graph, recentNotes, transcludes, search, tableOfContents, contentMeta), `pages` (rss, error, folderContent, tagContent).

## ANTI-PATTERNS

- Never hardcode a user-facing string in a component; plugins ship their own translations. `docs/advanced/making plugins.md` states this rule for plugin authors.
- Always ship an `en-US` locale as the fallback.
- Never edit `locales/definition.ts` without updating every locale file - `satisfies Translation` will fail at type-check time.
- Do not add a new key to one locale only; the schema requires it in all of them.

## HOTSPOTS

`index.ts` is imported by `quartz/cfg.ts`, `components/Date.tsx`, `components/Head.tsx`, `components/renderPage.tsx` and `plugins/pageTypes/404.ts`. `locales/ru-RU.ts` is the only file whose content is user-visible on this site.

## COMMANDS

- `npm run check` - type-checks every `satisfies Translation` clause.
- `npx quartz build` - renders the active locale (`quartz.config.yaml` -> `locale: ru-RU`).
