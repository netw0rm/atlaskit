import { createSchema } from './create-schema';
import { Schema } from '../prosemirror';

export const defaultSchema: Schema<any, any> = createSchema({
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
    'image',
    'mention',
    'media',
    'mediaGroup',
    'hardBreak',
    'emoji',
  ],
  marks: [
    'link',
    'em',
    'strong',
    'strike',
    'subsup',
    'underline',
    'code',
    'mentionQuery',
    'emojiQuery',
    'textColor',
  ]
});
