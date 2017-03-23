import {
  BlockQuoteNodeType,
  BulletListNodeType,
  DocNodeType,
  EmMarkType,
  HardBreakNodeType,
  HeadingNodeType,
  HorizontalRuleNodeType,
  ListItemNodeType,
  CodeMarkType,
  OrderedListNodeType,
  ParagraphNodeType,
  Schema,
  StrikeMarkType,
  StrongMarkType,
  SubSupMarkType,
  Text,
  UnderlineMarkType
} from '@atlaskit/editor-core';

export default new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'block+' },
    paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' },
    blockquote: { type: BlockQuoteNodeType, content: 'block+', group: 'block' },
    ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    heading: { type: HeadingNodeType, content: 'inline<_>*', group: 'block' },
    list_item: { type: ListItemNodeType, content: 'block+' },
    text: { type: Text, group: 'inline' },
    hard_break: { type: HardBreakNodeType, group: 'inline' },
    horizontal_rule: { type: HorizontalRuleNodeType, group: 'block' }
  },

  // Note: Marks are applied in the order they are defined.
  marks: {
    code: CodeMarkType,
    em: EmMarkType,
    strike: StrikeMarkType,
    strong: StrongMarkType,
    subsup: SubSupMarkType,
    u: UnderlineMarkType,
  },
}) as CQSchema;

export interface CQSchema extends Schema {
  nodes: {
    doc: DocNodeType;
    paragraph: ParagraphNodeType;
    blockquote: BlockQuoteNodeType;
    ordered_list: OrderedListNodeType;
    bullet_list: BulletListNodeType;
    heading: HeadingNodeType;
    list_item: ListItemNodeType;
    text: Text;
    hard_break: HardBreakNodeType;
    horizontal_rule: HorizontalRuleNodeType;
  };

  marks: {
    code: CodeMarkType;
    em: EmMarkType;
    strike: StrikeMarkType;
    strong: StrongMarkType;
    subsup: SubSupMarkType;
    u: UnderlineMarkType;
  };
}
