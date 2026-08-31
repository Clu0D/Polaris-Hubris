import assert from "node:assert"
import test from "node:test"
import type { Element, Root } from "hast"
import { VFile } from "vfile"
import type { ProcessedContent } from "../plugins/vfile"
import type { FullSlug } from "../util/path"
import { markUnpublishedLinks } from "./links"

function page(slug: string, links: Element[]): ProcessedContent {
  const tree: Root = { type: "root", children: links }
  const file = new VFile("")
  file.data.slug = slug as FullSlug
  return [tree, file]
}

function link(slug: string, classes = ["internal"]): Element {
  return {
    type: "element",
    tagName: "a",
    properties: { className: classes, "data-slug": slug },
    children: [{ type: "text", value: slug }],
  }
}

test("marks links to filtered notes as broken", () => {
  const published = link("published")
  const draft = link("draft")
  const content = [page("index", [published, draft]), page("published", [])]

  markUnpublishedLinks(content, ["index.md", "published.md", "draft.md"])

  assert.deepStrictEqual(published.properties.className, ["internal"])
  assert.deepStrictEqual(draft.properties.className, ["internal", "broken"])
})

test("removes a stale broken class after a note becomes published", () => {
  const target = link("target", ["internal", "broken"])
  const content = [page("index", [target]), page("target", [])]

  markUnpublishedLinks(content, ["index.md", "target.md"])

  assert.deepStrictEqual(target.properties.className, ["internal"])
})
