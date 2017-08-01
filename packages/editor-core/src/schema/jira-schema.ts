import { createSchema } from './create-schema';
import { Schema } from '../prosemirror';

export interface JIRASchemaConfig {
  allowLists?: boolean;
  allowMentions?: boolean;
  allowLinks?: boolean;
  allowAdvancedTextFormatting?: boolean;
  allowCodeBlock?: boolean;
  allowBlockQuote?: boolean;
  allowSubSup?: boolean;
  allowMedia?: boolean;
  allowTextColor?: boolean;
}

export default function makeSchema(config: JIRASchemaConfig) {
  const nodes = ['doc', 'paragraph', 'text', 'hardBreak', 'heading', 'rule'];
  const marks = ['strong', 'em', 'underline'];

  if (config.allowLinks) {
    marks.push('link');
  }

  if (config.allowLists) {
    nodes.push('orderedList', 'bulletList', 'listItem');
  }

  if (config.allowMentions) {
    nodes.push('mention');
    marks.push('mentionQuery');
  }

  if (config.allowAdvancedTextFormatting) {
    marks.push('strike', 'code');
  }

  if (config.allowSubSup) {
    marks.push('subsup');
  }

  if (config.allowCodeBlock) {
    nodes.push('codeBlock');
  }

  if (config.allowBlockQuote) {
    nodes.push('blockquote');
  }

  if (config.allowMedia) {
    nodes.push('mediaGroup', 'media');
  }

  if (config.allowTextColor) {
    marks.push('textColor');
  }

  return createSchema({ nodes, marks });
}

export function isSchemaWithLists(schema: Schema<any, any>): boolean {
  return !!schema.nodes.bulletList;
}

export function isSchemaWithMentions(schema: Schema<any, any>): boolean {
  return !!schema.nodes.mention;
}

export function isSchemaWithLinks(schema: Schema<any, any>): boolean {
  return !!schema.marks.link;
}

export function isSchemaWithAdvancedTextFormattingMarks(schema: Schema<any, any>): boolean {
  return !!schema.marks.code && !!schema.marks.strike;
}

export function isSchemaWithSubSupMark(schema: Schema<any, any>): boolean {
  return !!schema.marks.subsup;
}

export function isSchemaWithCodeBlock(schema: Schema<any, any>): boolean {
  return !!schema.nodes.codeBlock;
}

export function isSchemaWithBlockQuotes(schema: Schema<any, any>): boolean {
  return !!schema.nodes.blockquote;
}

export function isSchemaWithMedia(schema: Schema<any, any>): boolean {
  return !!schema.nodes.mediaGroup && !!schema.nodes.media;
}

export function isSchemaWithTextColor(schema: Schema<any, any>): boolean {
  return !!schema.marks.textColor;
}
