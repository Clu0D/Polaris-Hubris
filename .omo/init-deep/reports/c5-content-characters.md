# CHUNK c5-content-characters

## INVENTORY
- `content/Главные герои/` — 4 `.md` files, all playable PC sheets: `Целест.md`, `Фил.md`, `Уиго.md`, `Э́стер.md` (filename carries a combining acute accent on Э).
- `content/Персонажи/` — 19 `.md` files, all NPC/faction notes.
- 23 Markdown files total in scope; no attachments here (images live in `content/images/`, pulled in via `![[file.png]]`).
- Naming: Russian Cyrillic display names; comma+epithet pattern (`Титур, Сельдяной Король.md`, `Де'Рела, дочь Шагоб.md`); apostrophes in names (`Де'Рела`); three files carry a literal ` TODO` suffix: `Бихолдер Зантар TODO.md`, `Верховная Маг Лесс TODO.md`, `Ригс Вислоухий и Удо TODO.md`.
- NPC subtypes: individuals (Баол Тоутун, Дурнан, Эйтра Ржавый Гвоздь, Шарлотта, Госпожа Ласточка, Неизвестное существо), institutions/factions (`Дом Корф`, `Дом Меншун`), and one statblock NPC (`Титур`).
- Line counts (rough size): Персонажи — Титур 42, Шарлотта 37, Де'Рела 25, Варл Окстаф 24, Дурнан 21, Бихолдер Зантар 16; Главные герои — Целест 69, Фил 62, Уиго 51, Э́стер 19.

## EXPORTS
- Vault frontmatter in `Персонажи`: exactly one key, `draft: "true"` (quoted string), in 9 files: Бихолдер Зантар TODO, Верховная Маг Лесс TODO, Госпожа Ласточка, Джелдар Гимбл, Дом Меншун, Дурнан, Матрим Трёхструнный, Неизвестное существо, Ригс Вислоухий и Удо TODO. The other 10 NPC files have none.
- `content/Главные герои`: no frontmatter at all (zero `---`).
- Daggerheart statblock YAML (not vault frontmatter) lives in a `%%`-fenced ` ```daggerheart ` block in `Титур, Сельдяной Король.md` with keys: `name, tier, type, desc, difficulty, features` (each `name/type/desc/flavor`), `hp, stress, thresholds, attack, xp, motives, weapon, range, damage, id`.
- Linking: `[[Target]]` and `[[Target|Alias]]` wikilinks; markdown links to `https://daggerheart.su/ancestry|class|subclass|domain-card|equipment/...`; one `https://freshcutgrass.app/homebrew?...` homebrew link.

## CONVENTIONS
Playable sheet order (Целест/Фил/Уиго): header with ancestry/class/subclass as daggerheart.su links, then `Уклонение N`, `Броня N`, `Пороги A / B` (or `Пороги 10, 18`), optional `Раны N`, `Стресс N`; then the six traits in canonical order `Проворность / Сила / Искусность / Инстинкт / Влияние / Знание` with ± modifiers; then three `+2` bonuses (ancestry/role/background); then class features, one per line as `Название: cost (Надежды/Стресс) -> effect`; then heritage as armor line + weapon in parentheses `Рапира (Xd8 физ, Влияние, Вплотную)`; then derived lines `+Влияние и Знание`, `+Уклонение`. `Э́стер.md` adds `Карты домена:`, `Шрамы:`, `Доступные рецепты зелий:` and a `## Зубка` companion section. `Целест.md` is the outlier with a `# Механика:` heading.
`%%` = Obsidian hidden/GM-only block: personality traits (Уиго: "Позитивчик, любопытный"), secrets (Баол Тоутун), session chronicle (Фил: `#### День 1/День 2`), and statblock YAML (Титур).
Distances in Russian: Вплотную / Близко / Средне / Далеко / Очень Далеко; damage `физ`; Стресс (stress), Надежда (hope), Ячейки Брони (armor slots).
NPC note pattern: 1–3 prose paragraphs — who, where (`Находится в районе [[Полярис#Бумажные Драконы|...]]`), voice/behavior, then GM hooks as bullet lists ("Можно использовать для путешествия на другой осколок", "Устраивает гладиаторские бои"), optional `%%` secrets, `![[image]]` embeds.

