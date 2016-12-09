import { nodeFactory } from 'ak-editor-test';
import {
  DocNodeType,
  BlockQuoteNodeType,
  ImageNodeType,
  ParagraphNodeType,
  Text
} from 'ak-editor-schema';
import { Schema } from 'ak-editor-prosemirror';

export const schema = new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'block+' },
    blockquote: { type: BlockQuoteNodeType, content: 'text*', group: 'block' },
    images: { type: ParagraphNodeType, content: '(text | image)*', group: 'block' },
    image: { type: ImageNodeType },
    text: { type: Text },
  }
});

export const doc = nodeFactory(schema.nodes.doc);
export const noimages = nodeFactory(schema.nodes.blockquote);
export const images = nodeFactory(schema.nodes.images);
export const image = (attrs: { src: string }) => nodeFactory(schema.nodes.image, attrs)();
