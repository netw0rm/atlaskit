import { MarkdownIt } from 'markdown-it';
import { Schema, Node } from '../';

export class MarkdownParser {
  constructor(schema: Schema<any, any>, tokenizer: MarkdownIt, tokens: Object);
  parse(content: string): Node | null;
}

export const defaultMarkdownParser: MarkdownParser;
