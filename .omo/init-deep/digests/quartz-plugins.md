# DIGEST quartz/plugins/
## SCOPE
30 files, ~5,613 LOC. The plugin runtime: loader, transformers, filters, emitters, page types, and the JSON schema for `quartz.config.yaml`.
## KEY FILES
- `plugins/index.ts` - `getStaticResourcesFromPlugins`; the plugin-facing barrel.
- `plugins/types.ts` - `PluginTypes` and the transformer/filter/emitter/pageType contracts.
- `plugins/loader/config-loader.ts` (976) - resolves `quartz.config.yaml`, merges YAML options with `componentRegistry.getOptionOverrides()`, instantiates components.
- `plugins/loader/gitLoader.ts` (1,173) - installs and loads git-sourced plugins.
- `plugins/loader/install-plugins.ts` - `npm run install-plugins` entry, honours `quartz.lock.json`.
- `plugins/dispatcher.ts` - plugin dispatch by type.
- `plugins/componentResources.ts` (525) - turns registered components into page resources.
- `plugins/quartz-plugins.schema.json` - schema referenced by `quartz.config.yaml`'s `$schema`.
## EXPORTS
`PluginTypes`, `getStaticResourcesFromPlugins`, per-type plugin functions (transformer/filter/emitter/pageType), `QuartzTransformerPlugin`.
## CONVENTIONS
- A plugin factory is PascalCase and returns a plugin object; plugin objects carry `name`, `displayName`, `description`, `version`, `author`, `optionsSchema`.
- Plugin entries in `quartz.config.yaml` are `{source, enabled, options, order}`; `order` is numeric and defaults to 50.
- Options are validated against `optionsSchema` at load time.
## ANTI-PATTERNS
- Dependency ordering is explicit: a plugin's `order` must place it after everything it depends on.
- A plugin must not assume it is the only instance of a package; singleton packages are shared.
- On Windows, plugin paths have to be turned into `file://` URLs before being handed to the loader.
- Options overrides registered through the component registry must not be cached across a change (the registry clears its instance cache when overrides change).
## HOTSPOTS
`loader/gitLoader.ts` (1,173) and `loader/config-loader.ts` (976) hold the most complex logic; `config-loader.ts` is imported by nearly every entry point.
## COMMANDS
`npx quartz plugin install`; `npm run install-plugins` (also the `prebuild` hook); `npx quartz build` exercises the whole chain.
