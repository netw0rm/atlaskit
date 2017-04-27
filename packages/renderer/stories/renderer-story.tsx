import { action, storiesOf } from '@kadira/storybook';
import { Mention } from '@atlaskit/mention';
import { StoryBookTokenProvider, defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import * as React from 'react';

import Renderer from '../src';
import Paragraph from '../src/nodes/paragraph';
import HardBreak from '../src/nodes/hardBreak';
import Em from '../src/marks/em';
import Link from '../src/marks/link';
import Mono from '../src/marks/mono';
import Strike from '../src/marks/strike';
import Strong from '../src/marks/strong';
import Subsup from '../src/marks/subsup';
import Underline from '../src/marks/underline';
import Code from '../src/marks/code';
import CodeBlock from '../src/nodes/codeBlock';
import { name } from '../package.json';
import { document } from './story-data';

const tokenProvider = StoryBookTokenProvider.tokenProvider;

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  }
});

const emojiProvider = emojiData.emojiStoryData.getEmojiResource();

const mediaProvider = Promise.resolve({
  viewContext: Promise.resolve({
    clientId: defaultClientId,
    serviceHost: defaultServiceHost,
    tokenProvider
  })
});

storiesOf(name, module)
  .add('renderer', () => (
    <Renderer
      document={document}
      emojiProvider={emojiProvider}
      mentionProvider={mentionProvider}
      mediaProvider={mediaProvider}
      eventHandlers={{
        mention: {
          onClick: action('onClick'),
          onMouseEnter: action('onMouseEnter'),
          onMouseLeave: action('onMouseLeave')
        },
        media: {
          onClick: action('onClick')
        }
      }}
    />
  ))
  .add('renderer without providers', () => (
    <Renderer
      document={document}
    />
  ))
  .add('marks/em', () => (
    <Em>This is italic</Em>
  ))
  .add('marks/link', () => (
    <Link href="https://www.atlassian.com">This is a link</Link>
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
  .add('marks/code', () => (
    <Code text="This is code"/>
  ))
  .add('nodes/codeBlock', () => (
    <CodeBlock
      text={
        `if (type) {
  switch (NodeType[type]) {
    case NodeType.codeBlock:
      const { text } = node;
      if (text) {
        const { attrs } = node;
        return {
          text,
          type,
          attrs
        }
      }
      break;
    default:
      return {};
  }
}`
      }
      language="javascript"
    />
  ))
  .add('nodes/hardBreak', () => (
    <div>Some text with that<HardBreak />breaks on multiple lines</div>
  ))
  .add('nodes/mention', () => (
    <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult" />
  ))
  .add('nodes/paragraph', () => (
    <Paragraph>This is a paragraph</Paragraph>
  ))
  ;
