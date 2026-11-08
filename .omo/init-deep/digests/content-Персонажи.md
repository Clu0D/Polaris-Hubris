# DIGEST content/Персонажи/
## SCOPE
19 Markdown files, ~248 lines - short NPC dossiers (individuals, institutions/factions, one statblock NPC). No schema, mostly 1-3 prose paragraphs.
## KEY FILES
- `Титур, Сельдяной Король.md` (42) - the only dossier with a ` ```daggerheart ` statblock (plus a `freshcutgrass.app/homebrew` link).
- `Шарлотта.md` (37) - largest pure-prose dossier, with a `%%` GM block (`### Описание / ### Голос / ### Что знает`).
- `Де'Рела, дочь Шагоб.md` (25), `Варл Окстаф.md` (24), `Дурнан.md` (21).
- `Бихолдер Зантар TODO.md` (16 lines, 4 dense paragraphs) - hardest NPC design constraints.
- `Дом Корф.md`, `Дом Меншун.md` - institution notes (the latter carries an open question, not a fact).
- `Госпожа Ласточка.md`, `Неизвестное существо.md` - empty stubs (frontmatter only).
## EXPORTS
NPC dossiers are link targets for `Локации/`, `Фракции/` and the chapters. `Титур` exports a Daggerheart statblock: `name, tier, type, desc, difficulty, features[].name/type/desc/flavor, hp, stress, thresholds, attack, xp, motives, weapon, range, damage, id`.
## CONVENTIONS
- Frontmatter: only `draft: "true"` (quoted string) in 9 of 19 files; the other 10 have none and are published.
- Naming: Russian display name, optional `, <epithet>` suffix, apostrophes allowed (`Де'Рела`), ` TODO` suffix for unwritten notes.
- Dossier shape: who -> where (`Находится в районе [[Полярис#Бумажные Драконы|...]]`) -> voice/behavior -> GM hooks as bullet list -> optional `%%` secrets -> optional `![[image]]` embed.
- `%%` blocks are the GM-facing channel; published pages keep them, the renderer hides them.
## ANTI-PATTERNS
- `Бихолдер Зантар TODO.md` states hard design constraints: do not confront the players with him directly (he destroys them instantly), the illithid leaves the scene rather than fight, his empire must be broken by partisan-style methods. Preserve these when editing the character.
- `Дом Меншун.md` contains an unverified question ("можно в них поучаствовать?") - treat it as an open question, not as an established rule.
- Empty stubs (`Госпожа Ласточка.md`, `Неизвестное существо.md`) are placeholders; do not publish them without content.
- `Варл Окстаф.md` links `[[Верховная Маг Лесс TODO|Верховной Магом Лесс]]` - a link that carries the TODO suffix into the rendered text.
## HOTSPOTS
`Титур, Сельдяной Король.md` (statblock) and `Бихолдер Зантар TODO.md` (design constraints) are the two files that matter most; several unresolved wikilinks originate here (`[[Барон Вайлс]]`, `[[Стальные когти]]`, `[[Лилия]]`, `[[Аскис]]` and others have no target file).
## COMMANDS
none local; `npx quartz build` publishes the dossiers without frontmatter and hides the `draft: "true"` ones.
