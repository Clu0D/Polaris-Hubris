# DIGEST content/statblocks/
## SCOPE
14 files, ~6,108 lines: 10 JSON files (5,944 lines, 168 statblocks) and 4 Markdown files (164 lines, 5 statblocks inside ` ```daggerheart ` fences).
## KEY FILES
- `adversaries_ru.json` (4,534 lines, 129 statblocks) - 73% of the chunk, the shared library every other file cites by name.
- `environments_ru.json` (712, 19) - environments with `flavor` GM prompts and `Event` blocks.
- `flumphs_adversaries_ru.json` (308, 9), `flumphs_environments_ru.json` (164, 5), `flumph_combat_ru.json` (61, 1) - the "Фламф" family.
- `bullfrog.json` / `bullfrog_ru.json`, `swarm-of-crabs.json` / `Крабы.json`, `the-fisher-king.json`.
- `Бычья Лягушка.md`, `Фламф.md`, `Стая крабов.md`, `Зелёная слизь (обновлённая).md` - Markdown serialisations.
## EXPORTS
Adversary schema: `name, tier, type, desc, difficulty, motives, hp, stress, attack, weapon, range, damage, thresholds, xp, source, features[]`.
Environment schema: `name, tier, type, desc, difficulty, impulses, adversaries, source, features[]`.
Feature: `name, type, desc` + optional `flavor` (GM prompt) and optional `uses` (per-scene limit).
Markdown blocks carry the same fields plus a mandatory 11-char lowercase `id`, and no `source`.
Vocabularies: `type` = Solo/Bruiser/Standard/Social/Minion/Skulk/Ranged/Leader/Support/Horde (N/HP)/Exploration/Event/Traversal; feature `type` = Passive/Action/Reaction; `source` = corebook|homebrew.
## CONVENTIONS
- JSON key order is stable: `name, tier, type, desc, difficulty, [motives | impulses+adversaries], hp, stress, attack, weapon, range, damage, thresholds, xp, source, features[]` - features always last.
- Markdown blocks invert that order (`features:` first, `id` last): two serialisations of one entity type, not one canonical order.
- Filenames carry the language contract: `_ru` suffix = Russian, unsuffixed = English; naming mixes `snake_case`, `kebab-case`, plural kind names and raw Cyrillic.
- Cross-file references are plain display names (`Медведь`, `Фламф-Наблюдатель`) - never ids, never links.
- JSON `desc` uses `\n` escapes; the Markdown equivalent uses YAML block scalars `|-`.
- Range/damage codes appear in Russian (`Вплотную`, `физ`) or English (`Melee`, `phy`) - sometimes inside the same file.
## ANTI-PATTERNS
- `flumph_combat_ru.json` is invalid JSON: a trailing comma before `]` on line 58. `JSON.parse` fails and `npm run check` fails on it. This is the only such defect in the chunk.
- `draft: "true"` on `Бычья Лягушка.md`, `Фламф.md`, `Зелёная Слизь (обновлённая).md` keeps them out of the published build; `Стая крабов.md` has no frontmatter and is published.
- Never rename a statblock's `name` - other files reference adversaries by exact display name, so a rename breaks references silently.
- Never "fix" the mixed-language stat keys (`bullfrog_ru.json` keeps English `range`/`damage` codes) without a deliberate localization decision.
## HOTSPOTS
`adversaries_ru.json` (4,534) and `environments_ru.json` (712) are the two files above 500 lines; `flumph_combat_ru.json` holds the densest single statblock (8 features) and the only syntax error. Duplicated entities exist in 2-3 forms with drifting values (`bullfrog.json` tier 1/difficulty 11 vs `bullfrog_ru.json` tier 2/difficulty 14; the crab swarm as `swarm-of-crabs.json`, `Крабы.json` and `Стая крабов.md`).
## COMMANDS
`npm run check` (Prettier covers this folder's JSON and currently fails on `flumph_combat_ru.json`); `npm run format` rewrites the JSON in place; `npm test` has no test in this folder.
