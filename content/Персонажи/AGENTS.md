# AGENTS.md - content/Персонажи/

19 Markdown files, ~248 lines - short NPC dossiers: individuals, institutions/factions and one statblock NPC. Vault-wide rules live in `../AGENTS.md`.

## KEY FILES

- `Титур, Сельдяной Король.md` (42) - the only dossier with a Daggerheart statblock (in a ` ```daggerheart ` fence, preceded by a `freshcutgrass.app/homebrew` link).
- `Шарлотта.md` (37) - largest pure-prose dossier; carries a `%%` GM block with `### Описание / ### Голос / ### Что знает`.
- `Де'Рела, дочь Шагоб.md` (25), `Варл Окстаф.md` (24), `Дурнан.md` (21).
- `Бихолдер Зантар TODO.md` (16 lines, 4 dense paragraphs) - the hardest design constraints in the vault.
- `Дом Корф.md`, `Дом Меншун.md` - institution notes.
- `Госпожа Ласточка.md`, `Неизвестное существо.md` - empty stubs (frontmatter only).

## SHAPE

A dossier is free prose: who the NPC is, where they are (`Находится в районе [[Полярис#Бумажные Драконы|...]]`), voice and behaviour, then GM hooks as a bullet list ("Можно использовать для путешествия на другой осколок", "Устраивает гладиаторские бои"), then an optional `%%` secrets block, then an optional `![[image]]` embed. There is no frontmatter schema - 9 of the 19 files carry `draft: "true"`, the other 10 are published.

## CONVENTIONS

- Filenames: Russian display name, optional `, <epithet>` suffix, apostrophes allowed (`Де'Рела`), ` TODO` suffix for unwritten notes.
- `%%` is the GM-facing channel; it stays in the published page and is hidden at render time.
- The statblock dossier (`Титур`) uses the Daggerheart keys `name, tier, type, desc, difficulty, features[].name/type/desc/flavor, hp, stress, thresholds, attack, xp, motives, weapon, range, damage, id` - the same schema as `content/statblocks/`, in YAML instead of JSON.

## ANTI-PATTERNS

- `Бихолдер Зантар TODO.md` states hard constraints that must survive edits: do not drop him onto the players directly (he destroys a first-level party instantly, so he leaves the scene instead), and break his criminal empire through partisan-style methods rather than confrontation.
- `Дом Меншун.md` contains an open question ("Устраивает гладиаторские бои (можно в них поучаствовать?)"), not an established rule. Do not cite it as canon.
- `Госпожа Ласточка.md` and `Неизвестное существо.md` are empty stubs; publishing them without content produces blank pages.
- `Варл Окстаф.md` links `[[Верховная Маг Лесс TODO|Верховной Магом Лесс]]`, so the TODO marker leaks into the rendered text.
- Do not add a second statblock dialect here; use the `content/statblocks/` schema.

## HOTSPOTS

`Титур, Сельдяной Король.md` (the only statblock) and `Бихолдер Зантар TODO.md` (design constraints) are the two files that matter most. Several wikilinks from this folder have no target file: `[[Барон Вайлс]]`, `[[Стальные когти]]`, `[[Индекс]]`, `[[Тайный Злодей]]`, `[[Мотылёк]]`, `[[Лилия]]`, `[[Веер]]`, `[[Галапа]]`, `[[Ларена]]`, `[[Аскис]]`, `[[Чартен-корабли]]`, `[[Принцип Воды]]`, `[[Война с Богами]]`, `[[Ритуал]]`.

## COMMANDS

No local tooling. `npx quartz build` publishes the dossiers that carry no `draft` key.
