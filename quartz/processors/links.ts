import type { Element, Root } from "hast"
import type { ProcessedContent } from "../plugins/vfile"
import { FilePath, FullSlug, slugifyFilePath } from "../util/path"

function classNames(element: Element): string[] {
  const value = element.properties.className
  if (Array.isArray(value)) return value.map(String)
  return []
}

function synchronizeLinks(node: Root | Element, publishedSlugs: ReadonlySet<string>): void {
  for (const child of node.children) {
    if (child.type !== "element") continue

    if (child.tagName === "a") {
      const classes = classNames(child)
      const slug = child.properties["data-slug"]
      if (classes.includes("internal") && typeof slug === "string") {
        const isPublished = publishedSlugs.has(slug)
        const withoutBroken = classes.filter((name) => name !== "broken")
        child.properties.className = isPublished ? withoutBroken : [...withoutBroken, "broken"]
      }
    }

    synchronizeLinks(child, publishedSlugs)
  }
}

/** Make public links reflect the post-filter site, rather than every source note. */
export function markUnpublishedLinks(
  content: ProcessedContent[],
  sourceFiles: readonly string[],
): void {
  const publishedSlugs = new Set<string>()
  for (const sourceFile of sourceFiles) {
    if (!sourceFile.endsWith(".md")) {
      publishedSlugs.add(slugifyFilePath(sourceFile as FilePath))
    }
  }
  for (const [, file] of content) {
    if (file.data.slug) publishedSlugs.add(file.data.slug as FullSlug)
  }

  for (const [tree] of content) synchronizeLinks(tree, publishedSlugs)
}
