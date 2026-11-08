# AGENTS.md - content/statblocks/

14 files, ~6,108 lines: 10 JSON files (5,944 lines, 168 statblocks) and 4 Markdown files (164 lines, 5 statblocks inside ` ```daggerheart ` fences). These are the Daggerheart creatures and hazards of the campaign. Vault-wide rules live in `../AGENTS.md`.

## KEY FILES

- `adversaries_ru.json` (4,534 lines, 129 statblocks) - 73% of the folder and the shared library every other file refers to.
- `environments_ru.json` (712, 19) - environments with `flavor` GM prompts and `Event` blocks.
- `flumphs_adversaries_ru.json` (308, 9), `flumphs_environments_ru.json` (164, 5), `flumph_combat_ru.json` (61, 1) - the "Фламф" family, edited as a set.
- `bullfrog.json` / `bullfrog_ru.json`, `swarm-of-crabs.json` / `Крабы.json`, `the-fisher-king.json`.
- `Бычья Лягушка.md`, `Фламф.md`, `Стая крабов.md`, `Зелёная слизь (обновлённая).md` - the Markdown serialisation.

## SCHEMA

Adversary: `name, tier, type, desc, difficulty, motives, hp, stress, attack, weapon, range, damage, thresholds, xp, source, features[]`.
Environment: `name, tier, type, desc, difficulty, impulses, adversaries, source, features[]`.
Feature: `name, type, desc` plus optional `flavor` (GM prompt) and optional `uses` (per-scene limit).
Markdown blocks carry the same fields plus a mandatory 11-character lowercase `id`, and no `source`.

Vocabularies: `type` = Solo / Bruiser / Standard / Social / Minion / Skulk / Ranged / Leader / Support / Horde (N/HP) / Exploration / Event / Traversal. Feature `type` = Passive / Action / Reaction. `source` = `corebook` | `homebrew`. `thresholds` = `"8/15"` or `"4/none"` for minions.

## CONVENTIONS

- JSON key order is stable: `name, tier, type, desc, difficulty, [motives | impulses+adversaries], hp, stress, attack, weapon, range, damage, thresholds, xp, source, features[]` - `features` is always last.
- Markdown blocks invert that order (`features:` first, `id` last): two serialisations of one entity type, not one canonical order.
- Filenames carry the language contract: `_ru` suffix = Russian, unsuffixed = English. Naming mixes `snake_case`, `kebab-case`, plural kind names and raw Cyrillic.
- Cross-file references are plain display names (`Медведь`, `Фламф-Наблюдатель`) - never ids, never links.
- JSON `desc` uses `\n` escapes; the Markdown equivalent uses YAML block scalars `|-`.
- Range and damage codes appear in Russian (`Вплотную`, `физ`) or English (`Melee`, `phy`), sometimes within one file.

## ANTI-PATTERNS

- `flumph_combat_ru.json` is invalid JSON: a trailing comma before `]` on line 58. `JSON.parse` fails and `npm run check` fails on this file. It is the only such defect in the folder.
- `draft: "true"` keeps `Бычья Лягушка.md`, `Фламф.md` and `Зелёная слизь (обновлённая).md` out of the build; `Стая крабов.md` has no frontmatter and is published.
- Never rename a statblock's `name`: other files cite adversaries by exact display name, so a rename breaks every reference without an error.
- Never "correct" the mixed-language stat keys (`bullfrog_ru.json` keeps English `range`/`damage` codes) without a deliberate localisation decision.
- Duplicated entities exist in two or three forms with drifting values (`bullfrog.json` tier 1 / difficulty 11 vs `bullfrog_ru.json` tier 2 / difficulty 14; the crab swarm as `swarm-of-crabs.json`, `Крабы.json` and `Стая крабов.md`). Pick one form as canonical before editing.

## HOTSPOTS

`adversaries_ru.json` (4,534) and `environments_ru.json` (712) are the two files above 500 lines; `flumph_combat_ru.json` holds the densest single statblock (8 features) and the only syntax error. `Зелёная слизь (обновлённая).md` is the only Markdown file with two statblocks.

## COMMANDS

- `npm run check` - Prettier covers this folder's JSON and currently fails on `flumph_combat_ru.json`.
- `npm run format` - rewrites the JSON in place (2-space indent, width 100).
- `npm test` - no test exists in this folder.
