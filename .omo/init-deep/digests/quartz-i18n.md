# DIGEST quartz/i18n/
## SCOPE
32 files, ~2,819 LOC. Localization layer: one schema, 30 locale files, 51 locale keys.
## KEY FILES
- `i18n/index.ts` (90) - `TRANSLATIONS` (51 keys -> 30 files), `defaultTranslation = "en-US"`, `i18n(locale)`, types `ValidLocale`, `ValidCallout`.
- `i18n/locales/definition.ts` (88) - the `Translation` and `CalloutTranslation` interfaces (the schema every locale must satisfy).
- `i18n/locales/ru-RU.ts` (99) - Russian locale used by this site.
- `i18n/locales/en-US.ts` - the fallback/source of truth.
- `i18n/locales/ar-SA.ts`, `fa-IR.ts`, `he-IL.ts` - the only RTL locales.
## EXPORTS
`TRANSLATIONS`, `defaultTranslation`, `i18n`, `ValidLocale`, `ValidCallout`; each locale file default-exports a `Translation` object.
## CONVENTIONS
- Every locale file is `export default {...} as const satisfies Translation` - the `satisfies` clause is what enforces the schema.
- Region aliases point at one file: `ar-AE/ar-QA/ar-EG/...` -> `ar-SA`, `nl-BE` -> `nl-NL`, `ro-MD` -> `ro-RO` (30 files cover 51 keys).
- `direction: "rtl" as const` is opt-in per locale and appears only in `ar-SA`, `fa-IR`, `he-IL`.
- Plural helpers are defined locally inside the locale file that needs them (`getForm(number, form1, form2, form5)` in `ru-RU` and `lt-LT`) instead of being centralised.
## ANTI-PATTERNS
- Do not hardcode user-facing strings in components - plugins ship their own translations (upstream rule, also stated in `docs/advanced/making plugins.md`).
- Always provide at least an `en-US` locale as fallback.
- Never edit `definition.ts` without updating every locale file, or `satisfies Translation` fails at type-check time.
## HOTSPOTS
`i18n/index.ts` is imported by `quartz/cfg.ts`, `components/Date.tsx`, `components/Head.tsx`, `components/renderPage.tsx` and `plugins/pageTypes/404.ts`; `ru-RU.ts` is the locale this site actually renders.
## COMMANDS
`npm run check` type-checks the `satisfies` clauses; `npx quartz build` renders the active locale.
