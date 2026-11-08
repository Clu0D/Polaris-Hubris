# AGENTS.md - quartz/plugins/

30 files, ~5,613 LOC. The plugin runtime: config loading, git plugin installation, and the transformer/filter/emitter/pageType contracts every `quartz.config.yaml` entry resolves to. Repo-wide conventions live in `../../AGENTS.md`.

## KEY FILES

- `index.ts` - public barrel; `getStaticResourcesFromPlugins` collects static assets from all enabled plugins.
- `types.ts` - `PluginTypes` and the transformer / filter / emitter / pageType plugin shapes.
- `dispatcher.ts` - dispatches a parsed page to the plugins of the matching type.
- `loader/config-loader.ts` (976) - reads `quartz.config.yaml`, resolves each entry, merges YAML options with `componentRegistry.getOptionOverrides(name)` and instantiates plugin components.
- `loader/gitLoader.ts` (1,173) - clones, updates and removes git-sourced plugins; owns the `file://` URL handling on Windows.
- `loader/install-plugins.ts` - `npm run install-plugins` entry point; honours `quartz.lock.json`.
- `componentResources.ts` (525) - turns registered components into page resources.
- `quartz-plugins.schema.json` - schema referenced by `quartz.config.yaml`'s `$schema` key.

## EXPORTS

`PluginTypes`, `getStaticResourcesFromPlugins`, the four plugin-type function families, `QuartzTransformerPlugin`, and the loader entry points.

## CONVENTIONS

- A plugin factory is PascalCase and returns a plugin object carrying `name`, `displayName`, `description`, `version`, `author` and an `optionsSchema`.
- Config entries are `{source, enabled, options, order}`; `order` is numeric, defaults to 50, and is the only ordering mechanism.
- Plugin options are validated against `optionsSchema` at load time - a bad option fails the build, not the page render.
- Component-backed plugins register themselves in `componentRegistry`; the loader only reads that registry.

## ANTI-PATTERNS

- Ordering is explicit: a plugin's `order` must place it after every plugin it depends on. `order` collisions are resolved silently.
- A plugin must not assume it is the only instance of a shared package - singleton packages are shared across plugins.
- On Windows, plugin paths must be converted to `file://` URLs before they reach the git loader.
- Do not cache a component instance across an options change: the registry clears its cache when the option overrides change, and bypassing that leaves a stale component in the page.
- Do not read `quartz.config.yaml` directly from a plugin; go through the loader so overrides and defaults are applied.

## HOTSPOTS

`loader/gitLoader.ts` (1,173) and `loader/config-loader.ts` (976) hold the most complex logic, and `config-loader.ts` is imported by nearly every entry point in the runtime. `componentResources.ts` is the boundary between plugins and the rendering layer.

## COMMANDS

- `npx quartz plugin install` - install the plugins named in `quartz.config.yaml`.
- `npm run install-plugins` - same through `tsx`; runs automatically as `prebuild`.
- `npx quartz build` - exercises loader, dispatcher and emitters end to end.
