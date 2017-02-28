import { Block, Inline, MarkType, Schema } from '../';

export const nodes: { [key: string]: any };

export const marks: { em: any, strong: any, link: any, code: any };

export const schema: Schema<typeof nodes, typeof marks>;

export class Doc extends Block {}

export class BlockQuote extends Block {}

export class OrderedList extends Block {}

export class BulletList extends Block {}

export class ListItem extends Block {}

export class HorizontalRule extends Block {}

export class Heading extends Block {
  maxLevel: number;
}

export class CodeBlock extends Block {}

export class Paragraph extends Block {}

export class Image extends Inline {}

export class HardBreak extends Inline {}

export class EmMark extends MarkType {}

export class StrongMark extends MarkType {}

export class LinkMark extends MarkType {}

export class CodeMark extends MarkType {}

