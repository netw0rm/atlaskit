import {
  Plugin,
  PluginKey,
  EditorView,
  Slice,
  MarkdownParser,
  Schema,
} from '../../prosemirror';
import * as MarkdownIt from 'markdown-it';
import table from 'markdown-it-table';

function isCode(str) {
  const lines = str.split(/\r?\n|\r/);
  if (3 > lines.length) {
    return false;
  }
  let weight = 0;
  lines.forEach(line => {
    // Ends with : or ;
    if (/[:;]$/.test(line)) { weight++; }
    // Contains second and third braces
    if (/[{}\[\]]/.test(line)) { weight++; }
    // Contains <tag> or </
    if ((/<\w+>/.test(line) || /<\//.test(line))) { weight++; }
    // Contains () <- function calls
    if (/\(\)/.test(line)) { weight++; }
    // New line starts with less than two chars. e.g- if, {, <, etc
    const token = /^(\s+)[a-zA-Z<{]{2,}/.exec(line);
    if (token && 2 <= token[1].length) { weight++; }
    if (/&&/.test(line)) { weight++; }
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

const pmSchemaToMdMapping = {
  nodes: {
    blockquote: 'blockquote',
    paragraph: 'paragraph',
    rule: 'hr',
    // lheading (---, ===)
    heading: ['heading', 'lheading'],
    codeBlock: ['code', 'fence'],
    listItem: 'list',
    image: 'image',
  },
  marks: {
    em: 'emphasis',
    strong: 'text',
    link: ['link', 'autolink', 'reference'],
    strike: 'strikethrough',
    code: 'backticks',
  }
};

const plugins = (schema: Schema<any, any>) => {
  const md = MarkdownIt('zero', { html: false, linkify: true });
  md.enable([
    // Process html entity - &#123;, &#xAF;, &quot;, ...
    'entity',
    // Process escaped chars and hardbreaks
    'escape'
  ]);

  // Enable markdown plugins based on schema
  ['nodes', 'marks'].forEach(key => {
    for (const idx in pmSchemaToMdMapping[key]) {
      if (schema[key][idx]) {
        md.enable(pmSchemaToMdMapping[key][idx]);
      }
    }
  });

  if (schema.nodes.table) {
    md.use(table);
  }

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
    tr: { block: 'tableRow' },
    th: { block: 'tableHeader' },
    td: { block: 'tableCell' },
    s: { mark: 'strike' },
  });
  return [plugin].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
