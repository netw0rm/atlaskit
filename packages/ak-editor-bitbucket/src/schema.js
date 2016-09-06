import {
  Block, Text, Doc, BlockQuote, OrderedList, BulletList,
  ListItem, HorizontalRule, Heading, Paragraph, Image, HardBreak, EmMark,
  StrongMark, LinkMark, CodeMark,
} from 'ak-editor-prosemirror';

import { Mention } from 'ak-editor-plugin-mentions';

export class CodeBlock extends Block {
  get isCode() { return true; }
  get matchDOMTag() { return { pre: [null, { preserveWhitespace: true }] }; }
  toDOM() { return ['pre', 0]; }
}

export const schema = {
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
    mention: { type: Mention, group: 'inline' },
  },

  marks: {
    em: EmMark,
    strong: StrongMark,
    link: LinkMark,
    code: CodeMark,
  },
};
