# CHUNK c6-content-lore

## INVENTORY

All paths are 100% Russian-language Markdown + binary images. **No `.ts`, `.js`, `.yaml`, `.yml`, `.css` files exist inside the chunk** — it is a pure content slice of the Quartz v5 vault.

| Path | Files | Lines | Type |
|---|---|---|---|
| `content/Лор` | 7 `.md` | 254 | Lore notes |
| `content/Локации` | 36 `.md` | 1333 | Location notes (nested) |
| `content/Фракции` | 7 `.md` | 120 | Faction notes |
| `content/Предметы` | 2 `.md` | 15 | Items/artifacts |
| `content/images` | 45 binaries (26 `.jpg`, 19 `.png`) | 0 | Illustrations |

**Entry files** (all 52 `.md` are leaves; no index files inside the chunk):
- `content/Лор/Эры.md` (99), `content/Лор/Пульс Поляриса №1537 1086 г.в.с дек. 6-ая.md` (76), `content/Лор/Фламфы.md` (57), `content/Лор/«4 Шлюхи».md` (12), `Многоликие.md` (5), `Аурлия.md` (3), `Пожиратели Интеллекта.md` (2).
- `content/Локации` tree: top-level shard notes `Аркельт.md`, `Демонический Осколок.md`, `Ирвейн.md`, `Миар.md`, `Сайрени.md`, `Тентра.md`; `Мом/Мом.md`; `Полярис/Полярис.md` (hub) with `Глубоководье/` (8), `Подземье/Подземелье - Водные твари.md`, `Подземье/Фламфыыы/Клуатр фламфов.md`, `Подземье/Дворец Последнего Императора/` (7 room files).
- `content/Фракции/Паства.md` (54) is the largest; `content/Предметы/Канон Им-Нур Садориса (Сфера Канона).md` (12) + `Прах Тентра.md` (3).

**Naming/frontmatter pattern:** Russian title-case filenames = entity name, spaces and punctuation preserved (`«…»`, `№`, parentheses), never slugified. The **only frontmatter key used anywhere in the chunk is `draft: "true"`** (quoted string, not boolean) on 33 of 52 files; the other 19 have no frontmatter at all. No `title`, `tags`, `aliases`, `description`, `date`, `cssclasses` anywhere.

## EXPORTS

Content exports via three mechanisms, all consumed by Quartz plugins configured in `quartz.config.yaml`:

1. **Wikilinks** `[[Note]]`, `[[Note|Alias]]`, `[[Note#Section]]` — e.g. `[[Рыбацкая Деревушка#Мител|Мител]]`, `[[Школа солёного ветра#Аме, Певец Глубин]]`, `[[Полярис#Трущобы|трущоб Поляриса]]`. Resolution: `crawl-links` plugin, `markdownLinkResolution: shortest`, `disableBrokenWikilinks: true`.
2. **Image embeds** `![[file.png]]` / `![[file.png|294]]` (optional pixel width) — flat filenames resolved against `content/images`.
3. **Hidden author notes** `%% … %%` (23 occurrences across 11 files) — Obsidian comment syntax, stripped at render by `obsidian-flavored-markdown` (`comments: true`).

**Entity types:** lore note, shard/city/district location, dungeon room, faction, item/artifact, in-fiction newspaper issue, and 21 Daggerheart statblocks.

