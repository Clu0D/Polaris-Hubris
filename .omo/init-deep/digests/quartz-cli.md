# DIGEST quartz/cli/
## SCOPE
11 files, ~4,619 LOC. The `quartz` command-line surface (JavaScript, not TypeScript) plus yargs argument definitions and templates.
## KEY FILES
- `cli/args.js` - yargs argv definitions: `CommonArgv` (`directory`/`-d`, default `content`, "directory to look for content files"; `verbose`/`-v`; `concurrency`/`-c`), plus per-command arg sets for `create`, `sync`, `build`, `plugin`.
- `cli/handlers.js` (801) - subcommand handlers.
- `cli/plugin-git-handlers.js` (1,768) - largest file in the whole repository: install/update/remove of git-sourced plugins.
- `cli/constants.js` - shared CLI constants.
- `cli/plugin-data.js` - plugin manifest/cache handling.
- `cli/*.yaml` - CLI template files (4 YAML templates).
## EXPORTS
`CommonArgv`, `CreateArgv`, `SyncArgv`, `BuildArgv`, `PluginArgv` (yargs argv objects) and the handler functions used by `quartz/bootstrap-cli.mjs`.
## CONVENTIONS
- Plain ESM JavaScript with JSDoc-free, snake-free camelCase naming; this is the one part of `quartz/` that is not TypeScript.
- Arg aliases are single letters (`-d`, `-v`, `-c`, `-t`, `-s`, `-X`, `-b`, `-l`).
- Every command reuses `CommonArgv` so `-d`/`-v`/`-c` behave identically everywhere.
## ANTI-PATTERNS
- `--clean` and `--latest` cannot be combined.
- `--concurrency` must be >= 1 (0 or negative is rejected).
- On Windows, plugin paths passed to git handlers must be `file://` URLs.
- Do not add TypeScript-only syntax to `cli/` - it is loaded directly by `quartz/bootstrap-cli.mjs` without a build step.
## HOTSPOTS
`cli/plugin-git-handlers.js` (1,768 LOC) dominates the directory and the repo; `cli/handlers.js` (801) is the second.
## COMMANDS
`npm run quartz -- <args>` -> `quartz/bootstrap-cli.mjs`; `npx quartz build`, `npx quartz build --serve`, `npx quartz plugin install`; `npm run profile` runs the CLI under `0x` with `--concurrency=1`.
