# DIGEST content/Главные герои/
## SCOPE
4 Markdown files, ~201 lines - the playable Daggerheart character sheets: `Целест.md` (69), `Фил.md` (62), `Уиго.md` (51), `Э́стер.md` (19). No frontmatter at all; all four are published.
## KEY FILES
- `Целест.md` - largest and least standard sheet: mixed stat/feature/item lines, an extra `Раны 6`, no external links, a `# Механика:` heading.
- `Фил.md` - canonical sheet plus a `%%` session chronicle (`#### День 1 / День 2`).
- `Уиго.md` - canonical sheet plus a `%%` personality block ("Позитивчик, любопытный").
- `Э́стер.md` - adds `Карты домена:`, `Шрамы:`, `Доступные рецепты зелий:` and a `## Зубка` companion section.
## EXPORTS
The sheets are the vault's hub entities - referenced from 16 files in scope alone. They export the playable-party state that `content/Приключение/` prep notes and `Post Mortem.md` track.
## CONVENTIONS
- Line order of a playable sheet: ancestry/class/subclass as markdown links to `https://daggerheart.su/...` -> `Уклонение N`, `Броня N`, `Пороги A / B` -> the six traits in the canonical order `Проворность / Сила / Искусность / Инстинкт / Влияние / Знание` with `+N` modifiers -> three `+2` bonuses (ancestry/role/background) -> class features, one per line as `Название: cost (Надежды/Стресс) -> effect` -> heritage as an armor line plus a weapon in parentheses `Рапира (Xd8 физ, Влияние, Вплотную)` -> derived `+Влияние и Знание`, `+Уклонение` lines.
- Distances are Russian: `Вплотную / Близко / Средне / Далеко / Очень Далеко`; damage type `физ`; armor slots = `Ячейки Брони`.
- `%%` = GM-only / private block, including the per-session chronicle.
- Filenames may carry combining diacritics (`Э́стер.md`) - wikilinks must match byte-for-byte.
- No structured frontmatter: sheets are plain text lines, not YAML; `title`, `aliases`, `tags`, `description` never appear here.
## ANTI-PATTERNS
- Dice notation is inconsistent: attacks read `2d10+8 физ` / `2d8+2 физ`, but equipment lines still contain unresolved placeholders `Xd10+3 физ` / `Xd8 физ`. Fill in the real die values instead of leaving `X`.
- The "Фил / День 1 / День 2" log is duplicated verbatim in `content/Приключение/Подготовка к партии 4/5/6.md` - update all copies.
- Do not add frontmatter to a sheet: the vault has no `title`/`tags` convention for characters, and `note-properties` only renders `description`/`tags`/`aliases` anyway.
## HOTSPOTS
`Э́стер.md`, `Уиго.md` and `Фил.md` are the hub entities of the vault. `Целест.md` diverges from the canonical order - align it deliberately rather than by accident.
## COMMANDS
none local; `npx quartz build` publishes the sheets.
