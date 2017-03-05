import { Mark, Node } from '../';

export class MarkdownSerializer {
  constructor(nodes: { [key: string]: (_0: MarkdownSerializerState, _1: Node) => void }, marks: { [key: string]: any });

  nodes: { [key: string]: (_0: MarkdownSerializerState, _1: Node) => void };
  marks: { [key: string]: any };
  serialize(content: Node, options?: { [key: string]: any }): string;
}

export const defaultMarkdownSerializer: MarkdownSerializer;

export class MarkdownSerializerState {
  constructor(nodes: { [key: string]: (state: MarkdownSerializerState, node: Node) => void }, marks: { [key: string]: any }, options?: { [key: string]: any });

  marks: { [key: string]: any }; // private
  out: string; // private
  atBlank(): boolean; // private
  closed?: Node; // private

  options: { [key: string]: any };
  wrapBlock(delim: string, firstDelim: string | null, node: Node, f: () => void): void;
  ensureNewLine(): void;
  write(content?: string): void;
  closeBlock(node: Node): void;
  text(text: string, escape?: boolean): void;
  render(node: Node): void;
  renderContent(parent: Node): void;
  renderInline(parent: Node): void;
  renderList(node: Node, delim: string, firstDelim: (number) => string): void;
  esc(str: string, startOfLine?: boolean): string;
  repeat(str: string, n: number): string;
  markString(mark: Mark, open: boolean): string;
}
