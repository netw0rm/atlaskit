import { createSchema } from './create-schema';
import { Schema } from '../prosemirror';

export const defaultSchema: Schema<any, any> = createSchema({
  nodes: [
    'applicationCard',
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
    'table',
    'table_cell',
    'table_header',
    'table_row',
    'unknownBlock',
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
