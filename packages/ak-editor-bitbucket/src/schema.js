import { Schema, Block, Inline, Attribute, Text } from 'prosemirror/dist/model';
import { Doc, BlockQuote, OrderedList, BulletList,
       ListItem, HorizontalRule, Heading, Paragraph,
       Image, HardBreak, EmMark, StrongMark,
       LinkMark, CodeMark } from 'prosemirror/dist/schema-basic';

export class CodeBlock extends Block {
  get isCode() { return true; }
  get matchDOMTag() { return { pre: [null, { preserveWhitespace: true }] }; }
  toDOM() { return ['pre', 0]; }
}

export class EntityInline extends Inline {
  get attrs() {
    return {
      data: new Attribute({ default: '@' }),
      activate: new Attribute({ default: true }),
    };
  }
  get matchDOMTag() {
    return {
      'span[editor-node-type=entity]': (dom) => ({
        data: dom.getAttribute('editor-data'),
        activate: (dom.getAttribute('editor-activate') === 'true'),
      }),
    };
  }
  toDOM(node) {
    const attrs = {};
    attrs['editor-data'] = node.attrs.data;
    attrs.contenteditable = 'false';
    attrs['editor-node-type'] = 'entity';

    if (node.attrs.activate) {
      attrs['editor-activate'] = 'true';
    }
    return ['span', attrs];
  }
}

export const schema = new Schema({
  nodes: {
    // imported from schema-basic
    doc: { type: Doc, content: 'block+' },

    paragraph: { type: Paragraph, content: 'inline<_>*', group: 'block' },
    blockquote: { type: BlockQuote, content: 'block+', group: 'block' },
    ordered_list: { type: OrderedList, content: 'list_item+', group: 'block' },
    bullet_list: { type: BulletList, content: 'list_item+', group: 'block' },
    horizontal_rule: { type: HorizontalRule, group: 'block' },
    heading: { type: Heading, content: 'inline<_>*', group: 'block' },

    list_item: { type: ListItem, content: 'paragraph block*' },

    text: { type: Text, group: 'inline' },
    image: { type: Image, group: 'inline' },
    hard_break: { type: HardBreak, group: 'inline' },

    // custom nodes
    code_block: { type: CodeBlock, content: 'text*', group: 'block' },
    entity_inline: { type: EntityInline, group: 'inline' },
  },

  marks: {
    em: EmMark,
    strong: StrongMark,
    link: LinkMark,
    code: CodeMark,
  },
});
