import {
  blockquote,
  bulletList,
  code as codeBase,
  codeBlock,
  doc,
  em,
  hardBreak,
  heading,
  link,
  listItem,
  MarkSpec,
  mention,
  mentionQuery,
  NodeSpec,
  orderedList,
  paragraph,
  rule,
  Schema,
  strike,
  strong,
  subsup,
  text,
  underline,
} from '@atlaskit/editor-core';

const code = {
  ...codeBase,
  excludes: 'em strike strong underline'
};

export interface JIRASchemaNodes {
  blockquote?: NodeSpec;
  bulletList?: NodeSpec;
  codeBlock?: NodeSpec;
  doc: NodeSpec;
  hardBreak: NodeSpec;
  heading: NodeSpec;
  listItem?: NodeSpec;
  mention?: NodeSpec;
  orderedList?: NodeSpec;
  paragraph: NodeSpec;
  rule: NodeSpec;
  text: NodeSpec;
}

export interface JIRASchemaMarks {
  code?: MarkSpec;
  em: MarkSpec;
  link?: MarkSpec;
  mentionQuery?: MarkSpec;
  strike?: MarkSpec;
  strong: MarkSpec;
  subsup: MarkSpec;
  underline: MarkSpec;
}

export interface JIRASchema extends Schema<JIRASchemaNodes, JIRASchemaMarks> {}

export interface JIRASchemaConfig {
  allowLists?: boolean;
  allowMentions?: boolean;
  allowLinks?: boolean;
  allowAdvancedTextFormatting?: boolean;
  allowCodeBlock?: boolean;
  allowBlockQuote?: boolean;
}

export function isSchemaWithLists(schema: JIRASchema): boolean {
  return !!schema.nodes.bulletList;
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
  return !!schema.nodes.codeBlock;
}

export function isSchemaWithBlockQuotes(schema: JIRASchema): boolean {
  return !!schema.nodes.blockquote;
}

export function makeSchema(config: JIRASchemaConfig): JIRASchema {
  const nodes = {
    blockquote,
    bulletList,
    codeBlock,
    doc,
    hardBreak,
    heading,
    listItem,
    mention,
    orderedList,
    paragraph,
    rule,
    text,
  };

  const marks = {
    strong,
    code,
    em,
    link,
    mentionQuery,
    strike,
    subsup,
    underline,
  };

  if (!config.allowLinks) {
    delete marks.link;
  }

  if (!config.allowLists) {
    delete nodes.orderedList;
    delete nodes.bulletList;
    delete nodes.listItem;
  }

  if (!config.allowMentions) {
    delete nodes.mention;
    delete marks.mentionQuery;
  }

  if (!config.allowAdvancedTextFormatting) {
    delete marks.strike;
    delete marks.code;
  }

  if (!config.allowCodeBlock) {
    delete nodes.codeBlock;
  }

  if (!config.allowBlockQuote) {
    delete nodes.blockquote;
  }

  return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}
