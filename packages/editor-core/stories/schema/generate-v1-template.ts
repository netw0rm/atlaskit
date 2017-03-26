import {
  MarkType,
  Block,
  Inline,
  Schema,
  Text
} from '../../';
import generate from './generate';

//
// This schema is intended as a base for the version 1 document structure specification.
//
const schema = new Schema({
  nodes: {
    doc: { type: Block, content: 'block+' },

    // top-level blocks
    paragraph: { type: Block, content: 'inline<_>*', group: 'block' },
    blockQuote: { type: Block, content: 'block+', group: 'block' },
    orderedList: { type: Block, content: 'listItem+', group: 'block' },
    bulletList: { type: Block, content: 'listItem+', group: 'block' },
    rule: { type: Block, group: 'block' },
    heading: { type: Block, content: 'inline<_>*', group: 'block' },
    codeBlock: { type: Block, content: 'text*', group: 'block' },
    mediaGroup: { type: Block, content: 'media+', group: 'block' },
    panel: { type: Block, content: 'block+' },

    // other
    listItem: { type: Block, content: 'block+' },
    media: { type: Block },

    // inlines
    text: { type: Text, group: 'inline' },
    image: { type: Inline, group: 'inline' },
    emoji: { type: Inline, group: 'inline' },
    hardBreak: { type: Inline, group: 'inline' },
    mention: { type: Inline, group: 'inline' },
  },

  marks: {
    link: MarkType,
    em: MarkType,
    strong: MarkType,
    strike: MarkType,
    subsup: MarkType,
    underline: MarkType,
    code: MarkType
  },
});

export default generate(schema);
