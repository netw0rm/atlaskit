import {
  Block, Text, Doc, BlockQuote, OrderedList, BulletList, Schema,
  ListItem, HorizontalRule, Heading, Paragraph, Image, HardBreak, EmMark,
  StrongMark, CodeMark,
} from 'ak-editor-prosemirror';

import LinkMarkExclusiveRight from './link-mark-exclusive-right';
import { Mention, Emoji } from './entity';
import { CodeBlock } from './code-block';
import { DelMark } from './del-mark';

const schemaSpec = {
  nodes: {
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

    code_block: { type: CodeBlock, content: 'text*', group: 'block' },
    mention: { type: Mention, group: 'inline' },
    emoji: { type: Emoji, group: 'inline' },
  },

  // Note: Marks are applied in the order they are defined.
  marks: {
    link: LinkMarkExclusiveRight,
    em: EmMark,
    strong: StrongMark,
    code: CodeMark,
    del: DelMark,
  },
};
export const schema = new Schema(schemaSpec);
