import { Node, Schema } from '../';

export class MarkdownParser {
  constructor(schema: Schema, tokenizer: any, tokens: { [key: string]: any });

  tokens: { [key: string]: any };
  parse(text: string): Node;
}

export const defaultMarkdownParser: MarkdownParser;
