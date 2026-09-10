import assert from "node:assert"
import test from "node:test"
import type { Element, Root } from "hast"
import { VFile } from "vfile"
import { simplifySlug, type FilePath, type FullSlug } from "../../util/path"
import { getFolderLinkTargets, rewriteShortestFolderLinks } from "./siteEnhancements"

function internalLink(href: string, slug: string): Element {
  return {
    type: "element",
    tagName: "a",
    properties: {
      href,
      className: ["internal", "internal-link", "broken"],
      "data-slug": slug,
    },
    children: [{ type: "text", value: "Полярис" }],
  }
}

function page(slug: string, link: Element): [Root, VFile] {
  const tree: Root = { type: "root", children: [link] }
  const file = new VFile("")
  file.data.slug = slug as FullSlug
  file.data.links = [simplifySlug(link.properties["data-slug"] as string)]
  return [tree, file]
}

test("rewrites a shortest wikilink to a uniquely named folder note", () => {
  const link = internalLink("./полярис#районы", "полярис")
  const [tree, file] = page("index", link)
  const targets = getFolderLinkTargets([
    "index.md" as FilePath,
    "Локации/Полярис/Полярис.md" as FilePath,
  ])

  rewriteShortestFolderLinks(tree, file, targets, new Set(["index", "локации/полярис/index"]))

  assert.strictEqual(link.properties.href, "./локации/полярис/#районы")
  assert.strictEqual(link.properties["data-slug"], "локации/полярис/index")
  assert.deepStrictEqual(link.properties.className, ["internal", "internal-link"])
  assert.deepStrictEqual(file.data.links, ["локации/полярис/"])
})

test("does not guess when two folder notes have the same name", () => {
  const link = internalLink("./полярис", "полярис")
  const [tree, file] = page("index", link)
  const targets = getFolderLinkTargets([
    "Локации/Полярис/Полярис.md" as FilePath,
    "Черновики/Полярис/Полярис.md" as FilePath,
  ])

  rewriteShortestFolderLinks(tree, file, targets, new Set(["index"]))

  assert.strictEqual(link.properties.href, "./полярис")
  assert.strictEqual(link.properties["data-slug"], "полярис")
  assert.ok((link.properties.className as string[]).includes("broken"))
})

test("keeps a real page match ahead of a folder-name fallback", () => {
  const link = internalLink("./полярис", "полярис")
  const [tree, file] = page("index", link)
  const targets = getFolderLinkTargets(["Локации/Полярис/Полярис.md" as FilePath])

  rewriteShortestFolderLinks(
    tree,
    file,
    targets,
    new Set(["index", "полярис", "локации/полярис/index"]),
  )

  assert.strictEqual(link.properties.href, "./полярис")
  assert.strictEqual(link.properties["data-slug"], "полярис")
})