**Statblock schema** (fenced ```` ```daggerheart ```` YAML, 21 blocks in 7 files):
`name, tier, type, desc, difficulty, features[].{name, type, desc, flavor?, uses?}, hp, stress, thresholds, attack, xp, motives, weapon, range, damage, id`.
Encounter/block variants instead carry `impulses:` and `adversaries:` in place of `hp/attack/damage` (see `Клуатр фламфов.md`). No `daggerheart` handler exists under `quartz/` (grep over 145 files: 0 hits), so these fences render as code blocks on the site — they are consumed by an external tool.

## CONVENTIONS

- **`%%` = hidden scratchpad**; `>` = in-fiction speech; `####` = subsection inside lore/room notes; `# Локации` / `# Персонажи` = bullet index of wiki links; `###` = NPC name header.
- **Location file order:** prose → `# Локации`/`# Персонажи` bullet index → statblocks → trailing `%%` notes.
- **`admin ` filename prefix** = GM-only encounter prep (3 files in `Локации/Полярис/Глубоководье/`); **` TODO` suffix** = unwritten note (`Дворец Последнего Императора TODO.md`).
- **Empty stubs:** `Предметы/Прах Тентра.md`, `Срединное плато (Трущобы).md`, `Дворец Последнего Императора TODO.md` contain only frontmatter.
- **Mixed-script artifact:** `Интериóр Небесной Бездны (Свод).md` uses Latin `ó` inside Cyrillic; wikilink targets must match byte-for-byte.
- **Image naming:** three coexisting styles — md5-hash `.jpg` (13), semantic lowercase-with-spaces (`bad bitch.jpg`, `glass snake.png`), Obsidian paste dumps `Pasted image <timestamp>.png` (6), plus TitleCase `Obaya.png`/`Varl.png`. One near-duplicate pair: `10f6eff89964955eaa58d49375a29612.jpg` and `… 1.jpg`.
- **Mechanics stay half-English:** `Mark a Stress`, `Spend a Fear`, `mark a Stress`, `spend a Fear` and `range: Melee` / `range: Вплотную` coexist inside the same files.

## ANTI-PATTERNS

No formal authoring-rule doc exists in scope. Rules found are in-file or in-fiction:

- **`Подземье.md`** — the author flags his own design smell explicitly: *"Если сделать что в целом для продвижения нужна эта инфа — получится что я запираю за каким-то paywall продвижение, и это не очень"*. Rule: the locked door must open easily (help the Образ remember his own name); the door may only be solved once.
- **`Глубоководье.md`** (hidden note) — *"всем на этот район насрать, поскольку из него нельзя выбраться"* → this district is deliberately low-priority, its horror stays local.
- **`Улей.md`** — *"«Улей» и любые сравнения с насекомыми для эльфов оскорбительны"* (setting taboo, not an authoring rule).
- **`Фламфы.md` / `Клуатр фламфов.md`** — *"Нельзя внушить существу то чего оно не хочет"* — hard constraint on the Псионическое перенаправление feature.
- **`Зал с Гостями.md`** — *"Не позволю!! Её нельзя выпускать"* (Капитан Рен Орст) — in-fiction.
- **Publish rule (config-driven):** `remove-draft` plugin is enabled → any file with `draft: "true"` is stripped from the build. Publishing = removing that key.
- **Silent failure mode:** `disableBrokenWikilinks: true` means unresolved links silently stop being links. Inside scope, targets such as `[[Верховная Маг Лесс TODO]]`, `[[Грибница]]`, `[[Стальные когти]]`, `[[Дом Корф]]`, `[[Торговый дом «Тысяча Осколков»]]`, `[[Принцип Воды]]` have no file in scope.

## HOTSPOTS

**No file exceeds 500 lines.** Concentration instead sits in link hubs and duplicated statblocks:

- `content/Локации/Полярис/Подземье/Дворец Последнего Императора/Подземье.md` (93 lines, 15 headings) — the 5-room-dungeon hub; defines the room map `1 Врата → 2 Зал с Гостями → 3 Зимний Сад → 6 закрытый проход / 4 Игровая → 5 Вейра`, the four Courtesans, factions and cults; links 6 sibling room files. Highest-centrality file in the chunk.
- `content/Локации/Полярис/Глубоководье/admin Битва эко-протест.md` (195 lines) — largest file, **7 statblocks and zero prose**, pure encounter table.
- `content/Локации/Полярис/Полярис.md` (35) — root index of the location graph + currency table (Пульс / Луч / Сердце / Дохляк).
- `content/Лор/Эры.md` (99) — 41 numbered eras plus a canonical short timeline; the lore backbone.
- **Duplicate statblock IDs:** `ФЛАМФ-СТРАЖ КЛУАТРА` `id: cz9bkdmvht` appears in `Лор/Фламфы.md:55` *and* `Локации/Полярис/Подземье/Фламфыыы/Клуатр фламфов.md:100` (byte-identical block); `ГИГАНТСКИЙ СКОРПИОН` `id: qfx2ayeiyze` appears in `Зимний сад.md:106` *and* `МОЛОДАЯ МЕРЦЕКРЫЛКА.md:91`.
- **Broken embeds:** `Зимний сад.md:22-23` references `Pasted image 20260907133950.png` and `Pasted image 20260907141310.png`; neither exists in `content/images` (grep `20260907` over all 45 binaries: 0 hits).

## COMMANDS

- `npm run docs` → `npx quartz build --serve -d docs` — local dev/preview; this is the command that renders `content/`.
- `npx quartz build -d docs -v` — CI preview build (`.github/workflows/build-preview.yaml`).
- `npm run check` → `tsc --noEmit && npx prettier . --check` — Prettier covers `content/**/*.md` (`.prettierrc`: printWidth 100, tabWidth 2, no semicolons, `quoteProps: as-needed`).
- `npm run format` → `npx prettier . --write`.
- `npm test` → `tsx --test` (no content-path tests). `npm run prebuild` → `npm run install-plugins` → `npx tsx ./quartz/plugins/loader/install-plugins.ts`. `npm run quartz` → `./quartz/bootstrap-cli.mjs`.
- **CI:** `.github/workflows/ci.yaml` and `build-preview.yaml` and `deploy-preview.yaml` are all gated by `if: github.repository == 'jackyzha0/quartz'` → **skipped in this repo**; `ci.yaml` also only triggers on branch `v5`. `.github/workflows/deploy-v5.yaml` has **no such guard** and is the real publish path: on push to `v5` it runs `npm ci` → `npx quartz plugin install` → `npx quartz build` → GitHub Pages.
- **Config governing these paths** (`quartz.config.yaml`): `ignorePatterns: [private, templates, .obsidian]`, `locale: ru-RU`, `baseUrl: clu0d.github.io/Polaris-Hubris`, `folder-page` enabled (so `content/Лор`, `content/Локации` etc. become folder index pages), `remove-draft` enabled, `obsidian-flavored-markdown` with comments/wikilinks/callouts/mermaid enabled.

[task_id: st_01a181de - continue with task_send(to="st_01a181de", message="...")]