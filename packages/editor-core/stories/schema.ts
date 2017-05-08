import { createSchema } from '../src/schema';

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
    'image',
    'mention',
    'hardBreak',
    'emoji'
  ],
  marks: [
    'em',
    'strong',
    'code',
    'strike',
    'underline',
    'link',
    'mentionQuery',
    'emojiQuery'
  ]
});
