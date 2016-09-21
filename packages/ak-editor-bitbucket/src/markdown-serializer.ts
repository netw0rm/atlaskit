import { MarkdownSerializer, MarkdownSerializerState, Node } from 'ak-editor-prosemirror';

/**
 * This function escapes all plain-text sequences that might get converted into markdown formatting by
 * Bitbucket server (via python-markdown).
 * @see MarkdownSerializerState.esc()
 *
 * @param str
 * @param startOfLine
 * @returns {string}
 */
function escapeMarkdown(str: string, startOfLine?: boolean) : string {
  str = str.replace(/[`*\\~+\[\]_]/g, "\\$&");
  if (startOfLine) str = str.replace(/^[:#-*]/, "\\$&").replace(/^(\d+)\./, "$1\\.");
  return str;
}

const nodes = {
  blockquote(state: MarkdownSerializerState, node: Node) {
    state.wrapBlock("> ", null, node, () => state.renderContent(node));
  },
  code_block(state: MarkdownSerializerState, node: Node) {
    if (node.attrs.params == null) {
      state.wrapBlock("    ", null, node, () => state.text(node.textContent, false))
    } else {
      state.write("```" + node.attrs.params + "\n");
      state.text(node.textContent, false);
      state.ensureNewLine();
      state.write("```");
      state.closeBlock(node)
    }
  },
  heading(state: MarkdownSerializerState, node: Node) {
    state.write(state.repeat("#", node.attrs.level) + " ");
    state.renderInline(node);
    state.closeBlock(node);
  },
  horizontal_rule(state: MarkdownSerializerState, node: Node) {
    state.write(node.attrs.markup || "---");
    state.closeBlock(node);
  },
  bullet_list(state: MarkdownSerializerState, node: Node) {
    node.attrs.tight = true;
    state.renderList(node, "  ", () => (node.attrs.bullet || "*") + " ")
  },
  ordered_list(state: MarkdownSerializerState, node: Node) {
    node.attrs.tight = true;
    let start = node.attrs.order || 1;
    let maxW = String(start + node.childCount - 1).length;
    let space = state.repeat(" ", maxW + 2);
    state.renderList(node, space, (i: number) => {
      let nStr = String(start + i);
      return state.repeat(" ", maxW - nStr.length) + nStr + ". "
    })
  },
  list_item(state: MarkdownSerializerState, node: Node) {
    state.renderContent(node);
  },
  paragraph(state: MarkdownSerializerState, node: Node) {
    state.renderInline(node);
    state.closeBlock(node);
  },
  image(state: MarkdownSerializerState, node: Node) {
    // Note: the "title" is not escaped in this flavor of markdown.
    state.write("![" + state.esc(node.attrs.alt || "") + "](" + state.esc(node.attrs.src) +
                (node.attrs.title ? ` "${node.attrs.title}"` : "") + ")")
  },
  hard_break(state: any) {
    state.write("\n");
  },
  text(state: MarkdownSerializerState, node: any) {
    let lines = node.text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      var startOfLine = state.atBlank() || state.closed;
      state.write();
      state.out += escapeMarkdown(lines[i], startOfLine);
      if (i != lines.length - 1) state.out += "\n"
    }
  },
};

const marks = {
  em: { open: "*", close: "*", mixable: true },
  strong: { open: "**", close: "**", mixable: true },
  del: { open: "~~", close: "~~", mixable: true },
  link: {
    open: "[",
    close(state: MarkdownSerializerState, mark: any) {
      // Note: the "title" is not escaped in this flavor of markdown.
      return "](" + state.esc(mark.attrs.href) + (mark.attrs.title ? ` "${mark.attrs.title}"` : "") + ")"
    }
  },
  code: { open: "`", close: "`" }
};

export default new MarkdownSerializer(nodes, marks);
