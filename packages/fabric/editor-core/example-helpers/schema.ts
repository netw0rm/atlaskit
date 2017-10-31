import { Schema } from 'prosemirror-model';
import { createSchema } from '@atlaskit/editor-common';

export default createSchema({
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
    'hardBreak',
    'emoji',
    'singleImage',
    'mediaGroup',
    'media',
    'table',
    'tableCell',
    'tableHeader',
    'tableRow',
    'decisionList',
    'decisionItem',
    'taskList',
    'taskItem',
    'inlineMacro',
  ],
  marks: [
    'em',
    'strong',
    'code',
    'strike',
    'underline',
    'link',
    'mentionQuery',
    'emojiQuery',
    'textColor',
    'subsup',
  ]
}) as Schema;
