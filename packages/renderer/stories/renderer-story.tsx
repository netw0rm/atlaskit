import { storiesOf } from '@kadira/storybook';
import { Mention } from '@atlaskit/mention';
import * as React from 'react';
import Renderer from '../src';
import Paragraph from '../src/nodes/paragraph';
import Em from '../src/marks/em';
import Link from '../src/marks/link';
import Mono from '../src/marks/mono';
import Strike from '../src/marks/strike';
import Strong from '../src/marks/strong';
import Subsup from '../src/marks/subsup';
import Underline from '../src/marks/underline';
import { name } from '../package.json';

const doc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello, ',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            },
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: ' Look I can do '
        },
        {
          type: 'text',
          text: 'italic text!',
          marks: [
            {
              type: 'em'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'My name is '
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-ABCDE',
            text: '@Oscar Wallhult'
          }
        },
        {
          type: 'text',
          text: ' :D',
          marks: [
            {
              type: 'unkown mark'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mention with a displayName'
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-ABCDE',
            displayName: '@oscar'
          }
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mention with a text-property'
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-ABCDE',
          },
          text: '@oscar'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'italic',
          marks: [
            {
              type: 'em'
            }
          ]
        },
        {
          type: 'text',
          text: 'link',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'monospace',
          marks: [
            {
              type: 'mono'
            }
          ]
        },
        {
          type: 'text',
          text: 'strike-through',
          marks: [
            {
              type: 'strike'
            }
          ]
        },
        {
          type: 'text',
          text: 'strong',
          marks: [
            {
              type: 'strong'
            }
          ]
        },
        {
          type: 'text',
          text: 'sub',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sub'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'sup',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sup'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'underline',
          marks: [
            {
              type: 'underline'
            }
          ]
        },
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'unkown type',
          attrs: {
            text: 'fallback text'
          }
        },
        {
          type: 'very unkown'
        }
      ]
    }
  ]
};


storiesOf(name, module)
  .add('renderer', () => (
    <Renderer document={doc} />
  ))
  .add('marks/em', () => (
    <Em>This is italic</Em>
  ))
  .add('marks/link', () => (
    <Link url="https://www.atlassian.com">This is a link</Link>
  ))
  .add('marks/mono', () => (
    <Mono>This is monospace</Mono>
  ))
  .add('marks/strike', () => (
    <Strike>This is strike-through</Strike>
  ))
  .add('marks/strong', () => (
    <Strong>This is strong</Strong>
  ))
  .add('marks/subsup', () => (
    <div>
      <Subsup type="sub">This is sub</Subsup>
      <Subsup type="sup">This is sup</Subsup>
    </div>
  ))
  .add('marks/underline', () => (
    <Underline>This is underlined</Underline>
  ))
  .add('nodes/mention', () => (
    <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult" />
  ))
  .add('nodes/paragraph', () => (
    <Paragraph>This is a paragraph</Paragraph>
  ))
  ;
