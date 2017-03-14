import {
  BulletListNodeType,
  DocNodeType,
  EmMarkType,
  HardBreakNodeType,
  HeadingNodeType,
  HorizontalRuleNodeType,
  ListItemNodeType,
  MentionNodeType,
  MentionQueryMarkType,
  MonoMarkType,
  OrderedListNodeType,
  ParagraphNodeType,
  Schema,
  StrikeMarkType,
  StrongMarkType,
  SubSupMarkType,
  Text,
  UnderlineMarkType
} from '@atlaskit/editor-core';

export interface BaseSchemaNodes {
  doc: DocNodeType;
  paragraph: ParagraphNodeType;
  heading: HeadingNodeType;
  text: Text;
  hard_break: HardBreakNodeType;
  horizontal_rule: HorizontalRuleNodeType;
  ordered_list?: OrderedListNodeType;
  bullet_list?: BulletListNodeType;
  list_item?: ListItemNodeType;
  mention?: MentionNodeType;
}

export interface BaseSchemaMarks {
  strong: StrongMarkType;
  em: EmMarkType;
  strike: StrikeMarkType;
  subsup: SubSupMarkType;
  u: UnderlineMarkType;
  mono: MonoMarkType;
  mention_query?: MentionQueryMarkType;
}

export interface JIRASchemaConfig {
  allowLists?: boolean;
  allowMentions?: boolean;
}

export interface JIRASchema extends Schema {
  nodes: BaseSchemaNodes;
  marks: BaseSchemaMarks;
}

export function isSchemaWithLists(schema: JIRASchema): boolean {
  return !!schema.nodes.bullet_list;
}

export function isSchemaWithMentions(schema: JIRASchema): boolean {
  return !!schema.nodes.mention;
}

export function makeSchema(config: JIRASchemaConfig): JIRASchema {
  const nodes = {
    doc: { type: DocNodeType, content: 'block+' },
    paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' },
    ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    heading: { type: HeadingNodeType, content: 'inline<_>*', group: 'block' },
    list_item: { type: ListItemNodeType, content: 'paragraph' },
    text: { type: Text, group: 'inline' },
    hard_break: { type: HardBreakNodeType, group: 'inline' },
    horizontal_rule: { type: HorizontalRuleNodeType, group: 'block' },
    mention: { type: MentionNodeType, group: 'inline' },
  };

  const marks = {
    strong: StrongMarkType,
    em: EmMarkType,
    strike: StrikeMarkType,
    subsup: SubSupMarkType,
    u: UnderlineMarkType,
    mono: MonoMarkType,
    mention_query: MentionQueryMarkType,
  };

  if (!config.allowLists) {
    delete nodes.ordered_list;
    delete nodes.bullet_list;
    delete nodes.list_item;
  }

  if (!config.allowMentions) {
    delete nodes.mention;
    delete marks.mention_query;
  }

  return new Schema({ nodes, marks });
}
