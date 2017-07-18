import {
  Plugin,
  PluginKey,
  EditorView,
  Slice,
  MarkdownParser,
  Schema,
} from '../../prosemirror';
import * as MarkdownIt from 'markdown-it';
import * as  emoji from 'markdown-it-emoji';

function isCode(str) {
  const lines = str.split(/\r?\n|\r/);
  if (3 > lines.length) {
    return false;
  }
  let weight = 0;
  lines.forEach(line => {
    // Ends with : or ;
    /[:;]$/.test(line) && weight++;
    // Contains second and third braces
    /[{}\[\]]/.test(line) && weight++;
    // Contains <tag> or </
    (/<\w+>/.test(line) || /<\//.test(line)) && weight++;
    // Contains () <- function calls
    /\(\)/.test(line) && weight++;
    // New line starts with less than two chars. e.g- if, {, <, etc
    const token = /^(\s+)[a-zA-Z<{]{2,}/.exec(line);
    token && 2 <= token[1].length && weight++;
    // My own additions
    // Contains second and third braces
    /&&/.test(line) && weight++;
  });
  return 4 <= weight && weight >= 0.5 * lines.length;
}

let atlassianMarkDownParser: MarkdownParser;

export const stateKey = new PluginKey('pastePlugin');

const plugin = new Plugin({
  key: stateKey,
  props: {
    handlePaste(view: EditorView, event: ClipboardEvent, slice: Slice) {
      if (!event.clipboardData) {
        return false;
      }
      const text = event.clipboardData.getData('text/plain');
      const html = event.clipboardData.getData('text/html');
      const node = slice.content.firstChild;
      const { schema } = view.state;

      if (
        (text && isCode(text)) ||
        (text && html && node && node.type === schema.nodes.codeBlock)
      ) {
        const codeBlockNode = schema.nodes.codeBlock.create(node ? node.attrs : {}, schema.text(text));
        const tr = view.state.tr.replaceSelectionWith(codeBlockNode);
        view.dispatch(tr.scrollIntoView());
        return true;
      }

      if (text && !html && atlassianMarkDownParser) {
        const doc = atlassianMarkDownParser.parse(text);
        if (doc && doc.content) {
          const tr = view.state.tr.replaceSelection(
            new Slice(doc.content, slice.openStart, slice.openEnd)
          );
          view.dispatch(tr.scrollIntoView());
          return true;
        }
      }

      return false;
    },
  }
});

const md = MarkdownIt('default', { html: false, linkify: true });
md.use(emoji);

const plugins = (schema: Schema<any, any>) => {
  atlassianMarkDownParser = new MarkdownParser(schema, md, {
    blockquote: { block: 'blockquote' },
    paragraph: { block: 'paragraph' },
    em: { mark: 'em' },
    strong: { mark: 'strong' },
    link: {
      mark: 'link', attrs: tok => ({
        href: tok.attrGet('href'),
        title: tok.attrGet('title') || null
      })
    },
    hr: { node: 'rule' },
    heading: { block: 'heading', attrs: tok => ({ level: +tok.tag.slice(1) }) },
    code_block: { block: 'codeBlock' },
    list_item: { block: 'listItem' },
    bullet_list: { block: 'bulletList' },
    ordered_list: { block: 'orderedList', attrs: tok => ({ order: +tok.attrGet('order') || 1 }) },
    code_inline: { mark: 'code' },
    fence: { block: 'codeBlock', attrs: tok => ({ language: tok.info || '' }) },
    image: {
      node: 'image', attrs: tok => ({
        src: tok.attrGet('src'),
        title: tok.attrGet('title') || null,
        alt: tok.children[0] && tok.children[0].content || null,
      })
    },
    emoji: {
      node: 'emoji', attrs: tok => ({
        shortName: `:${tok.markup}:`,
        text: tok.content,
      })
    },
    table: { block: 'table' },
    thead: { ignore: true },
    tr: { block: 'tableRow' },
    th: { blockP: 'tableHeader' },
    tbody: { ignore: true },
    td: { blockP: 'tableCell' },
    s: { mark: 'strike' },
  });
  return [plugin].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
