import type { Element, Root } from "hast"
import { visit } from "unist-util-visit"
import type { VFile } from "vfile"
import type { QuartzTransformerPlugin } from "../types"
import {
  resolveRelative,
  simplifySlug,
  slugifyFilePath,
  type FilePath,
  type FullSlug,
} from "../../util/path"

type FolderLinkTargets = ReadonlyMap<string, FullSlug>

function classNames(element: Element): string[] {
  const value = element.properties.className
  if (Array.isArray(value)) return value.map(String)
  return []
}

// CrawlLinks' `shortest` strategy normally matches a wikilink against a slug's
// final segment. Folder notes end in `/index`, however, so `[[Folder]]` needs to
// match the preceding folder segment instead. Ambiguous folder names are omitted
// and still require an explicit path, matching the normal shortest-link behaviour.
export function getFolderLinkTargets(allFiles: readonly FilePath[]): FolderLinkTargets {
  const candidates = new Map<string, FullSlug | null>()

  for (const filePath of allFiles) {
    if (!filePath.endsWith(".md")) continue
    const slug = slugifyFilePath(filePath)
    if (!slug.endsWith("/index")) continue

    const segments = slug.split("/")
    const folderName = segments.at(-2)
    if (!folderName) continue

    candidates.set(folderName, candidates.has(folderName) ? null : slug)
  }

  return new Map([...candidates].filter((entry): entry is [string, FullSlug] => entry[1] !== null))
}

export function rewriteShortestFolderLinks(
  tree: Root,
  file: VFile,
  folderTargets: FolderLinkTargets,
  allSlugs: ReadonlySet<string>,
): void {
  const sourceSlug = file.data.slug as FullSlug | undefined
  if (!sourceSlug) return

  const rewritten = new Map<string, FullSlug>()

  visit(tree, "element", (node) => {
    if (node.tagName !== "a" || !node.properties) return

    const classes = classNames(node)
    const unresolvedSlug = node.properties["data-slug"]
    const href = node.properties.href
    if (
      !classes.includes("internal") ||
      typeof unresolvedSlug !== "string" ||
      typeof href !== "string" ||
      allSlugs.has(unresolvedSlug)
    ) {
      return
    }

    const folderName = unresolvedSlug.split("/").at(-1)
    const targetSlug = folderName ? folderTargets.get(folderName) : undefined
    if (!targetSlug) return

    const anchorIndex = href.indexOf("#")
    const anchor = anchorIndex === -1 ? "" : href.slice(anchorIndex)
    node.properties.href = resolveRelative(sourceSlug, targetSlug) + anchor
    node.properties["data-slug"] = targetSlug
    node.properties.className = classes.filter((className) => className !== "broken")
    rewritten.set(unresolvedSlug, targetSlug)
  })

  if (rewritten.size === 0) return

  const outgoing = new Set(
    Array.isArray(file.data.links)
      ? file.data.links.filter((link) => typeof link === "string")
      : [],
  )
  for (const [unresolvedSlug, targetSlug] of rewritten) {
    outgoing.delete(simplifySlug(unresolvedSlug))
    outgoing.add(simplifySlug(targetSlug))
  }
  file.data.links = [...outgoing]
}

// Restore the root page hidden by Explorer's trie and distinguish authored folder pages
// from the generated folder listings without modifying the external Explorer package.
function explorerEnhancementsScript(folderPageSources: Record<string, string>): string {
  return String.raw`
  let explorerRootEntry;
  let explorerContent;
  const folderPageSources = ${JSON.stringify(folderPageSources)};

  function markFolderPageAvailability() {
    if (!explorerContent) return;

    for (const folder of document.querySelectorAll(".folder-container[data-folderpath]")) {
      const folderPath = folder.dataset.folderpath;
      const expectedSource = folderPageSources[folderPath];
      const renderedSource = explorerContent[folderPath]?.filePath;
      const hasAuthoredPage = Boolean(expectedSource && renderedSource === expectedSource);
      folder.classList.toggle("folder-with-page", hasAuthoredPage);
      folder.classList.toggle("folder-without-page", !hasAuthoredPage);
    }
  }

  function renderExplorerRoot() {
    if (explorerRootEntry) {
      for (const tree of document.querySelectorAll(".explorer-ul")) {
        if (tree.querySelector(':scope > li[data-root-index="true"]')) continue;

        const item = document.createElement("li");
        item.dataset.rootIndex = "true";
        const link = document.createElement("a");
        const basePath = document.body?.dataset?.basepath ?? "";
        link.href = basePath ? basePath + "/" : "/";
        link.className = "nav-file-title tree-item-self";
        link.textContent = explorerRootEntry.title || "index";
        if ((document.body?.dataset?.slug ?? "") === "index") {
          link.classList.add("active", "is-active");
        }
        item.appendChild(link);

        const overflowMarker = tree.querySelector(":scope > .overflow-end");
        if (overflowMarker) overflowMarker.after(item);
        else tree.prepend(item);
      }
    }

    markFolderPageAvailability();
  }

  async function loadExplorerContent() {
    const index = await fetchData;
    explorerContent = index?.content ?? index;
    explorerRootEntry = explorerContent?.index;
    renderExplorerRoot();
  }

  const explorerObserver = new MutationObserver(() => renderExplorerRoot());
  explorerObserver.observe(document.body, { childList: true, subtree: true });
  loadExplorerContent();
  document.addEventListener("nav", renderExplorerRoot);
  document.addEventListener("render", renderExplorerRoot);
`
}

function getFolderPageSources(allFiles: readonly FilePath[]): Record<string, string> {
  return Object.fromEntries(
    allFiles
      .filter((filePath) => filePath.endsWith(".md"))
      .map((filePath) => [slugifyFilePath(filePath), filePath])
      .filter(([slug]) => slug.endsWith("/index")),
  )
}

export const SiteEnhancements: QuartzTransformerPlugin = () => ({
  name: "SiteEnhancements",
  htmlPlugins(ctx) {
    const folderTargets = getFolderLinkTargets(ctx.allFiles)
    const allSlugs = new Set<string>(ctx.allSlugs)
    return [() => (tree, file) => rewriteShortestFolderLinks(tree, file, folderTargets, allSlugs)]
  },
  externalResources(ctx) {
    return {
      js: [
        {
          loadTime: "afterDOMReady",
          contentType: "inline",
          script: explorerEnhancementsScript(getFolderPageSources(ctx.allFiles)),
        },
      ],
    }
  },
})
