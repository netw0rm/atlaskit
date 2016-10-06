import {
  MarkdownSerializer as PMMarkdownSerializer,
  MarkdownSerializerState as PMMarkdownSerializerState,
  Node
} from 'ak-editor-prosemirror';
import {Mark} from "prosemirror/dist/model/mark";

/**
 * This function escapes all plain-text sequences that might get converted into markdown
 * formatting by Bitbucket server (via python-markdown).
 * @see MarkdownSerializerState.esc()
 */
function escapeMarkdown(str: string, startOfLine?: boolean) : string {
  str = str.replace(/[`*\\~+\[\]_]/g, "\\$&");
  if (startOfLine) str = str.replace(/^[:#-*]/, "\\$&").replace(/^(\d+)\./, "$1\\.");
  return str;
}

/**
 * Look for series of backticks in a string, find length of the longest one, then
 * generate a backtick chain of a length longer by one. This is the only proven way
 * to escape backticks inside code block and inline code (for python-markdown)
 */
const generateOuterBacktickChain: (text: string, minLength?: number) => string = (() => {
  function getMaxLength(text: String): number {
    return (text.match(/`+/g) || [])
      .reduce((prev, val) => (val.length > prev.length ? val : prev), '')
      .length
    ;
  }

  if (String.prototype.repeat) {
    return function (text: String, minLength = 1): string {
      return '`'.repeat(Math.max(minLength, getMaxLength(text) + 1));
    }
  } else {
    return function (text: String, minLength = 1): string {
      const length = Math.max(minLength, getMaxLength(text) + 1);
      let result = '';

      for (let x = 0; x < length; x++) {
        result += '`';
      }

      return result;
    }
  }
})();

const nodes = {
  blockquote(state: MarkdownSerializerState, node: Node) {
    state.wrapBlock("> ", null, node, () => state.renderContent(node));
  },
  code_block(state: MarkdownSerializerState, node: Node) {
    if (node.attrs.params == null) {
      state.wrapBlock("    ", null, node, () => state.text(node.textContent, false))
    } else {
      const backticks = generateOuterBacktickChain(node.textContent, 3);

      state.write(backticks + node.attrs.params + '\n');
      state.text(node.textContent, false);
      state.ensureNewLine();
      state.write(backticks);
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

export class MarkdownSerializer extends PMMarkdownSerializer {
  serialize(content: any, options?: Object) : string{
    let state = new MarkdownSerializerState(this.nodes, this.marks, options);
    state.renderContent(content);
    return state.out;
  }
}

export class MarkdownSerializerState extends PMMarkdownSerializerState {
  /**
   * This method override will properly escape backticks in text nodes with "code" mark enabled.
   * Bitbucket uses python-markdown which does not honor escaped backtick escape sequences \`
   * inside a backtick fence.
   *
   * @see node_modules/prosemirror/src/markdown/to_markdown.js
   * @see MarkdownSerializerState.renderInline()
   */
  renderInline(parent: Node) : void {
    let active: Mark[] = [];

    let progress = (node: Node | null) => {
      let marks = node ? node.marks : [];
      let code = marks.length && marks[marks.length - 1].type.isCode && marks[marks.length - 1];
      let len = marks.length - (code ? 1 : 0);

      // Try to reorder 'mixable' marks, such as em and strong, which
      // in Markdown may be opened and closed in different order, so
      // that order of the marks for the token matches the order in
      // active.
      outer: for (let i = 0; i < len; i++) {
        let mark: Mark = marks[i];
        if (!this.marks[mark.type.name].mixable) break;
        for (let j = 0; j < active.length; j++) {
          let other = active[j];
          if (!this.marks[other.type.name].mixable) break;
          if (mark.eq(other)) {
            if (i > j)
              marks = marks.slice(0, j).concat(mark).concat(marks.slice(j, i)).concat(marks.slice(i + 1, len));
            else if (j > i)
              marks = marks.slice(0, i).concat(marks.slice(i + 1, j)).concat(mark).concat(marks.slice(j, len));
            continue outer;
          }
        }
      }

      // Find the prefix of the mark set that didn't change
      let keep = 0;
      while (keep < Math.min(active.length, len) && marks[keep].eq(active[keep])) ++keep;

      // Close the marks that need to be closed
      while (keep < active.length)
        this.text(this.markString(active.pop(), false), false);

      // Open the marks that need to be opened
      while (active.length < len) {
        let add = marks[active.length];
        active.push(add);
        this.text(this.markString(add, true), false)
      }

      if (node) {
        if (!code || !node.isText) {
          this.render(node);

        } else if (node.text) {
          // Generate valid inline code, fenced with series of backticks longer that backtick series inside it.
          let text = node.text;
          const backticks = generateOuterBacktickChain(node.text as string, 1);

          // Make sure there is a space between fences, otherwise python-markdown renderer will get confused
          if (text.match(/^`/)) {
            text = ' ' + text;
          }

          if (text.match(/`$/)) {
            text += ' ';
          }

          this.text(backticks + text + backticks, false);
        }
      }
    };

    parent.forEach(progress);
    progress(null);
  }
}

export default new MarkdownSerializer(nodes, marks);
