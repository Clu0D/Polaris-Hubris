import type { QuartzTransformerPlugin } from "../types"
import type { Root as HtmlRoot } from "hast"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkObsidian from "@quartz-community/remark-obsidian"

type MarkdownNode = {
  type: string
  value?: string
  children?: MarkdownNode[]
  position?: {
    start: { offset?: number }
    end: { offset?: number }
  }
  data?: {
    hName?: string
    hProperties?: Record<string, unknown>
  }
}

const blockParents = new Set(["root", "blockquote", "listItem"])
const commentParser = unified()
  .use(remarkParse)
  .use(remarkObsidian, {
    wikilinks: true,
    highlights: true,
    tags: true,
    customTaskChars: true,
  })

function commentLabel(): MarkdownNode[] {
  return []
}

function parseComment(value: string): MarkdownNode[] {
  return commentParser.parse(value).children as MarkdownNode[]
}

function commentSource(node: MarkdownNode, source: string): string {
  const start = node.position?.start.offset
  const end = node.position?.end.offset
  if (start !== undefined && end !== undefined) {
    return source.slice(start + 2, end - 2).trim()
  }
  return (node.value ?? "").trim()
}

function revealComments(parent: MarkdownNode, source: string): void {
  if (!parent.children) return

  for (let index = 0; index < parent.children.length; index++) {
    const child = parent.children[index]
    if (child.type === "comment") {
      const value = commentSource(child, source)
      parent.children[index] = blockParents.has(parent.type)
        ? {
            type: "blockquote",
            data: {
              hName: "div",
              hProperties: { className: ["admin-comment"] },
            },
            children: [
              {
                type: "paragraph",
                data: { hProperties: { className: ["admin-comment-label"] } },
                children: commentLabel(),
              },
              ...parseComment(value),
            ],
          }
        : {
            type: "emphasis",
            data: {
              hName: "span",
              hProperties: { className: ["admin-comment", "admin-comment-inline"] },
            },
            children: [
              ...commentLabel(),
              { type: "text", value: value.length > 0 ? `: ${value}` : "" },
            ],
          }
      continue
    }

    revealComments(child, source)
  }
}

function addDraftNotice(tree: HtmlRoot, draft: unknown): void {
  if (draft !== true && draft !== "true") return

  tree.children.unshift({
    type: "element",
    tagName: "aside",
    properties: { className: ["admin-draft-notice"] },
    children: [{ type: "text", value: "Мастерская заметка" }],
  })
}

/** Reveals Obsidian %% comments before the regular OFM transformer removes them. */
export const AdminComments: QuartzTransformerPlugin = () => ({
  name: "AdminComments",
  markdownPlugins() {
    return [() => (tree: unknown, file) => revealComments(tree as MarkdownNode, file.value.toString())]
  },
  htmlPlugins() {
    return [() => (tree, file) => addDraftNotice(tree, file.data.frontmatter?.draft)]
  },
  externalResources() {
    return {
      css: [
        {
          inline: true,
          content: `
.admin-comment {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px dashed var(--secondary);
  border-radius: 0.4rem;
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
}
.admin-comment > :first-child {
  margin-top: 0;
}
.admin-comment > :last-child {
  margin-bottom: 0;
}
.admin-comment-label {
  color: var(--secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.admin-comment-inline {
  display: inline;
  padding: 0.1rem 0.3rem;
  border: 1px dashed var(--secondary);
  border-radius: 0.25rem;
}
.admin-draft-notice {
  margin: 0 0 1rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--secondary);
  border-radius: 0.35rem;
  color: var(--secondary);
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
  font-weight: 600;
}
body::after {
  content: "ADMIN · drafts and comments visible";
  position: fixed;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 1000;
  padding: 0.35rem 0.6rem;
  border-radius: 0.35rem;
  color: var(--light);
  background: var(--secondary);
  font: 600 0.75rem/1.2 var(--bodyFont);
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
}
`,
        },
      ],
    }
  },
})
