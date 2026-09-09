import type { QuartzTransformerPlugin } from "../types"
import { slugifyFilePath, type FilePath } from "../../util/path"

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
      folder.classList.toggle(
        "folder-without-page",
        !expectedSource || renderedSource !== expectedSource,
      );
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
