//
// THIS FILE IS DEPRECATED AND WILL BE REMOVED IN THE FUTURE.
//
import {
  Block, Text, Doc, BlockQuote, OrderedList, BulletList, Schema,
  ListItem, HorizontalRule, Heading, Paragraph, Image, HardBreak, EmMark,
  StrongMark, CodeMark, NodeType, MarkType
} from 'ak-editor-prosemirror';

import { DelMarkType } from './marks/del';
import { LinkMarkType } from './marks/link';
import { Mention, Emoji } from './entity';
import { CodeBlockNodeType } from './nodes/code-block';

interface AtlassianEditorSchema extends Schema {
  nodes: {
    [name: string]: NodeType;

    doc: Doc;

    paragraph: Paragraph;
    blockquote: BlockQuote;
    ordered_list: OrderedList;
    bullet_list: BulletList;
    horizontal_rule: HorizontalRule;
    heading: Heading;

    list_item: ListItem;

    text: Text;
    image: Image;
    hard_break: HardBreak;

    code_block: CodeBlockNodeType;
    mention: Mention;
    emoji: Emoji;
  }

  marks: {
    [name: string]: MarkType;

    link: LinkMarkType;
    em: EmMark;
    strong: StrongMark;
    code: CodeMark;
    del: DelMarkType;
  }
}

export const schema = new Schema({
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

    code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
    mention: { type: Mention, group: 'inline' },
    emoji: { type: Emoji, group: 'inline' },
  },

  // Note: Marks are applied in the order they are defined.
  marks: {
    link: LinkMarkType,
    em: EmMark,
    strong: StrongMark,
    code: CodeMark,
    del: DelMarkType,
  },
}) as AtlassianEditorSchema;
