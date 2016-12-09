//
// THIS FILE IS DEPRECATED AND WILL BE REMOVED IN THE FUTURE.
//
import { Block, Text, Schema, NodeType, MarkType } from 'ak-editor-prosemirror';

import { BlockQuoteNodeType } from './nodes/blockquote';
import { BulletListNodeType } from './nodes/bullet-list';
import { CodeBlockNodeType } from './nodes/code-block';
import { DocNodeType } from './nodes/doc';
import { HardBreakNodeType } from './nodes/hard-break';
import { HeadingNodeType } from './nodes/heading';
import { HorizontalRuleNodeType } from './nodes/horizontal-rule';
import { ImageNodeType } from './nodes/image';
import { ListItemNodeType } from './nodes/list-item';
import { OrderedListNodeType } from './nodes/ordered-list';
import { ParagraphNodeType } from './nodes/paragraph';
import { MentionNodeType } from './nodes/mention';
import { EmojiNodeType } from './nodes/emoji';

import { CodeMarkType } from './marks/code';
import { DelMarkType } from './marks/del';
import { EmMarkType } from './marks/em';
import { LinkMarkType } from './marks/link';
import { StrongMarkType } from './marks/strong';

interface AtlassianEditorSchema extends Schema {
  nodes: {
    [name: string]: NodeType;

    doc: DocNodeType;

    paragraph: ParagraphNodeType;
    blockquote: BlockQuoteNodeType;
    ordered_list: OrderedListNodeType;
    bullet_list: BulletListNodeType;
    horizontal_rule: HorizontalRuleNodeType;
    heading: HeadingNodeType;

    list_item: ListItemNodeType;

    text: Text;
    image: ImageNodeType;
    hard_break: HardBreakNodeType;

    code_block: CodeBlockNodeType;
    mention: MentionNodeType;
    emoji: EmojiNodeType;
  }

  marks: {
    [name: string]: MarkType;

    link: LinkMarkType;
    em: EmMarkType;
    strong: StrongMarkType;
    code: CodeMarkType;
    del: DelMarkType;
  }
}

export const schema = new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'block+' },

    paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' },
    blockquote: { type: BlockQuoteNodeType, content: 'block+', group: 'block' },
    ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    horizontal_rule: { type: HorizontalRuleNodeType, group: 'block' },
    heading: { type: HeadingNodeType, content: 'inline<_>*', group: 'block' },

    list_item: { type: ListItemNodeType, content: 'paragraph block*' },

    text: { type: Text, group: 'inline' },
    image: { type: ImageNodeType, group: 'inline' },
    hard_break: { type: HardBreakNodeType, group: 'inline' },

    code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
    mention: { type: MentionNodeType, group: 'inline' },
    emoji: { type: EmojiNodeType, group: 'inline' },
  },

  // Note: Marks are applied in the order they are defined.
  marks: {
    link: LinkMarkType,
    em: EmMarkType,
    strong: StrongMarkType,
    code: CodeMarkType,
    del: DelMarkType,
  },
}) as AtlassianEditorSchema;
