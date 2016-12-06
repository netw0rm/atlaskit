import {
  BlockQuoteNodeType,
  BulletListNodeType,
  CodeMarkType,
  DelMarkType,
  DocNodeType,
  EmMarkType,
  HardBreakNodeType,
  HeadingNodeType,
  HorizontalRuleNodeType,
  ListItemNodeType,
  OrderedListNodeType,
  ParagraphNodeType,
  Schema,
  StrikeMarkType,
  StrongMarkType,
  SubSupMarkType,
  UnderlineMarkType,
  Text
} from 'ak-editor-schema';

export default new Schema({
  nodes: {
    blockquote: { type: BlockQuoteNodeType, content: 'block+', group: 'block' },
    doc: { type: DocNodeType, content: 'block+' },
    paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' },
    ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    heading: { type: HeadingNodeType, content: 'inline<_>*', group: 'block' },
    list_item: { type: ListItemNodeType, content: 'block+' },
    text: { type: Text, group: 'inline' },
    hard_break: { type: HardBreakNodeType, group: 'inline' },
    hr: { type: HorizontalRuleNodeType, group: 'block' },
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

interface CQSchema extends Schema {
  nodes: {
    blockquote: BlockQuoteNodeType;
    doc: DocNodeType;
    paragraph: ParagraphNodeType;
    ordered_list: OrderedListNodeType;
    bullet_list: BulletListNodeType;
    heading: HeadingNodeType;
    list_item: ListItemNodeType;
    text: Text;
    hard_break: HardBreakNodeType;
    hr: HorizontalRuleNodeType;
  }

  marks: {
    code: CodeMarkType;
    em: EmMarkType;
    strike: StrikeMarkType;
    strong: StrongMarkType;
    subsup: SubSupMarkType;
    u: UnderlineMarkType;
  }
}
