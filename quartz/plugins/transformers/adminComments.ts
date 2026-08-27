import type { QuartzTransformerPlugin } from "../types"

type MarkdownNode = {
  type: string
  value?: string
  children?: MarkdownNode[]
  data?: {
    hName?: string
    hProperties?: Record<string, unknown>
  }
}

const blockParents = new Set(["root", "blockquote", "listItem"])

function commentLabel(value: string): MarkdownNode[] {
  return [
    {
      type: "strong",
      children: [{ type: "text", value: "Admin comment" }],
    },
    { type: "text", value: value.length > 0 ? `: ${value}` : "" },
  ]
}

function revealComments(parent: MarkdownNode): void {
  if (!parent.children) return

  for (let index = 0; index < parent.children.length; index++) {
    const child = parent.children[index]
    if (child.type === "comment") {
      const value = (child.value ?? "").trim()
      parent.children[index] = blockParents.has(parent.type)
        ? {
            type: "blockquote",
            data: { hProperties: { className: ["admin-comment"] } },
            children: [{ type: "paragraph", children: commentLabel(value) }],
          }
        : {
            type: "emphasis",
            data: {
              hName: "span",
              hProperties: { className: ["admin-comment", "admin-comment-inline"] },
            },
            children: commentLabel(value),
          }
      continue
    }

    revealComments(child)
  }
}

/** Reveals Obsidian %% comments before the regular OFM transformer removes them. */
export const AdminComments: QuartzTransformerPlugin = () => ({
  name: "AdminComments",
  markdownPlugins() {
    return [() => (tree: unknown) => revealComments(tree as MarkdownNode)]
  },
  externalResources() {
    return {
      css: [
        {
          inline: true,
          content: `
.admin-comment {
  border-color: var(--secondary);
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
}
.admin-comment-inline {
  display: inline;
  padding: 0.1rem 0.3rem;
  border: 1px dashed var(--secondary);
  border-radius: 0.25rem;
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
