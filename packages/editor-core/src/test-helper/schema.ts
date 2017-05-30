import { AttributeSpec, MarkSpec, Node, NodeSpec, ParseRule } from '../prosemirror';
import {
  paragraph,
  createSchema
} from '../schema';

export { AttributeSpec, MarkSpec, Node, NodeSpec, ParseRule };
export default createSchema({
  nodes: [
  'doc',
  'paragraph',
  'text',
  'bulletList',
  'orderedList',
  'listItem',
  'heading',
  'blockquote',
  'codeBlock',
  'panel',
  'rule',
  'hardBreak',
  'mention',
  'emoji',
  'image',
  'media',
  'mediaGroup',
    'linkable',
    'unlinkable',
    'plain'
  ],
  marks: [
  'em',
  'strong',
  'code',
  'strike',
  'underline',
  'link',
  'mentionQuery',
  'subsup',
  'emojiQuery',
  'textColor',
  ],
  customNodeSpecs: {
    linkable: { ...paragraph, content: 'text<link>*' },
    unlinkable: { ...paragraph, content: 'text*' },
    plain: { ...paragraph, content: 'text*' }
  }
});
