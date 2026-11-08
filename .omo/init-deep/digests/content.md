# DIGEST content/
## SCOPE
The campaign vault: Russian-language Obsidian-style Markdown that is the actual content of the published site. 59 tracked Markdown files plus 45 images; `content/` root holds 7 files.
Subfolders: `statblocks` (14), `Приключение` (17-18), `Персонажи` (19), `Главные герои` (4), `Локации` (36), `Лор` (7), `Фракции` (7), `Предметы` (2), `images` (45 binaries).
## KEY FILES
- `content/index.md` - vault home, `title:` frontmatter, chapter/character/shard index with wikilinks.
- `content/HomeRules.md` - rules of the vault ("home rules" sections).
- `content/TODO.md`, `content/Идеи.md`, `content/Spark table.md`, `content/Technical staff.md` - working notes.
- `content/Памятка по правилам Daggerheart.md` - rules cheat sheet.
## EXPORTS
Three publishing mechanisms, all driven by plugins configured in `quartz.config.yaml`:
- Wikilinks `[[Note]]`, `[[Note|Alias]]`, `[[Note#Section]]` (`crawl-links`, `markdownLinkResolution: shortest`, `disableBrokenWikilinks: true`).
- Image embeds `![[file.png]]` / `![[file.png|294]]` resolved flat against `content/images`.
- Hidden author notes `%% ... %%` stripped at render (`obsidian-flavored-markdown`, `comments: true`).
Entity kinds: lore note, shard/city/district location, dungeon room, faction, item, in-fiction newspaper issue, playable character sheet, NPC dossier, Daggerheart statblock.
## CONVENTIONS
- The only frontmatter key used across the vault is `draft: "true"` (quoted string, not boolean). `title` appears only on `content/index.md`. No `tags`, `aliases`, `description` or `cssclasses` anywhere.
- `draft: "true"` means "not published": the `remove-draft` plugin strips those pages from the build. Publishing = deleting that key.
- A ` TODO` filename suffix marks an unwritten note; `admin ` prefix marks GM-only encounter prep.
- `%%` = GM-only/hidden block; `>` = in-fiction speech; `###` = NPC name; `# Локации` / `# Персонажи` = bullet index of wikilinks.
- Location/room note order: prose -> bullet index -> statblocks -> trailing `%%` notes.
- Mechanics stay half-English inside Russian text (`Mark a Stress`, `Spend a Fear`, `range: Melee`, `range: Вплотную`).
- Filenames are the entity display name, never slugified: Cyrillic, spaces, `«»`, `№`, parentheses, apostrophes (`Де'Рела`), even combining diacritics (`Э́стер.md`) - links must match byte-for-byte.
## ANTI-PATTERNS
- `disableBrokenWikilinks: true` makes an unresolved link silently stop being a link - there is no build error to catch a renamed or mistyped target.
- Never rename an entity without fixing every inbound wikilink.
- Never put campaign content into `docs/` - that folder is the vendored Quartz documentation and is built as a separate site.
- Do not run `npm run format` over `content/`: Prettier covers `content/**/*.md` and would rewrite the hand-formatted campaign prose.
## HOTSPOTS
`content/index.md` is the link hub of the whole vault; `content/Локации/Полярис/Подземье/Дворец Последнего Императора/Подземье.md` (93 lines, 15 headings) is the hub of the largest dungeon.
Broken/duplicate references: `[[Новая Пантента — община Одноликих]]` uses an em-dash while the file uses a hyphen; `Пasted image 20260907133950.png` / `Pasted image 20260907141310.png` are referenced but absent from `content/images`.
## COMMANDS
`npx quartz build` (default `-d content`) builds the vault; `npx quartz build --serve` previews it locally; `npm run docs` serves the `docs/` tree instead - not the campaign.
