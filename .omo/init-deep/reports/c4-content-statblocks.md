# CHUNK c4-content-statblocks

## INVENTORY

Single flat directory: `D:/RP/campaigns/Polaris/Polaris-Hubris/content/statblocks` (no subfolders).

- **14 files, 6108 lines total** (line counts via ripgrep line-match counts; the sandbox bash broker only exposes `gh`/`curl`, so `wc` was unavailable).
- **10 JSON files, 5944 lines**, all top-level **flat arrays** of statblock objects:
  - `adversaries_ru.json` 4534 lines / 129 statblocks
  - `environments_ru.json` 712 / 19
  - `flumphs_adversaries_ru.json` 308 / 9
  - `flumphs_environments_ru.json` 164 / 5
  - `flumph_combat_ru.json` 61 / 1
  - `bullfrog.json` 36 / 1, `bullfrog_ru.json` 36 / 1
  - `swarm-of-crabs.json` 30 / 1, `Крабы.json` 30 / 1
  - `the-fisher-king.json` 33 / 1
  - **168 JSON statblocks total** (matches `"source"` occurrence counts exactly).
- **4 Markdown files, 164 lines**, each holding Obsidian-plugin YAML blocks inside ` ```daggerheart ` fences (**5 blocks**):
  - `Бычья Лягушка.md` 32 lines / 1 block; `Фламф.md` 40 / 1; `Стая крабов.md` 35 / 1; `Зелёная слизь (обновлённая).md` 57 / 2.
- **Frontmatter pattern**: only `draft: "true"` (quoted string), present in 3 of 4 MD files. `Стая крабов.md` has **no frontmatter**. No `title`, `tags`, `aliases`, or `description` anywhere in scope.
- **Filename conventions (mixed, deviates from one rule)**: `_ru` suffix = Russian; unsuffixed = English. But the directory simultaneously uses `snake_case` (`flumphs_adversaries_ru.json`), `kebab-case` (`swarm-of-crabs.json`, `the-fisher-king.json`), plural content-kind names (`adversaries_ru.json`, `environments_ru.json`), and raw Cyrillic filenames (`Крабы.json`, `Бычья Лягушка.md`). MD files use the Russian display name, one file per entity, with a parenthetical revision marker (`Зелёная слизь (обновлённая).md`).

## EXPORTS

There is no code here; the exported artifacts are the data schemas.

**JSON statblock (adversary flavor)** — `name, tier, type, desc, difficulty, motives, hp, stress, attack, weapon, range, damage, thresholds, xp, source, features[]`.
**JSON statblock (environment flavor)** — `name, tier, type, desc, difficulty, impulses, adversaries, source, features[]` (has `impulses`/`adversaries`, **no** `motives`/`hp`/`stress`/`attack`).
**Feature object** — `name, type, desc` + optional `flavor` (string, GM prompt; 97 occurrences, environments only + `the-fisher-king.json`) + optional `uses` (int, per-scene limit; 12 occurrences).
**Markdown block** — same stat fields as JSON but **no `source`**, plus a mandatory-looking `id` (11-char lowercase alphanumeric: `dp7s05m0fmp`, `spfntid33pk`, `7nszivomjph`, `atfkm3v6krf`, `cz9bkdmvht`).

**Value vocabularies**
- `type` (13 values): `Solo, Bruiser, Standard, Social, Minion, Skulk, Ranged, Leader, Support, Horde (N/HP)` (variants `1/HP`…`10/HP`), `Exploration, Event, Traversal`.
- feature `type` (3 values): `Passive, Action, Reaction`.
- `source`: `corebook` (148) | `homebrew` (20).
- `range`: EN `Melee/Close/Medium/Far`; RU `Вплотную/Близко/Средне/Далеко`.
- `damage`: dice+type suffix in three spellings — `физ` (RU), `phy` (EN), `маг` (RU magic).
- `thresholds`: `"8/15"`, or `"4/none"` (2 occurrences) for minions.
- `difficulty`: integer, **or** the string `Special (see "Relative Strength")` for `Event` environments (2 occurrences).
- `xp`, `motives`, `impulses`, `adversaries`: free-text comma-separated strings (`xp` may be `""`).

## CONVENTIONS

- **Key order is stable** in JSON: `name, tier, type, desc, difficulty, [motives | impulses+adversaries], hp, stress, attack, weapon, range, damage, thresholds, xp, source, features[]`; features always last.
- **MD blocks invert that**: `features:` comes *before* the stat fields, and `id` is last. Treat MD and JSON as two serializations of one entity type, not one canonical order.
- **Mixed-language is deliberate**: Russian statblocks keep Latin mechanics (`Mark a Stress`, `Spend a Fear`, `mark a Stress`) and even Latin `range`/`damage` codes (`bullfrog_ru.json` uses `range: "Melee"`, `damage: "2d8+6 phy"` inside Russian text). Russian statblocks translate `range`/`damage` suffixes in `adversaries_ru.json` (`Вплотную`, `физ`) but keep them English in `flumphs_adversaries_ru.json` (`Усики`, `1d4 физ` — mixed within one file).
- **Line breaks**: JSON `desc` uses `\n` escapes (`swarm-of-crabs.json`); the MD equivalent uses YAML block scalars `|-`.
- **Duplicate entities exist in 2-3 forms** with drifting values: `bullfrog.json` (EN, tier 1, difficulty 11) vs `bullfrog_ru.json` (RU, tier 2, difficulty 14); `swarm-of-crabs.json` / `Крабы.json` / `Стая крабов.md` (same Horde 6/HP crab swarm); `ФЛАМФ-СТРАЖ КЛУАТРА` appears in `flumph_combat_ru.json` (difficulty 13, 8 features) and `Фламф.md` (difficulty 14, 6 features).
- **Cross-file references are plain display names**, never ids or links (`environments_ru.json` cites `Медведь, Лютоволк, Стеклянная Змея, Капитан Стражи`; `flumphs_environments_ru.json` cites `Фламф-Наблюдатель, Фламф-Посредник`).
- Prettier config applies repo-wide: `printWidth 100`, 2-space indent, no semicolons, `quoteProps: as-needed`.

## ANTI-PATTERNS

No explicit `DO NOT` / `NEVER` / `ALWAYS` / `DEPRECATED` comments exist in these files — the only `нельзя` hits are in-game rules prose (`flumph_combat_ru.json:57`, `Фламф.md:26`, `flumphs_adversaries_ru.json:176`). The forbidden patterns are enforced by the pipeline:

1. **Trailing comma before `]` is fatal** — `flumph_combat_ru.json:58` has `},` then `]` (line 59). The file is invalid JSON: `JSON.parse` fails and Prettier's `json` parser (which rejects trailing commas) errors, so `npm run check` fails on it. It is the only such defect in the chunk (multiline scan for `,\n]` and `,\n}` found nothing else).
2. **`draft: "true"` means the page is not published** — `@quartz-community/remove-draft` is enabled in `quartz.config.yaml`, so `Бычья Лягушка.md`, `Фламф.md`, `Зелёная слизь (обновлённая).md` are stripped from the site build. `Стая крабов.md` (no frontmatter) is published.
3. **Never rename a statblock's `name`** — other files reference adversaries by exact Russian display name, with no id or link to fail loudly.
4. **Never leave a JSON file out of the `_ru`/EN naming pattern by accident** — file name carries the language contract; `bullfrog_ru.json` mixes English stat keys with Russian content, which must not be "fixed" silently.

## HOTSPOTS

- `adversaries_ru.json` — **4534 lines (>500)**, 129 statblocks, **73% of all lines in the chunk**. By far the highest-centrality file: it is the shared library every other file cites by name. Any edit needs a JSON-aware tool, not a text patch.
- `environments_ru.json` — **712 lines (>500)**, 19 statblocks; densest prose (78 `flavor` prompts, 7 `Event` blocks with string `difficulty`).
- `flumphs_adversaries_ru.json` — 308 lines / 9 statblocks; `flumphs_environments_ru.json` — 164 / 5. These two plus `flumph_combat_ru.json` form a coherent "Фламф" family that must be edited as a set.
- `flumph_combat_ru.json` — the single densest block (8 features in one statblock) and the only broken file.
- `Зелёная слизь (обновлённая).md` — the only multi-block MD file (2 blocks in one file, with prose between/above the fences).
- **Concentrated logic** lives entirely inside `features[]`; stat-level fields are flat scalars with no computed values.

## COMMANDS

From `package.json` (root, read for command context) and `.github/workflows/ci.yaml`:

- `npm run check` → `tsc --noEmit && npx prettier . --check` — Prettier covers `content/` (`.prettierignore` lists only `public`, `node_modules`, `.quartz-cache`), so it formats/checks the JSON here; **currently expected to fail on `flumph_combat_ru.json`**.
- `npm run format` → `npx prettier . --write` — rewrites the JSON in place (2-space indent, width 100).
- `npm run docs` → `npx quartz build --serve -d docs` — local dev/preview build of `content/` (neither `quartz.config.yaml` nor `quartz.config.default.yaml` overrides the content folder).
- `npx quartz build --bundleInfo -d docs` — CI build verification step (`ci.yaml`).
- `npm test` → `tsx --test` — repo test runner; **no test file exists inside `content/statblocks`**, so this chunk is untested.
- `npm run install-plugins` / `npx quartz plugin install` — plugin install (also the `prebuild` hook).
- **CI never runs on this fork**: every job in `ci.yaml` is gated by `if: ${{ github.repository == 'jackyzha0/quartz' }}`, so `check`/`test`/`quartz build` are skipped for `Polaris-Hubris` (PR/push trigger is branch `v5`).

[task_id: st_01a181da - continue with task_send(to="st_01a181da", message="...")]