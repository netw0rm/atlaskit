import {
  BlockQuoteNodeType,
  BulletListNodeType,
  CodeBlockNodeType,
  DocNodeType,
  EmMarkType,
  EmojiNodeType,
  HardBreakNodeType,
  HeadingNodeType,
  HorizontalRuleNodeType,
  ImageNodeType,
  LinkMarkType,
  ListItemNodeType,
  MentionNodeType,
  MentionQueryMarkType,
  MonoMarkType,
  OrderedListNodeType,
  ParagraphNodeType,
  Schema,
  StrikeMarkType,
  StrongMarkType,
  Text
} from 'ak-editor-core';

export default new Schema({
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
    strike: StrikeMarkType,
    mono: MonoMarkType,
    mention_query: MentionQueryMarkType,
  },
}) as BitbucketSchema;

export interface BitbucketSchema extends Schema {
  nodes: {
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
  };

  marks: {
    link: LinkMarkType;
    em: EmMarkType;
    strong: StrongMarkType;
    mono: MonoMarkType;
    strike: StrikeMarkType;
    mention_query: MentionQueryMarkType;
  };
}
