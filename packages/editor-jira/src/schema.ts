import {
  BulletListNodeType,
  DocNodeType,
  EmMarkType,
  HardBreakNodeType,
  HeadingNodeType,
  HorizontalRuleNodeType,
  ListItemNodeType,
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
}

export interface ListsSchemaNodes {
  ordered_list: OrderedListNodeType;
  bullet_list: BulletListNodeType;
  list_item: ListItemNodeType;
}

export interface BaseSchemaMarks {
  strong: StrongMarkType;
  em: EmMarkType;
  strike: StrikeMarkType;
  subsup: SubSupMarkType;
  u: UnderlineMarkType;
  mono: MonoMarkType;
}

export interface JIRASchema extends Schema {
  nodes: BaseSchemaNodes;
  marks: BaseSchemaMarks;
}

export interface JIRASchemaWithLists extends Schema {
  nodes: BaseSchemaNodes & ListsSchemaNodes;
  marks: BaseSchemaMarks;
}

export type SupportedSchema = JIRASchema | JIRASchemaWithLists;

export function isSchemaWithLists(schema: SupportedSchema): schema is JIRASchemaWithLists {
  return !!schema.nodes['bullet_list'];
}

export function makeSchema(allowLists: boolean): SupportedSchema {
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
  };

  const marks = {
    strong: StrongMarkType,
    em: EmMarkType,
    strike: StrikeMarkType,
    subsup: SubSupMarkType,
    u: UnderlineMarkType,
    mono: MonoMarkType,
  };

  if (!allowLists) {
    delete nodes.ordered_list;
    delete nodes.bullet_list;
    delete nodes.list_item;
  }

  return new Schema({ nodes, marks });
}
