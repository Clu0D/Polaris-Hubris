# AGENTS.md - content/Главные герои/

4 Markdown files, ~201 lines - the playable Daggerheart character sheets: `Целест.md` (69), `Фил.md` (62), `Уиго.md` (51), `Э́стер.md` (19). All four are published. Vault-wide rules live in `../AGENTS.md`.

## SHEET LAYOUT

Line order of a playable sheet:
1. Ancestry / class / subclass as markdown links to `https://daggerheart.su/...` (`/ancestry/`, `/class/`, `/subclass/`).
2. `Уклонение N`, `Броня N`, `Пороги A / B` (or `Пороги 10, 18`), optionally `Раны N`, `Стресс N`.
3. The six traits in the canonical order `Проворность / Сила / Искусность / Инстинкт / Влияние / Знание`, each with a `+N` modifier.
4. Three `+2` bonuses (ancestry, role, background).
5. Class features, one per line, as `Название: cost (Надежды/Стресс) -> effect`.
6. Heritage as an armor line plus a weapon in parentheses: `Рапира (Xd8 физ, Влияние, Вплотную)`.
7. Derived lines `+Влияние и Знание`, `+Уклонение`.

`Э́стер.md` adds `Карты домена:`, `Шрамы:`, `Доступные рецепты зелий:` and a `## Зубка` companion section. `Целест.md` is the outlier: mixed stat/feature/item lines, an extra `Раны 6`, no external links and a `# Механика:` heading.

## CONVENTIONS

- Distances are Russian: `Вплотную / Близко / Средне / Далеко / Очень Далеко`. Damage type `физ`. Armor slots are `Ячейки Брони`, stress is `Стресс`, hope is `Надежда`.
- `%%` is the GM-only channel; `Фил.md` keeps the session chronicle there (`#### День 1 / День 2`), `Уиго.md` the personality block ("Позитивчик, любопытный").
- The sheets are plain text lines, not frontmatter. `title`, `tags`, `aliases` and `description` never appear here.
- Filenames may carry combining diacritics (`Э́стер.md`) - a wikilink to it must match byte-for-byte.

## ANTI-PATTERNS

- Dice notation is inconsistent: attacks read `2d10+8 физ` / `2d8+2 физ`, but equipment lines still contain unresolved placeholders `Xd10+3 физ` / `Xd8 физ`. Fill in the real die counts instead of leaving `X`.
- The "Фил / День 1 / День 2" log is duplicated verbatim in `content/Приключение/Подготовка к партии 4/5/6.md`. Update every copy.
- Do not add frontmatter to a sheet - the vault has no `title`/`tags` convention for characters, and the `note-properties` plugin would only render `description`/`tags`/`aliases` anyway.
- Do not reorder the six traits or the stat block silently; other pages and prep notes quote these values.

## HOTSPOTS

`Э́стер.md`, `Уиго.md` and `Фил.md` are the hub entities of the vault - they are referenced from 16 files in scope alone. `Целест.md` diverges from the canonical order; align it deliberately, not by accident.

## COMMANDS

No local tooling. `npx quartz build` publishes the sheets.
