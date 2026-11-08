# AGENTS.md - content/Локации/

36 Markdown files, ~1,333 lines, nested: shard notes at the top, the city tree under `Полярис/`, and a dungeon under `Полярис/Подземье/`. Vault-wide rules live in `../AGENTS.md`.

## KEY FILES

- `Полярис/Полярис.md` (35) - root index of the location graph plus the currency table (Пульс / Луч / Сердце / Дохляк).
- `Полярис/Подземье/Дворец Последнего Императора/Подземье.md` (93 lines, 15 headings) - the 5-room dungeon hub: room map `1 Врата -> 2 Зал с Гостями -> 3 Зимний Сад -> 6 закрытый проход / 4 Игровая -> 5 Вейра`, the four Courtesans, factions and cults; links the 6 sibling room files.
- `Полярис/Глубоководье/admin Битва эко-протест.md` (195, the largest file) - 7 statblocks and zero prose, a pure encounter table; plus `admin Битва крабы.md` and `admin Взрыв на протесте.md`.
- Shards: `Аркельт.md`, `Демонический Осколок.md`, `Ирвейн.md`, `Миар.md`, `Мом/Мом.md`, `Сайрени.md`, `Тентра.md`.
- Districts: `Полярис/Глубоководье/` (8 files), `Полярис/Подземье/Подземелье - Водные твари.md`, `Полярис/Подземье/Фламфыыы/Клуатр фламфов.md`, and the 7 room files of the Last Emperor's Palace.
- Individual sites: `Улей.md`, `Кайлов Мост.md`, `Кольцо Смерти.md`, `Нимеран.md`, `Сорровы Сады.md`, `Резиденция Рознар.md`, `Магазины У Фидворда.md`, `Артефакты Бюргла Брупа.md`, `Бумажные Драконы.md`, `Дно Мокрой Собаки.md`, `Рыбацкая Деревушка.md`, `Школа солёного ветра.md`, `Сваи бессрочного протеста.md`, `Ресторан-Аквариум «Глубина».md`, `Срединное плато (Трущобы).md`.

## SHAPE

A location file is: prose -> a `# Локации` / `# Персонажи` bullet index of wikilinks -> Daggerheart statblocks -> trailing `%%` GM notes. 21 statblocks in ` ```daggerheart ` fences live across 7 files here; encounter variants use `impulses:` / `adversaries:` instead of `hp` / `attack` / `damage`. No `daggerheart` renderer exists under `quartz/`, so these fences ship as code blocks and are consumed by an external tool.

## CONVENTIONS

- `admin ` filename prefix = GM-only encounter prep (3 files in `Полярис/Глубоководье/`).
- ` TODO` filename suffix = unwritten note (`Дворец Последнего Императора TODO.md`).
- The `%%` hidden notes carry the design intent, not flavour text: `Подземье.md` states the locked door must open easily and may only be solved once; `Глубоководье.md` states the district is deliberately low-priority and its horror stays local; `Улей.md` records the setting taboo that insect comparisons are offensive to elves; `Фламфы.md` records the hard constraint "Нельзя внушить существу то чего оно не хочет".

## ANTI-PATTERNS

- Broken image embeds: `Зимний сад.md` references `Pasted image 20260907133950.png` and `Pasted image 20260907141310.png`; neither exists in `content/images`.
- Unresolved wikilinks in this folder: `[[Грибница]]`, `[[Дом Корф]]`, `[[Торговый дом «Тысяча Осколков»]]`, `[[Принцип Воды]]`, `[[Верховная Маг Лесс TODO]]`. `disableBrokenWikilinks: true` hides the failure.
- `Интериóр Небесной Бездны (Свод).md` mixes a Latin `ó` into Cyrillic; a link target must match it byte-for-byte.
- Duplicate statblock ids exist: `cz9bkdmvht` (`ФЛАМФ-СТРАЖ КЛУАТРА`) in `Лор/Фламфы.md` and `Подземье/Фламфыыы/Клуатр фламфов.md`; `qfx2ayeiyze` (`ГИГАНТСКИЙ СКОРПИОН`) in `Зимний сад.md` and `МОЛОДАЯ МЕРЦЕКРЫЛКА.md`.
- Empty stubs (`Срединное плато (Трущобы).md`, `Дворец Последнего Императора TODO.md`) contain only frontmatter.
- Keep the `admin ` prefix and the ` TODO` suffix intact - they are the only markers separating GM material from published lore.

## HOTSPOTS

`Подземье.md` is the dungeon hub, `admin Битва эко-протест.md` is the largest file and a pure encounter table, and `Полярис.md` is the root of the location graph.

## COMMANDS

No local tooling. `npx quartz build` publishes the tree; the `folder-page` plugin renders the folder indexes.
