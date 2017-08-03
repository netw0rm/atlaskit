import { Schema } from '../../prosemirror';

export type JIRASchema = Schema<any, any>;

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

export function isSchemaWithSubSupMark(schema: JIRASchema): boolean {
  return !!schema.marks.subsup;
}

export function isSchemaWithCodeBlock(schema: JIRASchema): boolean {
  return !!schema.nodes.codeBlock;
}

export function isSchemaWithBlockQuotes(schema: JIRASchema): boolean {
  return !!schema.nodes.blockquote;
}

export function isSchemaWithMedia(schema: JIRASchema): boolean {
  return !!schema.nodes.mediaGroup && !!schema.nodes.media;
}

export function isSchemaWithTextColor(schema: JIRASchema): boolean {
  return !!schema.marks.textColor;
}
