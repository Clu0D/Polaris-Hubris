import type { QuartzTransformerPlugin } from "../types"

// The Explorer package treats the root index as data for its invisible trie root.
// Add that page back as an ordinary, titled entry after Explorer renders its tree.
const explorerRootScript = String.raw`
  let explorerRootEntry;

  function renderExplorerRoot() {
    if (!explorerRootEntry) return;

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

  async function loadExplorerRoot() {
    const index = await fetchData;
    const content = index?.content ?? index;
    explorerRootEntry = content?.index;
    renderExplorerRoot();
  }

  const explorerObserver = new MutationObserver(() => renderExplorerRoot());
  explorerObserver.observe(document.body, { childList: true, subtree: true });
  loadExplorerRoot();
  document.addEventListener("nav", renderExplorerRoot);
  document.addEventListener("render", renderExplorerRoot);
`

export const SiteEnhancements: QuartzTransformerPlugin = () => ({
  name: "SiteEnhancements",
  externalResources() {
    return {
      js: [
        {
          loadTime: "afterDOMReady",
          contentType: "inline",
          script: explorerRootScript,
        },
      ],
    }
  },
})
