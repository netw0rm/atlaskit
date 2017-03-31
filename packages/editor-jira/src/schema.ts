import {
  BlockQuoteNodeType,
  BulletListNodeType,
  CodeBlockNodeType,
  DocNodeType,
  EmMarkType,
  HardBreakNodeType,
  HeadingNodeType,
  HorizontalRuleNodeType,
  LinkMarkType,
  ListItemNodeType,
  MentionNodeType,
  MentionQueryMarkType,
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

export interface JIRASchemaConfig {
  allowLists?: boolean;
  allowMentions?: boolean;
  allowLinks?: boolean;
  allowAdvancedTextFormatting?: boolean;
  allowCodeBlock?: boolean;
  allowBlockQuote?: boolean;
}

export interface JIRASchema extends Schema {
  nodes: {
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
    code_block?: CodeBlockNodeType;
    blockquote?: BlockQuoteNodeType;
  };
  marks: {
    link?: LinkMarkType;
    strong: StrongMarkType;
    em: EmMarkType;
    strike?: StrikeMarkType;
    subsup: SubSupMarkType;
    u: UnderlineMarkType;
    code?: CodeMarkType;
    mention_query?: MentionQueryMarkType;
  };
}

export function isSchemaWithLists(schema: JIRASchema): boolean {
  return !!schema.nodes.bullet_list;
}

export function isSchemaWithMentions(schema: JIRASchema): boolean {
  return !!schema.nodes.mention;
}

export function isSchemaWithLinks(schema: JIRASchema): boolean {
  return !!schema.marks.link;
}

export function isSchemaWithAdvancedTextFormattingMarks(schema: JIRASchema): boolean {
  return !!schema.marks.code && !!schema.marks.strike;
}

export function isSchemaWithCodeBlock(schema: JIRASchema): boolean {
  return !!schema.nodes.code_block;
}

export function isSchemaWithBlockQuotes(schema: JIRASchema): boolean {
  return !!schema.nodes.blockquote;
}

export function makeSchema(config: JIRASchemaConfig): JIRASchema {
  const nodes = {
    doc: { type: DocNodeType, content: 'block+' },
    paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' },
    blockquote: { type: BlockQuoteNodeType, content: 'block+', group: 'block' },
    ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    heading: { type: HeadingNodeType, content: 'inline<_>*', group: 'block' },
    list_item: { type: ListItemNodeType, content: 'paragraph block*' },
    text: { type: Text, group: 'inline' },
    hard_break: { type: HardBreakNodeType, group: 'inline' },
    horizontal_rule: { type: HorizontalRuleNodeType, group: 'block' },
    mention: { type: MentionNodeType, group: 'inline' },
    code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
  };

  const marks = {
    link: LinkMarkType,
    strong: StrongMarkType,
    em: EmMarkType,
    strike: StrikeMarkType,
    subsup: SubSupMarkType,
    u: UnderlineMarkType,
    code: CodeMarkType,
    mention_query: MentionQueryMarkType,
  };

  if (!config.allowLinks) {
    delete marks.link;
  }

  if (!config.allowLists) {
    delete nodes.ordered_list;
    delete nodes.bullet_list;
    delete nodes.list_item;
  }

  if (!config.allowMentions) {
    delete nodes.mention;
    delete marks.mention_query;
  }

  if (!config.allowAdvancedTextFormatting) {
    delete marks.strike;
    delete marks.code;
  }

  if (!config.allowCodeBlock) {
    delete nodes.code_block;
  }

  if (!config.allowBlockQuote) {
    delete nodes.blockquote;
  }

  return new Schema({ nodes, marks });
}