## ANTI-PATTERNS
No explicit never/do-not rules anywhere in these two folders.
Unfinished markers actually seen: ` TODO` in three filenames; `Госпожа Ласточка.md` and `Неизвестное существо.md` contain nothing but `draft: "true"` frontmatter (empty stubs); `Верховная Маг Лесс TODO.md` (4 lines) and `Ригс Вислоухий и Удо TODO.md` (5 lines) are stub-sized and also `draft: "true"`. Body-level "TODO" appears once, inside a wikilink in `Варл Окстаф.md` → `[[Верховная Маг Лесс TODO|Верховной Магом Лесс]]`.
Inconsistent dice notation: attacks written `2d10+8 физ` / `2d8+2 физ`, but equipment lines use an unresolved `Xd10+3 физ` / `Xd8 физ` placeholder.

## HOTSPOTS
- `/D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Титур, Сельдяной Король.md` — only Daggerheart statblock; embedded YAML with `features`/`flavor`.
- `/D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Шарлотта.md` (37 lines) — largest pure-prose NPC.
- `/D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Де'Рела, дочь Шагоб.md` (25), `Варл Окстаф.md` (24), `Дурнан.md` (21).
- `/D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Бихолдер Зантар TODO.md` — 16 lines but one ~4.5k-char unbroken prose blob, raw adventure material ("простите, что не написал сразу").
- `/D:/RP/campaigns/Polaris/Polaris-Hubris/content/Главные герои/Целест.md` (69 lines) — largest and least standard playable sheet: mixed stat/feature/item lines, extra `Раны 6`, no external links.
- Empty stubs: `Госпожа Ласточка.md`, `Неизвестное существо.md` (+ the two 4–5 line TODO files).

## COMMANDS
none — no tooling, scripts, README or template instructions inside these two folders. Maintenance conventions are implicit only: `draft: "true"` frontmatter = unfinished, ` TODO` filename suffix = unfinished, `%%` = hide GM-facing content. (A `content/TODO.md` exists one level up, outside this chunk's scope.)

<results>
<files>
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Главные герои/Целест.md - playable sheet; largest, non-standard layout (# Механика, Раны, item entries)
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Главные герои/Фил.md - canonical playable order + %% session chronicle
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Главные герои/Уиго.md - canonical playable order, %% personality block
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Главные герои/Э́стер.md - domain cards, scars, potion recipes, companion section
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Титур, Сельдяной Король.md - only daggerheart statblock YAML schema
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Дурнан.md - draft:true NPC prose pattern
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Дом Меншун.md - draft:true faction note
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Дом Корф.md - no-frontmatter NPC/family note
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Баол Тоутун.md - %% secrets convention
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Эйтра Ржавый Гвоздь.md - short NPC, %% hidden relations
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Бихолдер Зантар TODO.md - densest unfinished prose blob
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Госпожа Ласточка.md - empty stub (frontmatter only)
- /D:/RP/campaigns/Polaris/Polaris-Hubris/content/Персонажи/Неизвестное существо.md - empty stub (frontmatter only)
</files>

<answer>
23 Markdown files: 4 playable PC sheets in content/Главные герои, 19 NPC/faction notes in content/Персонажи. Only schema-bearing file is Персонажи/Титур, Сельдяной Король.md (daggerheart statblock YAML inside a %% block). Vault frontmatter is limited to draft: "true" in 9 NPC files; playable sheets have none. Playable sheet layout = ancestry/class/subclass links, then Уклонение/Броня/Пороги/Раны/Стресс, six traits in canonical order, three +2 bonuses, Hope/Stress-cost class features, armor+weapon heritage, derived + bonuses. NPC notes = prose description + location + voice + GM hooks, with %% for secrets. Anti-patterns are only unfinished markers (TODO filenames, draft stubs, XdN dice placeholders); no explicit do-not rules and no maintenance tooling.
</answer>

<next_steps>
Ready to proceed - no follow-up needed.
</next_steps>
</results>

[task_id: st_01a181e0 - continue with task_send(to="st_01a181e0", message="...")]