# AGENTS.md - quartz/cli/

11 files, ~4,619 LOC. The `quartz` command surface: yargs argv definitions, subcommand handlers and the CLI templates. This is the only part of `quartz/` written in plain JavaScript. Repo-wide conventions live in `../../AGENTS.md`.

## KEY FILES

- `args.js` - argv definitions. `CommonArgv` holds `directory` (`-d`, default `content`, described as "directory to look for content files"), `verbose` (`-v`) and `concurrency` (`-c`); per-command sets extend it (`CreateArgv`, `SyncArgv`, `BuildArgv`, `PluginArgv`).
- `handlers.js` (801) - subcommand handlers.
- `plugin-git-handlers.js` (1,768) - install / update / remove of git-sourced plugins; the largest file in the repository.
- `constants.js` - shared CLI constants.
- `plugin-data.js` - plugin manifest and cache handling.
- 4 `*.yaml` templates shipped with the CLI.

## EXPORTS

`CommonArgv`, `CreateArgv`, `SyncArgv`, `BuildArgv`, `PluginArgv` and the handler functions, consumed by `quartz/bootstrap-cli.mjs` (the `npm run quartz` entry point).

## CONVENTIONS

- Plain ESM JavaScript, camelCase names, loaded directly by `bootstrap-cli.mjs` without a compile step.
- Single-letter aliases (`-d`, `-v`, `-c`, `-t`, `-s`, `-X`, `-b`, `-l`) are declared once in `CommonArgv` and inherited by every command, so `-d` means the same thing everywhere.
- `-d` selects the content folder, not the project folder. `npx quartz build` therefore builds `content/`; `npx quartz build -d docs` builds the vendored documentation tree instead.
- New flags belong in the shared argv object only if they make sense for every subcommand.

## ANTI-PATTERNS

- `--clean` and `--latest` are mutually incompatible; combining them is rejected.
- `--concurrency` must be >= 1.
- On Windows, plugin paths handed to the git handlers must be `file://` URLs.
- Do not introduce TypeScript-only syntax here, and do not import build-time-only modules - the CLI runs before any build exists.
- Do not add a flag that shadows an existing shared alias.

## HOTSPOTS

`plugin-git-handlers.js` (1,768 LOC) dominates the directory and the repository; `handlers.js` (801) is second. Both are behavioural hotspots for plugin installation, which is the first thing that runs in CI.

## COMMANDS

- `npm run quartz -- <args>` - run the CLI (`quartz/bootstrap-cli.mjs`).
- `npx quartz build` / `npx quartz build --serve` / `npx quartz plugin install` - the commands used day to day.
- `npm run profile` - profiles `build --concurrency=1` under `0x`.
