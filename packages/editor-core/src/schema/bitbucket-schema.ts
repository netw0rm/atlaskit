import { createSchema } from './create-schema';
import { Schema } from '../prosemirror';

export const bitbucketSchema: Schema<any, any> = createSchema({
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
    'hardBreak',
    'rule',
    'image',
    'mention',
    'emoji',
    'table',
    'tableCell',
    'tableHeader',
    'tableRow'
  ],
  marks: [
    'em',
    'strong',
    'strike',
    'link',
    'mentionQuery',
    'emojiQuery',
    'code',
  ]
});
