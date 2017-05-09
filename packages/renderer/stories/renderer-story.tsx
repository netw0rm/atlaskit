import { action, storiesOf } from '@kadira/storybook';
import { Mention } from '@atlaskit/mention';
import { StoryBookTokenProvider, defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import * as React from 'react';

import Renderer from '../src';
import Emoji from '../src/nodes/emoji';
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
import { name } from '../package.json';
import { document, evilburnsEmojiId, grinEmojiId, lorem } from './story-data';

const tokenProvider = StoryBookTokenProvider.tokenProvider;

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  }
});

const emojiProvider = emojiData.emojiStoryData.getEmojiResource();
const loadingEmojiProvider = new Promise(() => {});

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
    <Code>This is code</Code>
  ))
  .add('nodes/hardBreak', () => (
    <div>Some text with that<HardBreak />breaks on multiple lines</div>
  ))
  .add('nodes/mention', () => (
    <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult" />
  ))
  .add('nodes/emoji', () => {
    // tslint:disable-next-line:variable-name
    const Sample = (props: any) => (
      <span>
        Example emoji:&nbsp;
        <Emoji emojiId={evilburnsEmojiId} emojiProvider={props.emojiProvider} />
        <Emoji emojiId={grinEmojiId} emojiProvider={props.emojiProvider} />
        <Emoji emojiId={{ shortName: ':nope:' }} emojiProvider={props.emojiProvider ? loadingEmojiProvider : undefined} />
      </span>
    );
    const sampleStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      paddingRight: '10px',
      width: '45%',
    };
    return (
      <div>
        <p>
          This story shows emoji in various contexts, the line height between the left and
          right columns should be consistent if the emoji do not impact the line height.
        </p>
        <hr/>
        <div style={sampleStyle}>
          <Paragraph><Sample emojiProvider={emojiProvider} /></Paragraph>
          <hr/>
          <Paragraph>{lorem} <Sample emojiProvider={emojiProvider} /> {lorem}</Paragraph>
          <hr/>
          <h1><Sample emojiProvider={emojiProvider} /></h1>
          <hr/>
          <h2><Sample emojiProvider={emojiProvider} /></h2>
          <hr/>
          <h3><Sample emojiProvider={emojiProvider} /></h3>
          <hr/>
          <h4><Sample emojiProvider={emojiProvider} /></h4>
          <hr/>
          <h5><Sample emojiProvider={emojiProvider} /></h5>
          <hr/>
          <h6><Sample emojiProvider={emojiProvider} /></h6>
          <hr/>
        </div>
        <div style={sampleStyle}>
          <Paragraph><Sample/></Paragraph>
          <hr/>
          <Paragraph>{lorem} <Sample/> {lorem}</Paragraph>
          <hr/>
          <h1><Sample/></h1>
          <hr/>
          <h2><Sample/></h2>
          <hr/>
          <h3><Sample/></h3>
          <hr/>
          <h4><Sample/></h4>
          <hr/>
          <h5><Sample/></h5>
          <hr/>
          <h6><Sample/></h6>
          <hr/>
        </div>
      </div>
    );
  })
  .add('nodes/paragraph', () => (
    <Paragraph>This is a paragraph</Paragraph>
  ))
  ;
